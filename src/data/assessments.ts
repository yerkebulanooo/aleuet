import { Assessment } from "@/types";

export const assessments: Record<string, Assessment> = {
  "research-question-formulation": {
    id: "ass-1",
    materialSlug: "research-question-formulation",
    title: "Проверка понимания: Исследовательский вопрос",
    description: "Ответьте на 4 вопроса, чтобы закрепить материал лекции, получить 150 XP и открыть следующий шаг.",
    passingScorePercent: 75,
    xpReward: 150,
    questions: [
      {
        id: "q1",
        question: "Какая из следующих формулировок является качественным исследовательским вопросом по стандарту FINER?",
        explanation:
          "Правильный вопрос конкретен, проверяем, локализован во времени и пространстве и допускает измерение эффекта.",
        options: [
          {
            id: "opt-1",
            text: "Как глобальное потепление влияет на планету Земля?",
            isCorrect: false,
          },
          {
            id: "opt-2",
            text: "Почему всем людям нужно сортировать пластиковый мусор?",
            isCorrect: false,
          },
          {
            id: "opt-3",
            text: "Как внедрение 15-минутного проветривания классов снижает уровень CO2 и утомляемость старшеклассников в школах Алматы?",
            isCorrect: true,
          },
          {
            id: "opt-4",
            text: "Будет ли экология чище через 50 лет?",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        question: "Что означает буква 'F' в аббревиатуре критериев качества темы FINER?",
        explanation:
          "F — Feasible (Выполнимый): у вас есть доступ к данным, оборудованию, участникам и времени для завершения работы.",
        options: [
          {
            id: "opt-1",
            text: "Fast (Быстрый)",
            isCorrect: false,
          },
          {
            id: "opt-2",
            text: "Feasible (Выполнимый и реалистичный по ресурсам)",
            isCorrect: true,
          },
          {
            id: "opt-3",
            text: "Famous (Известный в научном сообществе)",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q3",
        question: "В чем главное отличие научной гипотезы от обычного мнения?",
        explanation:
          "Научная гипотеза должна быть фальсифицируемой (опровержимой) и поддаваться эмпирической проверке данными.",
        options: [
          {
            id: "opt-1",
            text: "Гипотеза всегда обязана подтверждаться в конце эксперимента",
            isCorrect: false,
          },
          {
            id: "opt-2",
            text: "Гипотеза должна быть фальсифицируемой и проверяемой конкретными измерениями",
            isCorrect: true,
          },
          {
            id: "opt-3",
            text: "Гипотезу нельзя менять в процессе формулировки",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q4",
        question: "Какое первое действие необходимо сделать, если ваша тема звучит как «ИИ в медицине»?",
        explanation:
          "Слишком широкую тему нужно сузить: выбрать конкретное заболевание, методику и доступный датасет.",
        options: [
          {
            id: "opt-1",
            text: "Сразу писать введение на 30 страниц",
            isCorrect: false,
          },
          {
            id: "opt-2",
            text: "Сузить контекст до конкретного заболевания, типа данных и метода анализа",
            isCorrect: true,
          },
          {
            id: "opt-3",
            text: "Отказаться от темы, так как она невыполнима",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  "student-portfolio-strategy": {
    id: "ass-2",
    materialSlug: "student-portfolio-strategy",
    title: "Проверка понимания: Стратегия портфолио",
    description: "3 вопроса по методике позиционирования и модели STAR.",
    passingScorePercent: 66,
    xpReward: 150,
    questions: [
      {
        id: "sp-1",
        question: "Что такое концепция «The Spike» в контексте поступления в топовые университеты?",
        explanation:
          "Spike — это выраженная глубина и выдающееся достижение в одной ключевой области.",
        options: [
          {
            id: "sp-opt-1",
            text: "Резкий скачок оценок в 11 классе",
            isCorrect: false,
          },
          {
            id: "sp-opt-2",
            text: "Ярко выраженная страсть и глубокий фокус в конкретной предметной сфере",
            isCorrect: true,
          },
          {
            id: "sp-opt-3",
            text: "Участие во всех возможных кружках",
            isCorrect: false,
          },
        ],
      },
      {
        id: "sp-2",
        question: "Как расшифровывается модель STAR при описании проектов?",
        explanation: "STAR = Situation, Task, Action, Result.",
        options: [
          {
            id: "sp-opt-1",
            text: "Skill, Talent, Ambition, Recognition",
            isCorrect: false,
          },
          {
            id: "sp-opt-2",
            text: "Situation, Task, Action, Result",
            isCorrect: true,
          },
        ],
      },
      {
        id: "sp-3",
        question: "Что важнее всего отразить в блоке «Result» (Результат)?",
        explanation: "Конкретные измеримые метрики и качественные изменения.",
        options: [
          {
            id: "sp-opt-1",
            text: "Конкретные измеримые цифры и качественные изменения",
            isCorrect: true,
          },
          {
            id: "sp-opt-2",
            text: "Список всех участников проекта",
            isCorrect: false,
          },
        ],
      },
    ],
  },
};
