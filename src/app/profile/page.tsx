"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, LoaderCircle, LogOut, Save, UserRound, Link2 } from "lucide-react";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/providers/auth-provider";
import { useLanguage } from "@/providers/language-provider";
import { getFirebaseClient } from "@/lib/firebase/client";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";

type ProfileFields = { displayName: string; grade: string; city: string };

const copyByLocale = {
  kk: {
    title: "Жеке кабинет", subtitle: "Аккаунтыңыз бен оқу профиліңіз.", email: "Email", name: "Аты-жөні", grade: "Сыныбы / мәртебесі", city: "Қала / өңір", save: "Өзгерістерді сақтау", saving: "Сақталуда…", saved: "Профиль сақталды.", loadError: "Профильді жүктеу мүмкін болмады.", saveError: "Сақтау мүмкін болмады. Firestore ережелерін тексеріңіз.", tabs: ["Профиль", "Жетістіктер", "Жұмыстар", "Баптаулар"], overview: "Жеке оқу прогресі аккаунтқа байланыстырылды. Материалдарды оқи бастаған кезде прогресс осында шығады.", empty: "Әзірге дерек жоқ. Оқу материалдарын аяқтаған соң мұнда көрсетіледі.", catalog: "Каталогты ашу", lang: "Интерфейс тілі", theme: "Тақырып", logout: "Аккаунттан шығу", guest: "Жеке профиліңізді сақтау үшін жүйеге кіріңіз.", login: "Кіру / тіркелу", settings: "Профиль деректеріңіз өз аккаунтыңызда сақталады. Құпиясөз Firebase арқылы қорғалады.", admin: "Әкімші бөлімі", googleLink: "Google аккаунтын байланыстыру", googleLinked: "Google аккаунты байланыстырылған", googleLinkError: "Google аккаунтын байланыстыру мүмкін болмады." },
  ru: {
    title: "Личный кабинет", subtitle: "Ваш аккаунт и учебный профиль.", email: "Email", name: "Имя", grade: "Класс / статус", city: "Город / регион", save: "Сохранить изменения", saving: "Сохраняем…", saved: "Профиль сохранён.", loadError: "Не удалось загрузить профиль.", saveError: "Не удалось сохранить. Проверьте правила Firestore.", tabs: ["Профиль", "Достижения", "Работы", "Настройки"], overview: "Личный прогресс обучения привязан к аккаунту. Он появится здесь, когда вы начнёте проходить материалы.", empty: "Пока данных нет. Они появятся здесь после прохождения учебных материалов.", catalog: "Открыть каталог", lang: "Язык интерфейса", theme: "Тема", logout: "Выйти из аккаунта", guest: "Войдите, чтобы сохранять личный профиль.", login: "Войти / зарегистрироваться", settings: "Данные профиля хранятся в вашем аккаунте. Пароль защищён Firebase.", admin: "Раздел администратора", googleLink: "Подключить Google", googleLinked: "Google подключён", googleLinkError: "Не удалось подключить Google." },
  en: {
    title: "Your profile", subtitle: "Your account and learning profile.", email: "Email", name: "Name", grade: "Grade / status", city: "City / region", save: "Save changes", saving: "Saving…", saved: "Profile saved.", loadError: "Could not load your profile.", saveError: "Could not save. Check the Firestore rules.", tabs: ["Profile", "Achievements", "Works", "Settings"], overview: "Your learning progress is connected to your account. It will appear here as you complete learning materials.", empty: "Nothing here yet. Completed learning materials will appear here.", catalog: "Browse catalog", lang: "Interface language", theme: "Theme", logout: "Sign out", guest: "Sign in to save your personal profile.", login: "Sign in / create account", settings: "Your profile details are stored in your account. Your password is protected by Firebase.", admin: "Admin area", googleLink: "Link Google account", googleLinked: "Google account linked", googleLinkError: "Could not link Google account." },
} as const;

