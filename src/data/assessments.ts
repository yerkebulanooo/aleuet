import { Assessment } from "@/types";

export const assessments: Record<string, Assessment> = {
  "research-question-formulation": {
    id: "ass-1",
    materialSlug: "research-question-formulation",
    title: "Түсінікті тексеру: Зерттеу сұрағы",
    description: "Сабақ материалын бекіту, 150 XP алу және келесі қадамды ашу үшін 4 сұраққа жауап беріңіз.",
    passingScorePercent: 75,
    xpReward: 150,
    questions: [
      {
        id: "q1",
        question: "Төмендегі тұжырымдардың қайсысы FINER стандарты бойынша сапалы зерттеу сұрағы болып табылады?",
        explanation:
          "Дұрыс сұрақ нақты, тексерілетін, уақыт пен кеңістік бойынша шектелген және нәтижені өлшеуге мүмкіндік береді.",
        options: [
          {
            id: "opt-1",
            text: "Ғаламдық жылыну Жер планетасына қалай әсер етеді?",
            isCorrect: false,
          },
          {
            id: "opt-2",
            text: "Неліктен адамдар пластик қоқысты сұрыптауы керек?",
            isCorrect: false,
          },
          {
            id: "opt-3",
            text: "Сыныптарды 15 минуттық желдетуді енгізу CO2 деңгейін және оқушылардың шаршауын қалай төмендетеді?",
            isCorrect: true,
          },
          {
            id: "opt-4",
            text: "50 жылдан кейін экология таза бола ма?",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        question: "FINER сапа өлшемдерінің аббревиатурасындағы 'F' әрпі нені білдіреді?",
        explanation:
          "F — Feasible (Орындалатын): сізде деректерге, қатысушыларға, құралдарға және уақытқа шынайы қолжетімділік бар.",
        options: [
          {
            id: "opt-1",
            text: "Fast (Жылдам)",
            isCorrect: false,
          },
          {
            id: "opt-2",
            text: "Feasible (Орындалатын, ресурстар мен уақыт бойынша қолжетімді)",
            isCorrect: true,
          },
          {
            id: "opt-3",
            text: "Famous (Ғылыми ортада танымал)",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q3",
        question: "Ғылыми гипотезаның жай пікір немесе болжамнан басты айырмашылығы неде?",
        explanation:
          "Ғылыми гипотеза жоққа шығарылатын (фальсификацияланатын) және эмпирикалық өлшеулермен тексерілетін болуы тиіс.",
        options: [
          {
            id: "opt-1",
            text: "Гипотеза эксперимент соңында міндетті түрде дұрыс болып шығуы керек",
            isCorrect: false,
          },
          {
            id: "opt-2",
            text: "Гипотеза тексерілетін, жоққа шығарылатын және нақты өлшеуге бағынатын болуы шарт",
            isCorrect: true,
          },
          {
            id: "opt-3",
            text: "Гипотезаны тұжырымдау процесінде өзгертуге мүлдем болмайды",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q4",
        question: "Егер бастапқы тақырыбыңыз «Медицинадағы ЖИ» деп аталса, алғашқы әрекет қандай болуы тиіс?",
        explanation:
          "Тым кең тақырыпты суреттеп, нақты бір ауру түріне, деректер форматына және қолжетімді әдіске дейін тарылту қажет.",
        options: [
          {
            id: "opt-1",
            text: "Бірден компьютерлер тарихы туралы 30 беттік кіріспе жазу",
            isCorrect: false,
          },
          {
            id: "opt-2",
            text: "Тақырыпты нақты ауру түріне, деректер типіне және қолжетімді әдіске дейін тарылту",
            isCorrect: true,
          },
          {
            id: "opt-3",
            text: "Тақырыптан бірден бас тарту, себебі ол оқушы үшін мүмкін емес",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  "student-portfolio-strategy": {
    id: "ass-2",
    materialSlug: "student-portfolio-strategy",
    title: "Түсінікті тексеру: Портфолио стратегиясы",
    description: "Позициялау әдістемесі мен STAR үлгісі бойынша 3 сұрақ.",
    passingScorePercent: 66,
    xpReward: 150,
    questions: [
      {
        id: "sp-1",
        question: "Жоғары оқу орындарына түсу контекстінде «The Spike» тұжырымдамасы нені білдіреді?",
        explanation:
          "Spike — барлық үйірмеге үстіртін қатысудың орнына, бір нақты бағытта айқын тереңдік пен нәтиже көрсету.",
        options: [
          {
            id: "sp-opt-1",
            text: "11-сыныптың соңғы тоқсанындағы бағалардың күрт өсуі",
            isCorrect: false,
          },
          {
            id: "sp-opt-2",
            text: "Белгілі бір пәндік саладағы айқын құштарлық пен терең фокус",
            isCorrect: true,
          },
          {
            id: "sp-opt-3",
            text: "Үйірмелер мен сертификаттар санының 10-нан асуы",
            isCorrect: false,
          },
        ],
      },
      {
        id: "sp-2",
        question: "Жобаларды сипаттауда STAR үлгісі қалай ашылады?",
        explanation: "STAR = Situation (Жағдай), Task (Міндет), Action (Әрекет), Result (Нәтиже).",
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
        question: "STAR үлгісіндегі «Result» (Нәтиже) блогында не ең маңызды?",
        explanation: "Нақты өлшенетін сандар, көрсеткіштер және сапалық өзгерістер.",
        options: [
          {
            id: "sp-opt-1",
            text: "Нақты өлшенетін цифрлар мен сапалық өзгерістер",
            isCorrect: true,
          },
          {
            id: "sp-opt-2",
            text: "Жобаға қатысқан барлық адамдардың тізімі",
            isCorrect: false,
          },
        ],
      },
    ],
  },
};
