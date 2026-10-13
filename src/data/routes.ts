import { LearningRoute } from "@/types";

export const learningRoutes: LearningRoute[] = [
  {
    id: "route-research-starter",
    slug: "research-starter",
    title: "Жас зерттеушінің оқу маршруты",
    description: "Бастапқы идея мен гипотезаны құрастырудан бастап дерек жинауға дейінгі қадамдық оқу бағыты.",
    topicId: "research",
    topicTitle: "Зерттеулер",
    accentBg: "bg-[#d8f06a]",
    accentText: "text-[#3e5000]",
    totalMaterials: 3,
    completedMaterials: 0,
    materialSlugs: [
      "research-question-formulation",
      "literature-review-basics",
      "data-collection-methods",
    ],
  },
  {
    id: "route-career-launch",
    slug: "career-launch",
    title: "Мансаптық бастама және портфолио",
    description: "Жеке жобаларды жүйелеу, ментор табу және алғашқы кәсіби хат жазу дағдылары.",
    topicId: "career",
    topicTitle: "Мансап",
    accentBg: "bg-[#a7dcff]",
    accentText: "text-[#004f77]",
    totalMaterials: 2,
    completedMaterials: 0,
    materialSlugs: [
      "student-portfolio-strategy",
      "first-cv-and-cold-emails",
    ],
  },
  {
    id: "route-academic-excellence",
    slug: "academic-excellence",
    title: "Академиялық сауаттылық және эссе",
    description: "Дереккөздерді сыни талдау, дәлелдер құрылымы және конкурс жұмыстарын рәсімдеу.",
    topicId: "academic-writing",
    topicTitle: "Академиялық жазу",
    accentBg: "bg-[#cbf7d3]",
    accentText: "text-[#135924]",
    totalMaterials: 2,
    completedMaterials: 0,
    materialSlugs: [
      "cognitive-biases-and-factchecking",
      "academic-essay-structure",
    ],
  },
];

