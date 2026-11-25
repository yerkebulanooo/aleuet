@AGENTS.md

# Aleuet: карта проекта

Aleuet — образовательная медиаплатформа на казахском (плюс RU/EN) для старшеклассников. Цикл продукта:
внешний ролик (TikTok/Reels/Shorts) → лекция на платформе → тест → прогресс/XP → рекомендация → продукт или событие.
Источник требований: `Aleuet_Platform_Technical_Specification_v2.docx` (ТЗ v2) и `6 week plan.docx` (пилот).

**В начале каждой сессии читай [ROADMAP.md](ROADMAP.md)**: там текущая фаза, следующая задача и журнал прогресса.
В конце работы обновляй ROADMAP (отметь сделанное, добавь запись в журнал).
Подробные схемы (Mermaid): [docs/architecture.md](docs/architecture.md).

## Стек и команды

- Next.js 16.3 (App Router, `src/app`), React 19, TypeScript, Tailwind v4, `lucide-react`, `next-themes`.
- Firebase 12 (клиентский SDK): Auth (email/пароль + Google redirect) и Firestore. Проект `aleuet-32228`, регион `europe-west3`, план Spark.
- Деплой: Vercel (`aleuet.vercel.app`). Пакетный менеджер: **pnpm**.
- `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm admin:grant <uid>` (выдать роль admin, нужны Admin-креды локально).
- Правила Firestore: `firebase deploy --only firestore:rules --project aleuet-32228`.
- Тестов пока нет. Проверка изменений: `pnpm lint` + `pnpm build` + ручной прогон в браузере.

## Структура `src/`

| Путь | Что там |
|---|---|
| `app/` | Страницы: `/` главная, `/catalog`, `/materials/[slug]` (+ `/assessment`, `/complete`), `/learning`, `/events`, `/events/[slug]`, `/products/[slug]`, `/about`, `/login`, `/profile`, `/admin`. Почти всё `"use client"`. |
| `components/` | `layout/` (Header, Footer, MobileNav, MvpBanner, переключатели языка/темы), `home/`, `materials/`, `events/`, `products/`, `learning/`, `ui/` (Button, Card, Modal, Tabs, Input, Badge, ProgressBar). |
| `data/*.ts` | Статический демо-контент: materials, events, products, topics, routes, assessments, user (мок-профиль). |
| `lib/content.ts` | `usePublishedContent(name, fallback)`: живые данные из Firestore, иначе статический fallback. |
| `lib/firebase/client.ts` | `getFirebaseClient()` → `{auth, db}` (только в браузере); `isFirebaseConfigured`. |
| `providers/` | `AuthProvider` (`useAuth`), `LanguageProvider` (`useLanguage`: `t`, `locale`, `isDemoMode`), `ThemeProvider`. |
| `i18n/` | Словари UI `dictionaries/{kk,ru,en}/*.ts`, тип `Dictionary` в `types.ts`. Язык по умолчанию `kk`, хранится в localStorage. |
| `types/index.ts` | Доменные типы: Material, Assessment, EventItem, ProductItem, Topic, LearningRoute, UserProfile и др. |

## Данные: что реально, а что мок

- **Firestore (реально):** `users/{uid}` (профиль: displayName, email, photoURL, grade, city, locale, createdAt, updatedAt; создаётся при первом входе в `auth-provider`), `materials/{slug}`, `events/{slug}`, `contentMeta/{materials|events}`, `users/{uid}/progress/{materialSlug}` и `users/{uid}/xp/{entryId}` (прогресс и XP-журнал, `lib/progress.ts`; у гостя то же в localStorage, переносится при входе), `leads/{auto-id}` (заявки на продукт и регистрации на событие: пишет кто угодно через `lib/leads.ts`, читает и меняет статус только admin во вкладке «Заявки» в `/admin`).
- **Публикация контента:** запись видна публично только при `publicationStatus == "published"`. Если `contentMeta/<name>.initialized` нет, сайт показывает статический `data/*.ts`.
- **Используют Firestore:** `catalog`, `materials/[slug]`, `events`, `events/[slug]` (через `usePublishedContent`), `profile`, `admin`, формы `ProductOrderForm` и `EventRegistrationModal` (→ `leads`).
- **Пока только статика/мок:** products, topics, routes, assessments, достижения и streak (`data/user.ts`), главная и шапка (`getUserProfile`), `/complete`. Видео: `YouTubePlayer`, если у материала `video.provider = "youtube"` и `videoId`, иначе `VideoPlayerMock`.
- **Роли:** admin = Firebase custom claim `role: "admin"` (не поле профиля!). Проверка на клиенте через `getIdTokenResult`, в правилах через `request.auth.token.role`.
- `firestore.rules` закрывает все прочие коллекции. **Любая новая коллекция требует правила** и деплоя.

## Правила работы

- Перед кодом сверяйся с доками Next 16 в `node_modules/next/dist/docs/` (см. AGENTS.md).
- Весь пользовательский текст в трёх языках (kk, ru, en). UI-строки — в словари `i18n`, не хардкодом. Исключение сейчас: `admin/page.tsx` и `profile/page.tsx` держат свой объект `copy`.
- Секреты: `.env.local` не коммитить; Admin SDK ключи никогда не в `NEXT_PUBLIC_*`.
- Google-вход идёт через redirect и прокси `/__/auth/*` → `firebaseapp.com` (`next.config.ts`). `authDomain` и OAuth redirect URI меняются только вместе (см. FIREBASE_SETUP.md).
- Коммиты в стиле Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Принцип из ТЗ: один законченный пользовательский цикл важнее широты функций. Не делать платежи, ленту коротких видео, соцфункции, пока это не в ROADMAP.
