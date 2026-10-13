"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    return onAuthStateChanged(getFirebaseClient().auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const { auth } = getFirebaseClient();
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name.trim() });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(getFirebaseClient().auth, email, password);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await signInWithPopup(getFirebaseClient().auth, new GoogleAuthProvider());
  }, []);

  const logOut = useCallback(async () => {
    await signOut(getFirebaseClient().auth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, configured: isFirebaseConfigured, signUp, signIn, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
