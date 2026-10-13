export type Level = "beginner" | "intermediate" | "advanced";

export type MaterialStatus = "not_started" | "in_progress" | "completed";

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  titleKk?: string;
  titleRu?: string;
  titleEn?: string;
  descriptionKk?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  accentBg: string;
  accentText: string;
  materialsCount: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "pdf" | "template" | "link" | "checklist";
  size?: string;
  url?: string;
  isReady?: boolean;
}

export interface VideoChapter {
  title: string;
  timestamp: number; // in seconds
}

export interface VideoAsset {
  durationSeconds: number;
  chapters: VideoChapter[];
  previewText?: string;
}

export interface Material {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  topicId: string;
  level: Level;
  durationMinutes: number;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  summary: string;
  learningOutcomes: string[];
  resources: ResourceItem[];
  video: VideoAsset;
  status: MaterialStatus;
  progressPercent: number;
  lastWatchedSeconds?: number;
  xpReward: number;
  assessmentSlug?: string;
  nextMaterialSlug?: string;
  relatedProductSlug?: string;
  relatedEventSlug?: string;
}

export interface AssessmentOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: AssessmentOption[];
  explanation: string;
}

export interface Assessment {
  id: string;
  materialSlug: string;
  title: string;
  description: string;
  passingScorePercent: number;
  xpReward: number;
  questions: AssessmentQuestion[];
}

export interface LearningRoute {
  id: string;
  slug: string;
  title: string;
  description: string;
  topicId: string;
  topicTitle: string;
  accentBg: string;
  accentText: string;
  totalMaterials: number;
  completedMaterials: number;
  materialSlugs: string[];
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  type: "workshop" | "webinar" | "meetup";
  typeLabel: string;
  date: string;
  dateDay: string;
  dateMonth: string;
  time: string;
  isOnline: boolean;
  city: string;
  venue: string;
  speaker: {
    name: string;
    role: string;
    bio: string;
  };
  description: string;
  program: {
    time: string;
    title: string;
    description: string;
  }[];
  spotsLeft: number;
  totalSpots: number;
  relatedMaterialSlugs?: string[];
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  tag: string;
  badge?: string;
  problem: string;
  problemPoints: string[];
  outcome: string;
  outcomePoints: string[];
  format: {
    title: string;
    description: string;
  }[];
  expert: {
    name: string;
    role: string;
    bio: string;
    achievements: string[];
  };
  pricing: {
    price: string;
    period: string;
    features: string[];
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string;
  iconName: string;
  category: string;
}

export interface SavedWork {
  id: string;
  title: string;
  materialTitle: string;
  materialSlug: string;
  date: string;
  status: "submitted" | "reviewed" | "draft";
  statusLabel: string;
  feedback?: string;
  fileType: string;
}

export interface ActivityHistoryItem {
  id: string;
  type: "completed_material" | "passed_assessment" | "started_route" | "earned_achievement";
  title: string;
  subtitle: string;
  timestamp: string;
  xpEarned?: number;
  href: string;
}

export interface UserProfile {
  id: string;
  name: string;
  grade: string;
  city: string;
  avatarInitials: string;
  level: number;
  levelTitle: string;
  currentXP: number;
  nextLevelXP: number;
  streakDays: number;
  completedMaterialsCount: number;
  inProgressMaterialsCount: number;
  topicsProgress: {
    topicId: string;
    topicTitle: string;
    accentBg: string;
    completedCount: number;
    totalCount: number;
    percent: number;
  }[];
  achievements: Achievement[];
  savedWorks: SavedWork[];
  activityHistory: ActivityHistoryItem[];
}
