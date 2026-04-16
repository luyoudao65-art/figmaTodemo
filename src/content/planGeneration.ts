import type { GeneratedPlanScenario, GeneratedPlanSuggestion } from '../types/generatedPlan';

type PlanTemplate = Omit<GeneratedPlanSuggestion, 'sourcePrompt' | 'hasAlert' | 'isNew'>;

type SinglePromptBucket = {
  id: string;
  mode: 'single';
  keywords: string[];
  prompts: string[];
  targetDate: string;
  targetWeekday: string;
  templates: PlanTemplate[];
};

type BatchScenarioTemplate = {
  scenarioId: string;
  analysisLines: string[];
  confirmLabel: string;
  targetDate: string;
  targetWeekday: string;
  plans: PlanTemplate[];
};

type BatchPromptBucket = {
  id: string;
  mode: 'batch';
  keywords: string[];
  prompts: string[];
  templates: BatchScenarioTemplate[];
};

type PromptBucket = SinglePromptBucket | BatchPromptBucket;

const optimizePromptBuckets: PromptBucket[] = [
  {
    id: 'calendar-import',
    mode: 'batch',
    keywords: ['飞书', '日历', 'calendar', '行程', '日程', '会议', '周日', '30日', '30号'],
    prompts: ['导入周日日历，帮我排计划', '根据外部日程一键生成计划'],
    templates: [
      {
        scenarioId: 'sunday-calendar-sync',
        analysisLines: [
          '已同步周日 30 日的外部日历信息（运动、聚会和晚间工作提醒等）。',
          '我优先在高刺激节点前后补上恢复、供能和降速动作，让这一天更稳地落下来。',
          '下面是我拆好的 4 条可执行计划，会直接按时间插入周日时间轴。',
        ],
        confirmLabel: '一键添加 4 个计划',
        targetDate: '30',
        targetWeekday: '日',
        plans: [
          {
            templateId: 'sunday-warmup',
            title: '多运动',
            description: '在上午活动前先做8分钟热身和轻拉伸，减少后续兴奋波动带来的疲劳。',
            icon: 'exercise-ball',
            timeLabel: '09:10',
            sortMinutes: 9 * 60 + 10,
            confirmLabel: '确认计划',
          },
          {
            templateId: 'sunday-meal',
            title: '餐饮建议',
            description: '午后安排一份稳定供能的轻食组合，避免活动后血糖快速回落影响状态。',
            icon: 'meal-advice',
            timeLabel: '13:40',
            sortMinutes: 13 * 60 + 40,
            confirmLabel: '确认计划',
          },
          {
            templateId: 'sunday-slowdown',
            title: '晚间降速',
            description: '19:50 后降低输入强度，不再继续处理高刺激信息，让情绪提前缓下来。',
            icon: 'target-plan',
            timeLabel: '19:50',
            sortMinutes: 19 * 60 + 50,
            confirmLabel: '确认计划',
          },
          {
            templateId: 'sunday-phone-limit',
            title: '远离手机',
            description: '22:30 后自动切走高刺激 App，只保留必要通讯，帮助周日晚更快收束节律。',
            icon: 'phone-limit',
            timeLabel: '22:30',
            sortMinutes: 22 * 60 + 30,
            confirmLabel: '确认计划',
            footerText: '自动设定对应闹钟/日程',
            footerActionLabel: '去授权',
          },
        ],
      },
    ],
  },
  {
    id: 'recovery',
    mode: 'single',
    keywords: ['不舒服', '难受', '头晕', '累', '疲惫', '没精神', '虚弱'],
    prompts: ['感觉这两天不舒服', '现在很累，没什么精神', '这两天有点虚弱'],
    targetDate: '29',
    targetWeekday: '六',
    templates: [
      {
        templateId: 'early-sleep',
        title: '早点入睡',
        description: '今晚22:15开始进入睡前准备，提前放下高刺激内容，让身体更快恢复。',
        icon: 'bedtime',
        timeLabel: '22:15',
        sortMinutes: 22 * 60 + 15,
        confirmLabel: '确认计划',
      },
      {
        templateId: 'slow-evening',
        title: '晚间降速',
        description: '从21:45开始降低屏幕和声音刺激，让身体提前进入恢复模式。',
        icon: 'target-plan',
        timeLabel: '21:45',
        sortMinutes: 21 * 60 + 45,
        confirmLabel: '确认计划',
      },
    ],
  },
  {
    id: 'sleep',
    mode: 'single',
    keywords: ['睡', '失眠', '熬夜', '睡不踏实', '早醒', '睡眠'],
    prompts: ['晚上总觉得睡不踏实', '这两天总想熬夜', '最近睡眠不太稳定'],
    targetDate: '29',
    targetWeekday: '六',
    templates: [
      {
        templateId: 'sleep-ritual',
        title: '睡前放松',
        description: '晚上22:00开始降低灯光和声音刺激，并留出15分钟做简单放松。',
        icon: 'bedtime',
        timeLabel: '22:00',
        sortMinutes: 22 * 60,
        confirmLabel: '确认计划',
      },
      {
        templateId: 'bedtime-anchor',
        title: '固定上床时间',
        description: '今晚22:30准时上床，不再继续处理高刺激或高负荷信息。',
        icon: 'bedtime',
        timeLabel: '22:30',
        sortMinutes: 22 * 60 + 30,
        confirmLabel: '确认计划',
      },
    ],
  },
  {
    id: 'anxiety',
    mode: 'single',
    keywords: ['焦虑', '烦', '压力', '紧张', '停不下来', '崩溃'],
    prompts: ['今天有点焦虑，停不下来', '最近压力有点大', '感觉脑子停不下来'],
    targetDate: '29',
    targetWeekday: '六',
    templates: [
      {
        templateId: 'phone-limit',
        title: '远离手机',
        description: '晚10:30后无法打开除必要通讯工作软件外其他软件，帮助你更快降噪入睡。',
        icon: 'phone-limit',
        timeLabel: '22:30',
        sortMinutes: 22 * 60 + 30,
        confirmLabel: '确认计划',
        footerText: '自动设定对应闹钟/日程',
        footerActionLabel: '去授权',
      },
      {
        templateId: 'breath-walk',
        title: '多运动',
        description: '现在先进行8分钟轻步行或拉伸，让呼吸和心率慢慢回落。',
        icon: 'exercise-ball',
        timeLabel: '现在',
        sortMinutes: 16 * 60 + 40,
        confirmLabel: '确认计划',
      },
    ],
  },
  {
    id: 'food',
    mode: 'single',
    keywords: ['饿', '胃', '肚子', '吃', '晚饭', '食欲'],
    prompts: ['这会儿有点饿', '晚饭怎么安排更合适', '今晚吃什么会更稳'],
    targetDate: '29',
    targetWeekday: '六',
    templates: [
      {
        templateId: 'meal-advice',
        title: '餐饮建议',
        description: '今晚增加一份温和的复合碳水和蛋白组合，避免过晚进食带来的负担。',
        icon: 'meal-advice',
        timeLabel: '19:30',
        sortMinutes: 19 * 60 + 30,
        confirmLabel: '确认计划',
      },
    ],
  },
  {
    id: 'fallback',
    mode: 'single',
    keywords: [],
    prompts: ['今天身体状态一般', '最近节奏有点乱', '我想让状态更稳定一点'],
    targetDate: '29',
    targetWeekday: '六',
    templates: [
      {
        templateId: 'fragment-exercise',
        title: '碎片化运动',
        description: '现在先进行5-10分钟轻量活动或短时户外走动，帮助身体重新找回节奏。',
        icon: 'fragment-exercise',
        timeLabel: '现在',
        sortMinutes: 16 * 60 + 10,
        confirmLabel: '确认计划',
      },
      {
        templateId: 'micro-recovery',
        title: '多运动',
        description: '先做10分钟轻量活动，帮身体和情绪从低效状态中重新启动。',
        icon: 'exercise-ball',
        timeLabel: '现在',
        sortMinutes: 16 * 60 + 20,
        confirmLabel: '确认计划',
      },
    ],
  },
];

