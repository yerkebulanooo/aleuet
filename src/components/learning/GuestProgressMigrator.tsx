"use client";

import { useEffect } from "react";
import { useAuth } from "@/providers/auth-provider";
import { migrateGuestProgress } from "@/lib/progress";

/** Moves progress earned as a guest into the account right after sign-in. Renders nothing. */
export function GuestProgressMigrator() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) void migrateGuestProgress(user.uid).catch(() => { /* retried on next sign-in */ });
  }, [user]);
  return null;
}
