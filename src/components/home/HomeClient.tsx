"use client";

import React from "react";
import { HomeHero } from "./HomeHero";
import { HomeTopics } from "./HomeTopics";
import { HomePromo } from "./HomePromo";

export function HomeClient() {
  return (
    <div className="space-y-16 pb-16 pt-6 sm:space-y-20 sm:pt-10">
      <HomeHero />
      <HomeTopics />
      <HomePromo />
    </div>
  );
}
