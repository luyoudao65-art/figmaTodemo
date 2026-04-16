export type GeneratedPlanIcon =
  | 'phone-limit'
  | 'target-plan'
  | 'meal-advice'
  | 'fragment-exercise'
  | 'bedtime'
  | 'exercise-ball';

export type GeneratedPlanSuggestion = {
  sourcePrompt: string;
  templateId: string;
  title: string;
  description: string;
  icon: GeneratedPlanIcon;
  timeLabel: string;
  sortMinutes?: number;
  confirmLabel: string;
  hasAlert?: boolean;
  isNew?: boolean;
  footerText?: string;
  footerActionLabel?: string;
};

export type GeneratedPlanScenario = {
  sourcePrompt: string;
  thinkingSeconds: number;
  analysisLines: string[];
  confirmLabel: string;
  targetDate: string;
  targetWeekday: string;
  plans: GeneratedPlanSuggestion[];
};
