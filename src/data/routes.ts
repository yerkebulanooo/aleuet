import { LearningRoute } from "@/types";

export const learningRoutes: LearningRoute[] = [
  {
    id: "route-research-starter",
    slug: "research-starter",
    title: "Маршрут юного исследователя",
    description: "Пошаговый трек от первой идеи и формулировки гипотезы до сбора данных и написания тезисов.",
    topicId: "research",
    topicTitle: "Исследования",
    accentBg: "bg-[#d8f06a]",
    accentText: "text-[#4d6300]",
    totalMaterials: 3,
    completedMaterials: 1,
    materialSlugs: [
      "research-question-formulation",
      "literature-review-basics",
      "data-collection-methods",
    ],
  },
  {
    id: "route-career-launch",
    slug: "career-launch",
    title: "Карьерный старт и сильное резюме",
    description: "Как упаковать личные проекты, найти ментора и написать первое профессиональное письмо.",
    topicId: "career",
    topicTitle: "Карьера",
    accentBg: "bg-[#a7dcff]",
    accentText: "text-[#005580]",
    totalMaterials: 2,
    completedMaterials: 1,
    materialSlugs: [
      "student-portfolio-strategy",
      "first-cv-and-cold-emails",
    ],
  },
  {
    id: "route-academic-excellence",
    slug: "academic-excellence",
    title: "Академическая грамотность и эссе",
    description: "Критический анализ источников, структура аргументов и написание конкурсных работ.",
    topicId: "academic-writing",
    topicTitle: "Академическое письмо",
    accentBg: "bg-[#cbf7d3]",
    accentText: "text-[#1d6b30]",
    totalMaterials: 2,
    completedMaterials: 0,
    materialSlugs: [
      "cognitive-biases-and-factchecking",
      "academic-essay-structure",
    ],
  },
];
