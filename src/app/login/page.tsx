"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, LoaderCircle, LogIn } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { useLanguage } from "@/providers/language-provider";

type AuthErrorCode = string;

function getAuthError(code: AuthErrorCode, locale: string) {
  const messages = {
    kk: {
      "auth/email-already-in-use": "Бұл email бұрыннан тіркелген. Кіру режимін қолданып көріңіз.",
      "auth/invalid-credential": "Email немесе құпиясөз қате.",
      "auth/invalid-email": "Email мекенжайын тексеріңіз.",
      "auth/weak-password": "Құпиясөз кемінде 6 таңбадан тұруы керек.",
      "auth/popup-closed-by-user": "Google арқылы кіру терезесі жабылды.",
      "auth/unauthorized-domain": "Бұл сайт Firebase-та Google арқылы кіруге рұқсат етілмеген. Firebase Authentication → Settings → Authorized domains бөлімінде доменді қосыңыз.",
      "auth/operation-not-allowed": "Firebase Console ішінде Google провайдерін қосыңыз.",
      "auth/popup-blocked": "Браузер кіру терезесін бұғаттады. Қалқымалы терезелерге рұқсат беріп, қайта көріңіз.",
      "auth/cancelled-popup-request": "Google арқылы кіру терезесі ауыстырылды. Қайта көріңіз.",
      "auth/account-exists-with-different-credential": "Бұл email пароль арқылы тіркелген. Email мен құпиясөзбен кіріп, Профиль → Баптаулар бөлімінде Google аккаунтын байланыстырыңыз.",
      "auth/network-request-failed": "Желі қатесі. Интернет байланысын тексеріңіз.",
      default: "Кіру мүмкін болмады. Деректерді тексеріп, қайта көріңіз.",
    },
    ru: {
      "auth/email-already-in-use": "Этот email уже зарегистрирован. Попробуйте войти.",
      "auth/invalid-credential": "Неверный email или пароль.",
      "auth/invalid-email": "Проверьте адрес электронной почты.",
      "auth/weak-password": "Пароль должен содержать не менее 6 символов.",
      "auth/popup-closed-by-user": "Окно входа через Google было закрыто.",
      "auth/unauthorized-domain": "Этот домен не разрешён для входа через Google. Добавьте его в Firebase Authentication → Settings → Authorized domains.",
      "auth/operation-not-allowed": "Включите провайдер Google в Firebase Console.",
      "auth/popup-blocked": "Браузер заблокировал окно входа. Разрешите всплывающие окна и попробуйте снова.",
      "auth/cancelled-popup-request": "Запрос входа через Google был заменён. Попробуйте ещё раз.",
      "auth/account-exists-with-different-credential": "Этот email уже зарегистрирован по паролю. Войдите по email и паролю, затем откройте Профиль → Настройки и подключите Google.",
      "auth/network-request-failed": "Ошибка сети. Проверьте подключение к интернету.",
      default: "Не удалось выполнить вход. Проверьте данные и попробуйте ещё раз.",
    },
    en: {
      "auth/email-already-in-use": "This email is already registered. Try signing in instead.",
      "auth/invalid-credential": "The email or password is incorrect.",
      "auth/invalid-email": "Check the email address and try again.",
      "auth/weak-password": "Your password must be at least 6 characters.",
      "auth/popup-closed-by-user": "The Google sign-in window was closed.",
      "auth/unauthorized-domain": "This domain is not authorized for Google sign-in. Add it under Firebase Authentication → Settings → Authorized domains.",
      "auth/operation-not-allowed": "Enable the Google provider in Firebase Console.",
      "auth/popup-blocked": "Your browser blocked the sign-in window. Allow pop-ups and try again.",
      "auth/cancelled-popup-request": "The Google sign-in request was replaced. Please try again.",
      "auth/account-exists-with-different-credential": "This email already uses a password. Sign in with email and password, then open Profile → Settings to link Google.",
      "auth/network-request-failed": "Network error. Check your internet connection.",
      default: "Sign-in failed. Check your details and try again.",
    },
  };
  const dictionary = messages[locale as keyof typeof messages] ?? messages.kk;
  return dictionary[code as keyof typeof dictionary] ?? (code
    ? `${dictionary.default} (${code})`
    : dictionary.default);
}

