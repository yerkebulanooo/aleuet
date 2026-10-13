import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

try {
  process.loadEnvFile(".env.local");
} catch {
  // The deployment environment may provide project configuration directly.
}

const uid = process.argv[2];
const projectId = process.env.GCLOUD_PROJECT || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!uid || !projectId) {
  console.error("Usage: pnpm admin:grant <firebase-user-uid>");
  console.error("Set GOOGLE_APPLICATION_CREDENTIALS (or authenticate with Google ADC) and ensure the Firebase project ID is available.");
  process.exit(1);
}

initializeApp({ credential: applicationDefault(), projectId });

const auth = getAuth();
const user = await auth.getUser(uid);
await auth.setCustomUserClaims(uid, { ...user.customClaims, role: "admin" });

console.log(`Admin role granted to Firebase UID ${uid}. The user must sign out and sign in again to refresh the ID token.`);