export default function ProfilePage() {
  const { t, locale } = useLanguage();
  const { user, loading, logOut, linkGoogleAccount, redirectErrorCode, clearRedirectError } = useAuth();
  const router = useRouter();
  const copy = copyByLocale[locale];
  const [tab, setTab] = useState("profile");
  const [fields, setFields] = useState<ProfileFields>({ displayName: "", grade: "", city: "" });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [googleLinkedForUid, setGoogleLinkedForUid] = useState<string | null>(null);
  const googleLinked = Boolean(user?.providerData.some((provider) => provider.providerId === "google.com") || (user && googleLinkedForUid === user.uid));

  useEffect(() => {
    if (!user) {
      return;
    }
    const reference = doc(getFirebaseClient().db, "users", user.uid);
    return onSnapshot(reference, (snapshot) => {
      const data = snapshot.data();
      setFields({
        displayName: typeof data?.displayName === "string" ? data.displayName : user.displayName ?? "",
        grade: typeof data?.grade === "string" ? data.grade : "",
        city: typeof data?.city === "string" ? data.city : "",
      });
      setProfileLoading(false);
      setError("");
    }, () => {
      setProfileLoading(false);
      setError(copy.loadError);
    });
  }, [copy.loadError, user]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setBusy(true);
    setSaved(false);
    setError("");
    try {
      const reference = doc(getFirebaseClient().db, "users", user.uid);
      const existing = await getDoc(reference);
      await setDoc(reference, {
        displayName: fields.displayName.trim(),
        email: user.email ?? "",
        photoURL: user.photoURL ?? "",
        grade: fields.grade.trim(),
        city: fields.city.trim(),
        locale,
        updatedAt: serverTimestamp(),
        ...(!existing.exists() ? { createdAt: serverTimestamp() } : {}),
      }, { merge: true });
      if (fields.displayName.trim() !== (user.displayName ?? "")) {
        await updateProfile(user, { displayName: fields.displayName.trim() });
      }
      setSaved(true);
    } catch {
      setError(copy.saveError);
    } finally {
      setBusy(false);
    }
  }

  async function connectGoogle() {
    setGoogleBusy(true);
    setError("");
    clearRedirectError();
    try {
      await linkGoogleAccount();
      setGoogleLinkedForUid(user?.uid ?? null);
    } catch (reason) {
      const code = typeof reason === "object" && reason && "code" in reason ? String(reason.code) : "";
      setError(code ? `${copy.googleLinkError} (${code})` : copy.googleLinkError);
    } finally {
      setGoogleBusy(false);
    }
  }

  async function signOut() {
    await logOut();
    router.replace("/");
  }

  const tabs = copy.tabs.map((label, index) => ({ id: ["profile", "achievements", "works", "settings"][index], label }));

  if (loading || (user && profileLoading)) {
    return <div className="mx-auto flex min-h-[55vh] max-w-6xl items-center justify-center px-5"><LoaderCircle className="h-6 w-6 animate-spin text-[#718527]" aria-label={t.common.loading} /></div>;
  }

  if (!user) {
    return <div className="mx-auto flex min-h-[55vh] max-w-6xl items-center justify-center px-5 py-12"><section className="w-full max-w-lg rounded-3xl border border-[#e2e4d8] bg-white p-8 text-center dark:border-[#2e3528] dark:bg-[#191c16]"><UserRound className="mx-auto h-10 w-10 text-[#718527]"/><h1 className="mt-4 text-2xl font-black">{copy.title}</h1><p className="mt-2 text-sm text-[#5c6055] dark:text-[#9ea594]">{copy.guest}</p><Link href="/login" className="mt-6 inline-flex rounded-full bg-[#171914] px-5 py-3 text-sm font-bold text-white dark:bg-[#d8f06a] dark:text-[#171914]">{copy.login}</Link></section></div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
      <div className="rounded-[2rem] bg-[#171914] p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8f06a] text-lg font-black text-[#171914]">{(fields.displayName || user.email || "A").slice(0, 1).toUpperCase()}</div>
            <div><h1 className="text-xl font-black">{fields.displayName || user.displayName || copy.title}</h1><p className="mt-1 text-sm text-white/70">{user.email}</p></div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold"><BadgeCheck className="h-4 w-4 text-[#d8f06a]"/>{copy.title}</div>
        </div>
      </div>
      {redirectErrorCode && <p role="alert" className="mt-4 rounded-xl bg-[#fff0ee] p-3 text-sm text-[#a3241b] dark:bg-[#3d1919] dark:text-[#ffaaa3]">{copy.googleLinkError} ({redirectErrorCode}) <button onClick={clearRedirectError} className="ml-2 font-bold underline">OK</button></p>}
      <div className="mt-6 border-b border-[#e2e4d8] dark:border-[#2e3528]"><Tabs tabs={tabs} activeTab={tab} onChange={setTab} variant="underline" /></div>
      <div className="mt-6">
        {tab === "profile" && <div className="grid gap-4 md:grid-cols-2"><section className="rounded-2xl border border-[#e2e4d8] bg-white p-5 dark:border-[#2e3528] dark:bg-[#191c16]"><h2 className="font-black">{copy.overview}</h2><p className="mt-3 text-sm text-[#5c6055] dark:text-[#9ea594]">{copy.empty}</p><Link href="/catalog" className="mt-5 inline-flex rounded-full bg-[#d8f06a] px-4 py-2 text-sm font-bold text-[#171914]">{copy.catalog}</Link></section><form onSubmit={saveProfile} className="space-y-4 rounded-2xl border border-[#e2e4d8] bg-white p-5 dark:border-[#2e3528] dark:bg-[#191c16]">
          <label className="block text-sm font-bold">{copy.email}<input readOnly value={user.email ?? ""} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-[#f7f7f2] px-4 py-3 font-normal text-[#71766a] dark:border-[#394131] dark:bg-[#11130f]" /></label>
          {([["displayName", copy.name], ["grade", copy.grade], ["city", copy.city]] as const).map(([key, label]) => <label key={key} className="block text-sm font-bold">{label}<input maxLength={key === "city" ? 80 : 60} value={fields[key]} onChange={(event) => setFields((current) => ({ ...current, [key]: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-transparent px-4 py-3 font-normal outline-none focus:border-[#7d941b] dark:border-[#394131]" /></label>)}
          {error && <p role="alert" className="rounded-xl bg-[#fff0ee] p-3 text-sm text-[#a3241b] dark:bg-[#3d1919] dark:text-[#ffaaa3]">{error}</p>}{saved && <p role="status" className="text-sm font-bold text-[#4d6300] dark:text-[#d8f06a]">{copy.saved}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? <LoaderCircle className="h-4 w-4 animate-spin"/> : <Save className="h-4 w-4"/>}{busy ? copy.saving : copy.save}</Button>
        </form></div>}
        {(tab === "achievements" || tab === "works") && <div className="rounded-2xl border border-[#e2e4d8] bg-white p-6 text-sm text-[#5c6055] dark:border-[#2e3528] dark:bg-[#191c16] dark:text-[#9ea594]">{copy.empty}</div>}
        {tab === "settings" && <div className="space-y-4 rounded-2xl border border-[#e2e4d8] bg-white p-5 text-sm dark:border-[#2e3528] dark:bg-[#191c16]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e4d8] pb-3 dark:border-[#2e3528]"><span>{copy.lang}</span><LanguageSwitcher /></div><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e4d8] pb-3 dark:border-[#2e3528]"><span>{copy.theme}</span><ThemeSwitcher /></div><p className="text-[#5c6055] dark:text-[#9ea594]">{copy.settings}</p><button disabled={googleBusy || googleLinked} onClick={connectGoogle} className="flex items-center gap-2 rounded-full border border-[#d8dacb] px-4 py-2 font-bold disabled:opacity-60 dark:border-[#394131]"><Link2 className="h-4 w-4"/>{googleBusy ? t.common.loading : googleLinked ? copy.googleLinked : copy.googleLink}</button>{error && <p role="alert" className="text-sm text-[#a3241b]">{error}</p>}<Link href="/admin" className="text-xs font-bold text-[#4d6300] underline dark:text-[#d8f06a]">{copy.admin}</Link><button onClick={signOut} className="flex items-center gap-2 rounded-full border border-[#d8dacb] px-4 py-2 font-bold dark:border-[#394131]"><LogOut className="h-4 w-4"/>{copy.logout}</button></div>}
      </div>
    </div>
  );
}
