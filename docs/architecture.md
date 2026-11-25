# Архитектура Aleuet

Схемы в формате Mermaid: GitHub и VS Code рисуют их как картинки. Обновляй при изменении архитектуры.

## 1. Система целиком

```mermaid
graph LR
  Social["TikTok / Reels / Shorts"] -->|UTM-ссылка| Vercel
  subgraph Vercel["Vercel: aleuet.vercel.app"]
    Next["Next.js 16 App Router<br/>(клиентские страницы)"]
    Proxy["rewrite /__/auth/*"]
  end
  Next -->|Firebase JS SDK| Auth["Firebase Auth<br/>email + Google"]
  Next -->|Firebase JS SDK| FS[("Cloud Firestore<br/>europe-west3")]
  Proxy --> Helper["aleuet-32228.firebaseapp.com"]
  Rules["firestore.rules"] -.защищает.-> FS
  Script["scripts/set-admin-claim.mjs<br/>(локально, Admin SDK)"] -->|role: admin| Auth
  Static["src/data/*.ts<br/>статический контент"] -.fallback.-> Next
```

## 2. Провайдеры и слой данных

```mermaid
graph TD
  Layout["app/layout.tsx"] --> Theme[ThemeProvider] --> Lang["LanguageProvider<br/>t, locale, isDemoMode"] --> AuthP["AuthProvider<br/>useAuth()"]
  AuthP --> Pages[Страницы]
  Pages -->|usePublishedContent| Content["lib/content.ts"]
  Content -->|contentMeta.initialized?| FS[(Firestore)]
  Content -->|нет / ошибка| Data["src/data/*.ts"]
  Pages -->|import напрямую| Data
  Lang --> Dict["i18n/dictionaries/{kk,ru,en}"]
```

## 3. Страницы и источники данных

```mermaid
graph LR
  subgraph FirestoreBacked["Firestore + fallback"]
    catalog["/catalog"]
    material["/materials/[slug]"]
    events["/events"]
    event["/events/[slug]"]
  end
  subgraph AuthOnly["Firestore, нужен вход"]
    profile["/profile"]
    admin["/admin (role=admin)"]
  end
  subgraph StaticOnly["Только src/data (мок)"]
    home["/"]
    learning["/learning"]
    assessment["/materials/[slug]/assessment"]
    complete["/materials/[slug]/complete"]
    product["/products/[slug]"]
  end
  login["/login"] --> profile
  catalog --> material --> assessment --> complete
  complete -->|рекомендация| material
  material --> product
  material --> event
```

## 4. Модель данных Firestore

```mermaid
erDiagram
  USERS {
    string uid PK "= Auth uid"
    string displayName "<=60"
    string email "= token.email"
    string photoURL
    string grade
    string city
    string locale "kk|ru|en"
    timestamp createdAt
    timestamp updatedAt
  }
  MATERIALS {
    string slug PK "= doc id"
    string publicationStatus "draft|published"
    string title "<=180"
    string topicId
    string level
    map video
    array learningOutcomes
    array resources
    string assessmentSlug
    string nextMaterialSlug
  }
  EVENTS {
    string slug PK
    string publicationStatus
    string title
    string date
    array program
  }
  LEADS {
    string id PK "auto"
    string kind "product|event"
    string targetSlug
    string targetTitle
    string name
    string phone
    string email
    string note
    string locale
    string uid "'' для гостя"
    string status "new|contacted|closed"
    timestamp createdAt
  }
  CONTENT_META {
    string name PK "materials|events"
    bool initialized
  }
  USERS ||--o{ PROGRESS : "users/{uid}/progress/{slug}"
  USERS ||--o{ XP : "users/{uid}/xp/{entryId}"
  PROGRESS {
    string materialSlug PK
    string status "not_started|in_progress|completed"
    int positionSeconds
    int durationSeconds
    bool watched ">=90% просмотра"
    int assessmentScore "-1 = не сдавал"
    bool assessmentPassed
  }
  XP {
    string entryId PK "assessment-{slug}"
    int amount "<=1000"
    string reason
    string materialSlug
  }
  CONTENT_META ||--o{ MATERIALS : "включает Firestore-режим"
  CONTENT_META ||--o{ EVENTS : "включает Firestore-режим"
```

Права (`firestore.rules`):

| Коллекция | Чтение | Запись |
|---|---|---|
| `users/{uid}` | владелец или admin (list только admin) | только владелец, строгая схема полей, без ролей |
| `materials`, `events` | все, если `published`; admin видит всё | только admin |
| `contentMeta/{materials,events}` | все (get) | только admin |
| `users/{uid}/progress` | владелец или admin | владелец, строгая схема |
| `users/{uid}/xp` | владелец или admin | только create владельцем, id = `assessment-{slug}`; изменять и удалять нельзя |
| `leads` | только admin | create — все (строгая схема, status=new); update только `status` — admin |
| остальное | запрещено | запрещено |

## 5. Вход и создание профиля

```mermaid
sequenceDiagram
  participant U as Пользователь
  participant App as Next.js (AuthProvider)
  participant A as Firebase Auth
  participant F as Firestore
  U->>App: email/пароль или «Войти через Google»
  App->>A: signIn / signInWithRedirect
  A-->>App: onAuthStateChanged(user)
  App->>F: transaction: users/{uid} существует?
  alt нет профиля
    App->>F: set(профиль по умолчанию, locale=kk)
  end
  App->>A: getIdTokenResult → claims.role
  Note over App: role=admin → ссылка на /admin
```

## 6. Целевой цикл MVP (ТЗ, раздел 18) и текущее состояние

```mermaid
graph LR
  S1["1. Открыл лекцию по ссылке<br/>✅ страница есть, ⬜ UTM"] --> S2["2. Смотрит видео<br/>✅ YouTube-плеер, ✅ позиция"]
  S2 --> S3["3. Тест<br/>✅ результат сохраняется, 🟡 вопросы в коде"]
  S3 --> S4["4. Прогресс и XP<br/>✅ progress + xp-журнал"]
  S4 --> S5["5. Рекомендация<br/>🟡 статичная nextMaterialSlug"]
  S5 --> S6["6. Заявка / событие<br/>✅ сохраняются в leads"]
```

Легенда: ✅ готово · 🟡 частично · ⬜ не сделано. Актуальный статус — в [ROADMAP.md](../ROADMAP.md).
