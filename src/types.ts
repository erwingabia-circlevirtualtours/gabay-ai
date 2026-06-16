export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
  isSafetyAlert?: boolean;
}

export interface HandbookQuestion {
  question: string;
  answer: string;
  taglishAnswer: string; // simpler conversational Taglish
  lawReference: string; // RA number or executive policy details
  scenario?: string; // a short, relatable example for kids
}

export interface HandbookModule {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  lawAnchor: string;
  iconName: "Shield" | "Users" | "Brain" | "AlertTriangle" | "Briefcase" | "Home";
  colorTheme: string; // tailwind color prefix like 'peach', 'teal', etc.
  questions: HandbookQuestion[];
}

export interface HelplineItem {
  name: string;
  hotline: string;
  alternativeContact?: string;
  email?: string;
  description: string;
  agency: string;
}