export default function LoginPage() {
  const { locale } = useLanguage();
  const { user, loading, configured, signUp, signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [googleBusy, setGoogleBusy] = useState(false);

  const copy = {
    kk: { title: "Aleuet-ке қош келдіңіз", subtitle: "Оқу прогресін сақтау үшін аккаунтыңызға кіріңіз.", name: "Аты-жөні", email: "Email", password: "Құпиясөз", signIn: "Кіру", signUp: "Аккаунт құру", google: "Google арқылы жалғастыру", or: "немесе", switchIn: "Аккаунтыңыз бар ма? Кіру", switchUp: "Жаңа пайдаланушысыз ба? Аккаунт құру", notReady: "Firebase әлі бапталмаған. Қажетті орта параметрлерін тексеріңіз.", back: "Басты бетке оралу" },
    ru: { title: "Добро пожаловать в Aleuet", subtitle: "Войдите, чтобы сохранять свой прогресс обучения.", name: "Имя", email: "Email", password: "Пароль", signIn: "Войти", signUp: "Создать аккаунт", google: "Продолжить с Google", or: "или", switchIn: "Уже есть аккаунт? Войти", switchUp: "Новый пользователь? Создать аккаунт", notReady: "Firebase ещё не настроен. Проверьте параметры окружения.", back: "Вернуться на главную" },
    en: { title: "Welcome to Aleuet", subtitle: "Sign in to save your learning progress.", name: "Name", email: "Email", password: "Password", signIn: "Sign in", signUp: "Create account", google: "Continue with Google", or: "or", switchIn: "Already have an account? Sign in", switchUp: "New here? Create an account", notReady: "Firebase is not configured yet. Check the environment settings.", back: "Back to home" },
  }[locale];

  useEffect(() => {
    if (!loading && user) router.replace("/profile");
  }, [loading, router, user]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (mode === "signup") await signUp(name, email, password);
      else await signIn(email, password);
      router.replace("/profile");
    } catch (reason) {
      const code = typeof reason === "object" && reason && "code" in reason ? String(reason.code) : "";
      setError(getAuthError(code, locale));
    } finally {
      setBusy(false);
    }
  }

  async function submitGoogle() {
    setGoogleBusy(true);
    setError("");
    try {
      await signInWithGoogle();
      router.replace("/profile");
    } catch (reason) {
      const code = typeof reason === "object" && reason && "code" in reason ? String(reason.code) : "";
      setError(getAuthError(code, locale));
    } finally {
      setGoogleBusy(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 items-center px-5 py-12 md:px-8">
      <section className="w-full rounded-[2rem] border border-[#e2e4d8] bg-white p-6 shadow-sm dark:border-[#2e3528] dark:bg-[#191c16] sm:p-9">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8f06a] text-sm font-black text-[#171914]"><LogIn className="h-5 w-5" /></div>
        <h1 className="text-2xl font-black tracking-tight">{copy.title}</h1>
        <p className="mt-2 text-sm text-[#5c6055] dark:text-[#9ea594]">{copy.subtitle}</p>

        {!configured ? (
          <div className="mt-6 rounded-xl bg-[#fff4df] p-4 text-sm text-[#6b4100] dark:bg-[#3b2d17] dark:text-[#ffe0a6]">{copy.notReady}</div>
        ) : (
          <>
            <button type="button" onClick={submitGoogle} disabled={googleBusy || busy} className="mt-7 flex w-full items-center justify-center gap-2 rounded-full border border-[#d8dacb] px-5 py-3 text-sm font-bold transition hover:bg-[#f7f7f2] disabled:opacity-60 dark:border-[#394131] dark:hover:bg-[#232820]">
              {googleBusy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <span className="font-black text-[#4285f4]">G</span>}{copy.google}
            </button>
            <div className="my-5 flex items-center gap-3 text-xs text-[#8a8f82]"><span className="h-px flex-1 bg-[#e2e4d8] dark:bg-[#2e3528]" />{copy.or}<span className="h-px flex-1 bg-[#e2e4d8] dark:bg-[#2e3528]" /></div>
            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && <label className="block text-sm font-bold">{copy.name}<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-transparent px-4 py-3 font-normal outline-none focus:border-[#7d941b] dark:border-[#394131]" /></label>}
              <label className="block text-sm font-bold">{copy.email}<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-transparent px-4 py-3 font-normal outline-none focus:border-[#7d941b] dark:border-[#394131]" /></label>
              <label className="block text-sm font-bold">{copy.password}<input required type="password" minLength={6} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-transparent px-4 py-3 font-normal outline-none focus:border-[#7d941b] dark:border-[#394131]" /></label>
              {error && <p role="alert" className="flex items-start gap-2 rounded-xl bg-[#fff0ee] p-3 text-sm text-[#a3241b] dark:bg-[#3d1919] dark:text-[#ffaaa3]"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
              <button type="submit" disabled={busy || googleBusy} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#171914] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#32362c] disabled:opacity-60 dark:bg-[#d8f06a] dark:text-[#171914]">
                {busy && <LoaderCircle className="h-4 w-4 animate-spin" />}{mode === "signin" ? copy.signIn : copy.signUp}
              </button>
            </form>
            <button type="button" className="mt-5 w-full text-center text-sm font-bold text-[#4d6300] underline-offset-4 hover:underline dark:text-[#d8f06a]" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}>
              {mode === "signin" ? copy.switchUp : copy.switchIn}
            </button>
          </>
        )}
        <Link href="/" className="mt-6 block text-center text-xs font-semibold text-[#71766a] hover:underline dark:text-[#9ea594]">{copy.back}</Link>
      </section>
    </div>
  );
}
