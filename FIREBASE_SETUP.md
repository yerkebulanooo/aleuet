# Firebase setup for Aleuet

Aleuet uses Firebase Authentication and Cloud Firestore for accounts and private profile data.
The client is initialized once and is safe to import before Firebase configuration is present.

## Current connection

The Firebase project `aleuet-32228` and Web app `Aleuet Web` are registered. The local `.env.local`
contains that app's public Web SDK configuration. It is ignored by Git; never commit it. The values
are public client configuration, not Admin SDK credentials.

Firebase Authentication is enabled with Email/Password and Google. The `aleuet.vercel.app`
production domain is authorized for OAuth redirects. Cloud Firestore's default database is in
`europe-west3` (Frankfurt). `firestore.rules` allows a signed-in user to access only their own
profile document and prevents profile writes from adding role fields. Other collections remain
closed. These rules were compiled and successfully deployed to Cloud Firestore after refreshing
Firebase CLI authentication. The project remains on the Spark (no-cost) plan.

## Enable only the services you plan to use

- To redeploy a future change to Firestore rules, run from the project root:
  `firebase deploy --only firestore:rules --project aleuet-32228`.
- If Google login still fails after deployment, use the visible Firebase error code on the login
  page. Check Firebase Authentication → Settings → Authorized domains and Google provider status.
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
