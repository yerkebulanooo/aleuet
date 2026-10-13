import { UserProfile } from "@/types";

export const guestUser: UserProfile = {
  id: "user-guest",
  name: "Жаңа оқушы (Қонақ)",
  grade: "9–11 сынып оқушысы",
  city: "Қазақстан",
  avatarInitials: "AL",
  level: 1,
  levelTitle: "Бастаушы оқушы",
  currentXP: 0,
  nextLevelXP: 300,
  streakDays: 0,
  completedMaterialsCount: 0,
  inProgressMaterialsCount: 0,
  topicsProgress: [
    {
      topicId: "research",
      topicTitle: "Зерттеулер",
      accentBg: "bg-[#d8f06a]",
      completedCount: 0,
      totalCount: 3,
      percent: 0,
    },
    {
      topicId: "career",
      topicTitle: "Мансап және портфолио",
      accentBg: "bg-[#a7dcff]",
      completedCount: 0,
      totalCount: 2,
      percent: 0,
    },
    {
      topicId: "finance",
      topicTitle: "Қаржылық сауат",
      accentBg: "bg-[#ffd6a5]",
      completedCount: 0,
      totalCount: 1,
      percent: 0,
    },
    {
      topicId: "critical-thinking",
      topicTitle: "Сыни ойлау",
      accentBg: "bg-[#e3dbff]",
      completedCount: 0,
      totalCount: 1,
      percent: 0,
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Алғашқы гипотеза",
      description: "Зерттеу сұрағын құрастырып, алғашқы түсінікті тексеруден өтіңіз.",
      iconName: "Compass",
      category: "Зерттеу",
    },
    {
      id: "ach-2",
      title: "Үздіксіз серия",
      description: "Платформаға үш күн қатарынан кіріп, сабақтарды қараңыз.",
      iconName: "Flame",
      category: "Дағды",
    },
    {
      id: "ach-3",
      title: "Дереккөздер шебері",
      description: "Академиялық іздеу құралдарымен танысып, конспект жасаңыз.",
      iconName: "BookOpen",
      category: "Зерттеу",
    },
  ],
  savedWorks: [],
  activityHistory: [],
};

export const demoUser: UserProfile = {
  id: "user-demo",
  name: "Демо-оқушы (Сценарий)",
  grade: "10–11 сынып · Пилоттық тестілеу",
  city: "Қазақстан",
  avatarInitials: "ДО",
  level: 2,
  levelTitle: "Зерттеуші оқушы (Демо)",
  currentXP: 300,
  nextLevelXP: 600,
  streakDays: 3,
  completedMaterialsCount: 1,
  inProgressMaterialsCount: 1,
  topicsProgress: [
    {
      topicId: "research",
      topicTitle: "Зерттеулер",
      accentBg: "bg-[#d8f06a]",
      completedCount: 1,
      totalCount: 3,
      percent: 33,
    },
    {
      topicId: "career",
      topicTitle: "Мансап және портфолио",
      accentBg: "bg-[#a7dcff]",
      completedCount: 0,
      totalCount: 2,
      percent: 0,
    },
    {
      topicId: "finance",
      topicTitle: "Қаржылық сауат",
      accentBg: "bg-[#ffd6a5]",
      completedCount: 0,
      totalCount: 1,
      percent: 0,
    },
    {
      topicId: "critical-thinking",
      topicTitle: "Сыни ойлау",
      accentBg: "bg-[#e3dbff]",
      completedCount: 0,
      totalCount: 1,
      percent: 0,
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Алғашқы гипотеза",
      description: "Зерттеу сұрағын суреттеп, тестілеуді сәтті аяқтадыңыз.",
      unlockedAt: "Пилоттық тестілеуде",
      iconName: "Compass",
      category: "Зерттеу",
    },
    {
      id: "ach-2",
      title: "Үздіксіз серия",
      description: "Платформаға қатарынан кіріп, сабақтармен таныстыңыз.",
      unlockedAt: "3 күн",
      iconName: "Flame",
      category: "Дағды",
    },
    {
      id: "ach-3",
      title: "Дереккөздер шебері",
      description: "Академиялық іздеу құралдарымен танысыңыз.",
      iconName: "BookOpen",
      category: "Зерттеу",
    },
  ],
  savedWorks: [
    {
      id: "work-1",
      title: "Зерттеу сұрағы мен гипотезалар құрылымы (Демо-үлгі)",
      materialTitle: "Зерттеу сұрағын қалай тұжырымдау керек",
      materialSlug: "research-question-formulation",
      date: "Пилоттық жоба",
      status: "reviewed",
      statusLabel: "Тексерілді (Демо)",
      feedback: "Сұрақты суреттеу өте нақты! Сұхбат алу сұрақтарын кеңейту ұсынылады.",
      fileType: "PDF · 1.1 МБ",
    },
  ],
  activityHistory: [
    {
      id: "act-1",
      type: "passed_assessment",
      title: "«Зерттеу сұрағы» тесті сәтті тапсырылды",
      subtitle: "Нәтиже: 100% · Демонстрациялық пайдаланушы жолы",
      timestamp: "Бүгін",
      xpEarned: 150,
      href: "/materials/research-question-formulation",
    },
    {
      id: "act-2",
      type: "earned_achievement",
      title: "«Алғашқы гипотеза» жетістігі ашылды",
      subtitle: "Бағыт: Зерттеулер",
      timestamp: "Бүгін",
      xpEarned: 50,
      href: "/profile",
    },
  ],
};

export const currentUser: UserProfile = guestUser;

export function getUserProfile(isDemoMode: boolean): UserProfile {
  return isDemoMode ? demoUser : guestUser;
}