const singleScenarioAnalysis: Record<string, string[]> = {
  recovery: [
    '根据我目前整合的数据（运动记录、心率及周围环境等）：',
    '你这段时间的恢复信号偏弱，今晚更适合减少刺激、提前休息。',
    '先把身体从紧绷状态拉回平稳区间，明天的专注和体力都会更稳定。',
  ],
  sleep: [
    '根据我目前整合的数据（作息、心率及近期恢复情况等）：',
    '你最近的睡前节律偏散，容易让入睡时间继续往后拖。',
    '今晚先稳定节奏，比继续消耗注意力更重要。',
  ],
  anxiety: [
    '根据我目前整合的数据（运动记录、心率及周围环境等）：',
    '你现在更像是持续高唤醒状态，继续刷手机会让情绪更难落下来。',
    '先把注意力从蓝光和碎片信息里抽离，更容易平复情绪并恢复睡意。',
  ],
  food: [
    '根据我目前整合的数据（饮食记录、活动强度及代谢状态等）：',
    '你现在更需要一份稳定供能，而不是继续拖到很晚再吃。',
    '把晚间能量补足，会比硬撑更有利于后面的恢复和睡眠。',
  ],
  fallback: [
    '根据我目前整合的数据（身体状态、行为记录及环境变化等）：',
    '你现在需要的不是继续硬撑，而是先把身体拉回更稳定的节律。',
    '先做一个低门槛的小动作，会比给自己更大压力更有效。',
  ],
};

