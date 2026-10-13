# Firebase setup for Aleuet

Aleuet now has a shared Firebase Web SDK client for Firebase Authentication and Cloud Firestore.
The client is initialized once and is safe to import before Firebase configuration is present.

## Current connection

The Firebase project `aleuet-32228` and Web app `Aleuet Web` are registered. The local `.env.local`
contains that app's public Web SDK configuration. It is ignored by Git; never commit it. The values
are public client configuration, not Admin SDK credentials.

Firebase Authentication is enabled with Email/Password and Google. The `aleuet.vercel.app`
production domain is authorized for OAuth redirects. Firebase currently uses the Google account
available in project settings as the provider's support email; `aleuet.education@gmail.com` was not
available in the selector when checked. Cloud Firestore's default database has been created in
`europe-west3` (Frankfurt) in production/locked mode, so client access is denied until narrowly
scoped rules are added. The project remains on the Spark (no-cost) plan.

## Enable only the services you plan to use

- Make `aleuet.education@gmail.com` available in the Firebase/Google project support-email selector,
  then update the Google provider's public support contact.
- Add narrowly scoped Firestore security rules before storing user or learning-progress data. The
  current default rules deny all client reads and writes.

Call `getFirebaseClient()` from a client-side feature to get `auth` and `db`. It reports a clear
setup error if Firebase configuration is missing. `isFirebaseConfigured` can be used to show setup
or demo states.

## Configure deployed environments

The public Web SDK values have been added to the Vercel project for Development, Preview, and
Production. A deployment from a commit that includes this Firebase integration is still required
before the settings take effect on the public site. Restart the development server after changing
`.env.local`.

Firebase web configuration identifies the project; authorization must be enforced by Firebase
Authentication and Firestore Security Rules. Do not use open read/write rules for production data.
