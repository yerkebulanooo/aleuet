import { Dictionary } from "../types";
import { common, nav, theme, hero, potential, continueLearning, topicsSection, recommendedSection, footer } from "./ru/main";
import { aboutPage } from "./ru/about";
import { catalog, material, assessment, complete } from "./ru/pages1";
import { learning, profile, events, product } from "./ru/pages2";

export const ru: Dictionary = {
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
