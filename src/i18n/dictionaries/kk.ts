import { Dictionary } from "../types";
import { common, nav, theme, hero, potential, continueLearning, topicsSection, recommendedSection, footer } from "./kk/main";
import { aboutPage } from "./kk/about";
import { catalog, material, assessment, complete } from "./kk/pages1";
import { learning, profile, events, product } from "./kk/pages2";

export const kk: Dictionary = {
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
