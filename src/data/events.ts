import { EventItem } from "@/types";

export const events: EventItem[] = [
  {
    id: "evt-1",
    slug: "research-question-workshop",
    title: "Практический воркшоп: Как сформулировать первый исследовательский вопрос",
    type: "workshop",
    typeLabel: "Офлайн-воркшоп",
    date: "12 октября 2026",
    dateDay: "12",
    dateMonth: "октября",
    time: "15:00 – 18:00 (GMT+5)",
    isOnline: false,
    city: "Алматы",
    venue: "SmartPoint, коворкинг Hub, зал Алма",
    speaker: {
      name: "Данияр Касымов",
      role: "Исследователь, выпускник Nazarbayev University & Oxford",
      bio: "Автор 12 рецензируемых публикаций, наставник победителей республиканских и международных научных олимпиад школьников.",
    },
    description:
      "Живой интерактивный воркшоп для старшеклассников 9–11 классов. За 3 часа каждый участник выберет тему, проверит её по стандартам FINER, сформулирует гипотезу и получит персональную обратную связь от ментора.",
    program: [
      {
        time: "15:00 – 15:40",
        title: "Разбор 10 типичных ошибок в темах научных проектов",
        description: "Интерактивный разбор реальных заявок прошлых лет и упражнение по сужению темы.",
      },
      {
        time: "15:40 – 16:50",
        title: "Индивидуальная и групповая работа над гипотезами",
        description: "Формулирование гипотез по шаблону с фасилитацией менторов.",
      },
      {
        time: "17:00 – 18:00",
        title: "Питчинг идей и план работы на 3 недели",
        description: "Каждый школьник презентует свой исследовательский вопрос за 90 секунд и получает экспертный фидбек.",
      },
    ],
    spotsLeft: 6,
    totalSpots: 25,
    relatedMaterialSlugs: [
      "research-question-formulation",
      "literature-review-basics",
    ],
  },
  {
    id: "evt-2",
    slug: "college-portfolio-webinar",
    title: "Онлайн-вебинар: Архитектура портфолио старшеклассника для зарубежных стипендий",
    type: "webinar",
    typeLabel: "Онлайн-вебинар",
    date: "24 октября 2026",
    dateDay: "24",
    dateMonth: "октября",
    time: "18:30 – 20:00 (Zoom / YouTube Live)",
    isOnline: true,
    city: "Онлайн",
    venue: "Платформа Aleuet Live / Zoom",
    speaker: {
      name: "Санжар Темирханов",
      role: "EdTech консультант, Admissions Advisor",
      bio: "Помог более 80 школьникам из Центральной Азии поступить на полные гранты в вузы США, Европы и Азии.",
    },
    description:
      "Разбираем тренды поступления 2026/2027: что ценится больше — академические оценки, внеклассные проекты или социальный импакт. Как составить сильный Common App профиль.",
    program: [
      {
        time: "18:30 – 19:15",
        title: "Анатомия успешной заявки с полным финансированием",
        description: "Разбор 3 реальных кейсов студентов из Казахстана и Узбекистана.",
      },
      {
        time: "19:15 – 20:00",
        title: "Сессия вопросов и ответов (Live Q&A)",
        description: "Прямой разбор вопросов от участников вебинара.",
      },
    ],
    spotsLeft: 42,
    totalSpots: 100,
    relatedMaterialSlugs: [
      "student-portfolio-strategy",
      "first-cv-and-cold-emails",
    ],
  },
  {
    id: "evt-3",
    slug: "youth-research-symposium",
    title: "Городской симпозиум школьных исследовательских проектов Aleuet Next",
    type: "meetup",
    typeLabel: "Митап и стендовая сессия",
    date: "7 ноября 2026",
    dateDay: "07",
    dateMonth: "ноября",
    time: "11:00 – 16:00 (GMT+5)",
    isOnline: false,
    city: "Астана",
    venue: "Astana Hub, Event Space",
    speaker: {
      name: "Алия Нурланова и команда экспертов",
      role: "PhD кандидаты, научные менторы",
      bio: "Ведущие ученые и менторы платформы Aleuet.",
    },
    description:
      "Стендовая презентация лучших исследовательских проектов участников платформы Aleuet, нетворкинг с молодыми учеными и награждение победителей осеннего сезона.",
    program: [
      {
        time: "11:00 – 13:00",
        title: "Стендовая сессия проектов",
        description: "Презентация исследований перед жюри и гостями.",
      },
      {
        time: "14:00 – 16:00",
        title: "Панельная дискуссия и награждение",
        description: "Круглый стол «Наука для молодых» и вручение грантов на публикацию.",
      },
    ],
    spotsLeft: 18,
    totalSpots: 50,
    relatedMaterialSlugs: [
      "research-question-formulation",
      "academic-essay-structure",
    ],
  },
];
