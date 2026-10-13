export interface CommonDict {
  brand: string;
  mvpBannerBadge: string;
  mvpBannerText: string;
  demoModeBadge: string;
  guestModeBadge: string;
  demoModeToggle: string;
  guestModeToggle: string;
  level: string;
  xp: string;
  days: string;
  minutes: string;
  hours: string;
  inDevelopment: string;
  hypothesisBadge: string;
  loading: string;
  close: string;
}

export interface NavDict {
  catalog: string;
  learning: string;
  events: string;
  profile: string;
  about: string;
  home: string;
}

export interface ThemeDict {
  light: string;
  dark: string;
  system: string;
  toggleLabel: string;
}

export interface HeroDict {
  badge: string;
  title: string;
  subtitle: string;
  demoTrackBtn: string;
  aboutBtn: string;
}

export interface PotentialDict {
  title: string;
  streakLabel: string;
  xpLabel: string;
  levelLabel: string;
  guestPrompt: string;
  guestAction: string;
  nextLevelTo: string;
  profileLink: string;
  demoDisclaimer: string;
}

export interface AboutPageDict {
  heroBadge: string;
  heroTitle: string;
  heroText: string;
  audienceTitle: string;
  audienceSubtitle: string;
  audienceItems: { title: string; desc: string }[];
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  steps: { number: string; title: string; desc: string }[];
  currentStageTitle: string;
  currentStageSubtitle: string;
  stageItems: { title: string; desc: string }[];
  businessModelTitle: string;
  businessModelSubtitle: string;
  businessModelDisclaimer: string;
  freeTier: { title: string; items: string[] };
  paidTier: { title: string; items: string[] };
  partnerTier: { title: string; items: string[] };
  teamTitle: string;
  teamSubtitle: string;
  founderName: string;
  founderRole: string;
  founderDesc: string;
  founderNote: string;
  creativeShiftTitle: string;
  creativeShiftQuote: string;
  creativeShiftTrack: string;
  factsTitle: string;
  facts: { label: string; value: string }[];
  contactsTitle: string;
  contactsSubtitle: string;
  contactNotice: string;
  backHomeBtn: string;
}
export interface PagesDict {
  catalog: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    resetFilters: string;
    allTopics: string;
    levelFilterLabel: string;
    statusFilterLabel: string;
    allLevels: string;
    levelBeginner: string;
    levelIntermediate: string;
    levelAdvanced: string;
    allStatuses: string;
    statusNotStarted: string;
    statusInProgress: string;
    statusCompleted: string;
    emptyTitle: string;
    emptyDesc: string;
    showAllBtn: string;
  };
  material: {
    catalogBreadcrumb: string;
    xpRewardBadge: string;
    duration: string;
    videoPlayerBadge: string;
    videoPlaceholderTitle: string;
    videoPlaceholderDesc: string;
    chaptersTitle: string;
    aboutTitle: string;
    outcomesTitle: string;
    resourcesTitle: string;
    resourcesCount: string;
    resourceDownloadDemo: string;
    resourceInPrep: string;
    assessmentStepBadge: string;
    assessmentStepTitle: string;
    assessmentStepDesc: string;
    startAssessmentBtn: string;
    nextMaterialBadge: string;
    relatedEventBadge: string;
    relatedProductBadge: string;
    pricingHypothesisNote: string;
  };
  assessment: {
    backToLecture: string;
    questionStep: string;
    xpBadge: string;
    resultBadge: string;
    passedTitle: string;
    failedTitle: string;
    passedDesc: string;
    failedDesc: string;
    scoreLabel: string;
    passingLabel: string;
    claimRewardBtn: string;
    retryBtn: string;
    backLectureBtn: string;
    prevBtn: string;
    nextBtn: string;
    finishBtn: string;
  };
  complete: {
    badge: string;
    title: string;
    desc: string;
    rewardedXp: string;
    rewardedXpDesc: string;
    streakLabel: string;
    streakDesc: string;
    trackLabel: string;
    trackProgressGrowth: string;
    trackProgressTitle: string;
    nextRecommendedStep: string;
    nextMaterialBtn: string;
    myLearningBtn: string;
    catalogBtn: string;
  };
  learning: {
    badge: string;
    title: string;
    subtitle: string;
    findCourseBtn: string;
    tabInProgress: string;
    tabRoutes: string;
    tabCompleted: string;
    tabHistory: string;
    emptyInProgressTitle: string;
    emptyInProgressDesc: string;
    emptyCompletedTitle: string;
    emptyCompletedDesc: string;
    goToCatalogBtn: string;
    guestNoticeTitle: string;
    guestNoticeDesc: string;
  };
  profile: {
    guestWelcome: string;
    guestSubtitle: string;
    demoUserLabel: string;
    levelTitle: string;
    streakTitle: string;
    xpTitle: string;
    tabOverview: string;
    tabAchievements: string;
    tabWorks: string;
    tabSettings: string;
    tracksProgressTitle: string;
    nextGoalBadge: string;
    nextGoalTitle: string;
    nextGoalDesc: string;
    catalogBtn: string;
    achievementsUnlocked: string;
    achievementsLocked: string;
    workMentorFeedback: string;
    settingsLang: string;
    settingsNotifications: string;
    settingsPrivacy: string;
    settingsPrivacyValue: string;
    settingsNotice: string;
    demoModeToggleBtn: string;
  };
  events: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterWorkshops: string;
    filterWebinars: string;
    filterOffline: string;
    pilotBannerBadge: string;
    pilotBannerTitle: string;
    pilotBannerDesc: string;
    expressInterestBtn: string;
    spotsLabel: string;
    speakerLabel: string;
    detailsBtn: string;
    interestModalTitle: string;
    interestModalDesc: string;
    interestSuccessTitle: string;
    interestSuccessDesc: string;
  };
  product: {
    backHome: string;
    hypothesisTag: string;
    problemTitle: string;
    outcomesTitle: string;
    formatTitle: string;
    mentorTitle: string;
    mentorConceptRole: string;
    pricingTitle: string;
    includedTitle: string;
    orderFormTitle: string;
    orderFormDesc: string;
    orderSuccessTitle: string;
    orderSuccessDesc: string;
    submitApplicationBtn: string;
    sendAnotherBtn: string;
    disclaimer: string;
  };
}

export interface FooterDict {
  tagline: string;
  mvpStatus: string;
  learningNavTitle: string;
  catalogLink: string;
  learningLink: string;
  aboutLink: string;
  ecosystemNavTitle: string;
  eventsLink: string;
  profileLink: string;
  contactsNavTitle: string;
  location: string;
  contactNote: string;
  rights: string;
}

export interface Dictionary {
  common: CommonDict;
  nav: NavDict;
  theme: ThemeDict;
  hero: HeroDict;
  potential: PotentialDict;
  continueLearning: { badge: string; continueBtn: string };
  topicsSection: { badge: string; title: string; viewCatalog: string; materialsCount: string };
  recommendedSection: { badge: string; title: string; viewAll: string };
  aboutPage: AboutPageDict;
  pages: PagesDict;
  footer: FooterDict;
}
