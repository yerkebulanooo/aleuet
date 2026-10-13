"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle, ShieldCheck, ShieldX } from "lucide-react";
import { getIdTokenResult } from "firebase/auth";
import { useAuth } from "@/providers/auth-provider";
import { useLanguage } from "@/providers/language-provider";

const copy = {
  kk: { title: "Әкімші бөлімі", loading: "Рөл тексерілуде…", denied: "Бұл бөлім тек әкімші аккаунттарына арналған.", setup: "Қазір әкімшілік құралдар қосылмаған. Рөл Firebase Admin SDK арқылы қауіпсіз берілуі керек.", back: "Профильге қайту", signIn: "Әкімші аккаунтымен кіріңіз." },
  ru: { title: "Раздел администратора", loading: "Проверяем роль…", denied: "Этот раздел доступен только администраторам.", setup: "Инструменты управления пока не подключены. Роль должна назначаться безопасно через Firebase Admin SDK.", back: "Вернуться в профиль", signIn: "Войдите под аккаунтом администратора." },
  en: { title: "Admin area", loading: "Checking role…", denied: "This area is restricted to administrator accounts.", setup: "Admin tools are not connected yet. The role must be granted securely through the Firebase Admin SDK.", back: "Back to profile", signIn: "Sign in with an administrator account." },
} as const;

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { locale } = useLanguage();
  const router = useRouter();
  const text = copy[locale];
  const [checking, setChecking] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    getIdTokenResult(user, true).then((token) => {
      if (!cancelled) setAdmin(token.claims.role === "admin");
    }).catch(() => {
      if (!cancelled) setAdmin(false);
    }).finally(() => {
      if (!cancelled) setChecking(false);
    });
    return () => { cancelled = true; };
  }, [loading, router, user]);

  return <main className="mx-auto flex min-h-[55vh] max-w-4xl items-center justify-center px-5 py-12"><section className="w-full max-w-xl rounded-3xl border border-[#e2e4d8] bg-white p-8 text-center dark:border-[#2e3528] dark:bg-[#191c16]">
    {(loading || (user && checking)) ? <LoaderCircle className="mx-auto h-9 w-9 animate-spin text-[#718527]"/> : admin ? <ShieldCheck className="mx-auto h-10 w-10 text-[#718527]"/> : <ShieldX className="mx-auto h-10 w-10 text-[#9b342a]"/>}
    <h1 className="mt-4 text-2xl font-black">{text.title}</h1>
    <p className="mt-3 text-sm text-[#5c6055] dark:text-[#9ea594]">{loading || (user && checking) ? text.loading : !user ? text.signIn : admin ? text.setup : text.denied}</p>
    <Link href="/profile" className="mt-6 inline-flex rounded-full bg-[#171914] px-5 py-3 text-sm font-bold text-white dark:bg-[#d8f06a] dark:text-[#171914]">{text.back}</Link>
  </section></main>;
}
