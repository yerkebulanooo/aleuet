# Firebase setup for Aleuet

Aleuet uses Firebase Authentication and Cloud Firestore for accounts and private profile data.
The client is initialized once and is safe to import before Firebase configuration is present.

## Current connection

The Firebase project `aleuet-32228` and Web app `Aleuet Web` are registered. The local `.env.local`
contains that app's public Web SDK configuration. It is ignored by Git; never commit it. The values
are public client configuration, not Admin SDK credentials.

Firebase Authentication is enabled with Email/Password and Google. The `aleuet.vercel.app`
production domain is authorized in Firebase Authentication. Cloud Firestore's default database is in
`europe-west3` (Frankfurt). `firestore.rules` allows a signed-in user to access only their own
profile document and prevents profile writes from adding role fields. Other collections remain
closed. These rules were compiled and successfully deployed to Cloud Firestore after refreshing
Firebase CLI authentication. The project remains on the Spark (no-cost) plan.

## Enable only the services you plan to use

- To redeploy a future change to Firestore rules, run from the project root:
  `firebase deploy --only firestore:rules --project aleuet-32228`.
- Google redirect sign-in on the Vercel-hosted app needs first-party Firebase auth helpers. `next.config.ts`
  transparently proxies `/__/auth/*` to this project's `firebaseapp.com` helper host. In Vercel,
  set `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=aleuet.vercel.app` for Production, Preview, and Development,
  then redeploy. In Firebase Authentication → Settings → Authorized domains, ensure
  `aleuet.vercel.app` is listed. In the Google OAuth web client used by Firebase, add
  `https://aleuet.vercel.app/__/auth/handler` as an authorized redirect URI (keep the existing
  `https://aleuet-32228.firebaseapp.com/__/auth/handler` URI). The `authDomain` and OAuth URI must
  be changed together; otherwise Google sign-in will fail. For local development, redirect sign-in
  uses the same configured helper domain and requires `localhost` in Firebase Authorized domains.
- Admin access is a Firebase custom claim (`role: "admin"`), never a profile field. Grant it only
  from a trusted local environment with Firebase Admin credentials and the user's Firebase UID:
  `pnpm admin:grant <firebase-user-uid>`. Then have that user sign out and back in to refresh the
  token. Never commit service-account keys or expose them as `NEXT_PUBLIC_*` variables.
- The admin route currently verifies the claim and is a secure UI foundation; it does not yet
  expose administrative data or actions. Any future server-side admin API must verify the Firebase
  ID token and role on the server.

Call `getFirebaseClient()` from a client-side feature to get `auth` and `db`. It reports a clear
setup error if Firebase configuration is missing. `isFirebaseConfigured` can be used to show setup
or demo states.

## Configure deployed environments

The public Web SDK values have been added to the Vercel project for Development, Preview, and
Production. Restart the development server after changing `.env.local`.

Firebase web configuration identifies the project; authorization must be enforced by Firebase
Authentication and Firestore Security Rules. Do not use open read/write rules for production data.