function stableIndex(seed: string, size: number) {
  if (size <= 1) return 0;
  return seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % size;
}

function looksLikeCalendarImport(input: string) {
  const hasMultipleTimes = (input.match(/\b\d{1,2}[:：]\d{2}\b/g) ?? []).length >= 2;
  return hasMultipleTimes || input.includes('周日') || input.includes('日历') || input.includes('calendar');
}

function decoratePlan(template: PlanTemplate, sourcePrompt: string): GeneratedPlanSuggestion {
  return {
    ...template,
    sourcePrompt,
    hasAlert: true,
    isNew: true,
  };
}

export function getOptimizePrompts() {
  return optimizePromptBuckets.flatMap((bucket) => bucket.prompts).slice(0, 10);
}

export function generatePlanScenario(input: string): GeneratedPlanScenario {
  const normalized = input.trim().toLowerCase();
  const sourcePrompt = input.trim();
  const calendarBucket = optimizePromptBuckets.find((bucket) => bucket.id === 'calendar-import');
  const matchedBucket =
    (looksLikeCalendarImport(normalized) ? calendarBucket : undefined) ??
    optimizePromptBuckets.find((bucket) =>
      bucket.keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
    ) ?? optimizePromptBuckets[optimizePromptBuckets.length - 1];

  if (matchedBucket.mode === 'batch') {
    const template = matchedBucket.templates[stableIndex(normalized, matchedBucket.templates.length)];
    return {
      sourcePrompt,
      thinkingSeconds: 3,
      analysisLines: template.analysisLines,
      confirmLabel: template.confirmLabel,
      targetDate: template.targetDate,
      targetWeekday: template.targetWeekday,
      plans: template.plans.map((plan) => decoratePlan(plan, sourcePrompt)),
    };
  }

  const template = matchedBucket.templates[stableIndex(normalized, matchedBucket.templates.length)];

  return {
    sourcePrompt,
    thinkingSeconds: 3,
    analysisLines: singleScenarioAnalysis[matchedBucket.id] ?? singleScenarioAnalysis.fallback,
    confirmLabel: template.confirmLabel,
    targetDate: matchedBucket.targetDate,
    targetWeekday: matchedBucket.targetWeekday,
    plans: [decoratePlan(template, sourcePrompt)],
  };
}
