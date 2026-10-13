import { Dictionary } from "../types";
import { common, nav, theme, hero, potential, continueLearning, topicsSection, recommendedSection, footer } from "./en/main";
import { aboutPage } from "./en/about";
import { catalog, material, assessment, complete } from "./en/pages1";
import { learning, profile, events, product } from "./en/pages2";

export const en: Dictionary = {
  common,
  nav,
  theme,
  hero,
  potential,
  continueLearning,
  topicsSection,
  recommendedSection,
  aboutPage,
  pages: {
    catalog,
    material,
    assessment,
    complete,
    learning,
    profile,
    events,
    product,
  },
  footer,
};
