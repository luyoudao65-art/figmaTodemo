import { useEffect, useMemo, useState } from 'react';
import {
  BedtimeIcon,
  ExerciseBallIcon,
  FragmentExerciseIcon,
  MealAdviceIcon,
  PhoneLimitIcon,
  TargetPlanIcon,
} from './FeatureIcons';
import { AiSparkIcon } from './HomeFloatingBar';
import type { GeneratedPlanIcon, GeneratedPlanScenario } from '../types/generatedPlan';
import { generatePlanScenario, getOptimizePrompts } from '../content/planGeneration';

type SuggestSheetProps = {
  variant: 'suggest';
  onClose: () => void;
  onPrimaryAction: (scenario?: GeneratedPlanScenario) => void;
};

type MomentOptimizeSheetProps = {
  variant: 'moment-optimize';
  onClose: () => void;
  onPrimaryAction: (scenario?: GeneratedPlanScenario) => void;
};

type AgentSheetProps = {
  variant: 'agent';
  onClose: () => void;
  onPrimaryAction: (scenario?: GeneratedPlanScenario) => void;
  chatMessage?: string;
  thinkingLines?: string[];
  actionTitle?: string;
  actionDescription?: string;
};

type ChatDemoSheetProps = {
  variant: 'chat-demo';
  onClose: () => void;
  onPrimaryAction: (scenario?: GeneratedPlanScenario) => void;
};

type WiloAnalysisSheetProps =
  | SuggestSheetProps
  | MomentOptimizeSheetProps
  | AgentSheetProps
  | ChatDemoSheetProps;

const defaultAgentLines = [
  '根据我目前整合的数据（饮食记录、心率及周围环境等）：',
  '◎你的血糖在 12:30的高碳水午餐后目前正处于下降区间。',
  '◎当前室内湿度为28%，属于极度干燥，这可能加速了轻微脱水。',
];

const demoQuestion = '你好，Wilo。我想把最近的减脂目标执行得更稳定一点。';
const demoAnswerLines = [
  '根据我目前整合的数据（作息、运动及目标执行情况等）：',
  '◎你最近的睡前节律不够稳定，这会影响第二天的执行意愿和恢复状态。',
  '◎如果今晚提前进入睡前准备，明天更容易保持减脂计划和运动安排。',
];

function renderPlanIcon(icon: GeneratedPlanIcon) {
  if (icon === 'target-plan') return <TargetPlanIcon />;
  if (icon === 'meal-advice') return <MealAdviceIcon />;
  if (icon === 'fragment-exercise') return <FragmentExerciseIcon />;
  if (icon === 'bedtime') return <BedtimeIcon />;
  if (icon === 'exercise-ball') return <ExerciseBallIcon />;
  return <PhoneLimitIcon />;
}

export function WiloAnalysisSheet(props: WiloAnalysisSheetProps) {
  const isSuggest = props.variant === 'suggest';
  const isMomentOptimize = props.variant === 'moment-optimize';
  const isChatDemo = props.variant === 'chat-demo';
  const thinkingLines = useMemo(() => {
    if (isSuggest) return [];
    if (isMomentOptimize) return [];
    if (isChatDemo) return demoAnswerLines;
    return props.thinkingLines ?? defaultAgentLines;
  }, [isSuggest, isMomentOptimize, isChatDemo, props]);
  const [demoStage, setDemoStage] = useState(isChatDemo ? 0 : 3);
  const [optimizeInput, setOptimizeInput] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [generatedScenario, setGeneratedScenario] = useState<GeneratedPlanScenario | null>(null);

  useEffect(() => {
    if (!isChatDemo) {
      return undefined;
    }

    setDemoStage(0);
    const userTimer = window.setTimeout(() => setDemoStage(1), 420);
    const typingTimer = window.setTimeout(() => setDemoStage(2), 1050);
    const answerTimer = window.setTimeout(() => setDemoStage(3), 2200);

    return () => {
      window.clearTimeout(userTimer);
      window.clearTimeout(typingTimer);
      window.clearTimeout(answerTimer);
    };
  }, [isChatDemo]);

  useEffect(() => {
    if (!isMomentOptimize || !isThinking) {
      return undefined;
    }

    const startedAt = Date.now();
    setThinkingSeconds(0);

    const intervalId = window.setInterval(() => {
      const elapsedSeconds = Math.min(3, Math.max(1, Math.ceil((Date.now() - startedAt) / 1000)));
      setThinkingSeconds(elapsedSeconds);
    }, 250);

    const resolveId = window.setTimeout(() => {
      const scenario = generatePlanScenario(submittedPrompt);
      setThinkingSeconds(scenario.thinkingSeconds);
      setGeneratedScenario(scenario);
      setIsThinking(false);
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(resolveId);
    };
  }, [isMomentOptimize, isThinking, submittedPrompt]);

  const sheetClassName = `analysis-sheet${isMomentOptimize ? ' analysis-sheet--dark' : ''}`;

  const submitOptimizePrompt = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setOptimizeInput(trimmed);
    setSubmittedPrompt(trimmed);
    setGeneratedScenario(null);
    setThinkingSeconds(0);
    setIsThinking(true);
  };

  return (
    <>
      <button
        type="button"
        className="analysis-overlay"
        aria-label="关闭分析面板"
        onClick={props.onClose}
      />
      <section className={sheetClassName}>
        <div className="analysis-sheet__content">
          <div className={`analysis-sheet__title-row${isMomentOptimize ? ' analysis-sheet__title-row--dark' : ''}`}>
            <h2>Wilo 分析中</h2>
          </div>

          {isSuggest ? (
            <>
              <div className="analysis-sheet__header">
                <p className="analysis-sheet__thinking-time">已思考 3s</p>
                <p>根据我目前整合的数据（运动记录、心率及周围环境等）：</p>
                <p>建议今晚10:30后远离蓝光快速入睡，巩固今日成果。</p>
              </div>

              <div className="analysis-sheet__section">
                <p className="analysis-sheet__label">增加今日计划</p>
                <div className="analysis-card">
                  <div className="analysis-card__row">
                    <div className="analysis-card__icon" aria-hidden="true">
                      <PhoneLimitIcon />
                    </div>
                    <div className="analysis-card__text">
                      <h3>远离手机</h3>
                      <p>晚10:30后无法打开除必要通讯工作软件外其他软件</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="moment-summary__cta analysis-card__cta"
                    onClick={() => props.onPrimaryAction()}
                  >
                    <AiSparkIcon className="icon icon--sparkle-outline" />
                    <span>确认计划</span>
                  </button>
                </div>
              </div>
            </>
          ) : isMomentOptimize ? (
            <>
              <div className="analysis-sheet__conversation analysis-sheet__conversation--dark">
                {submittedPrompt ? (
                  <div className="analysis-sheet__chat-bubble analysis-sheet__chat-bubble--dark">
                    <p>{submittedPrompt}</p>
                  </div>
                ) : (
                  <div className="analysis-sheet__conversation-placeholder analysis-sheet__conversation-placeholder--dark">
                    <span>把你的感受告诉我，我会结合今天的状态帮你生成建议和计划。</span>
                  </div>
                )}

                {isThinking ? (
                  <div className="analysis-sheet__assistant-row analysis-sheet__assistant-row--dark">
                    <p className="analysis-sheet__thinking-time">已思考 {Math.max(1, thinkingSeconds)}s</p>
                    <div className="analysis-sheet__typing" aria-label="Wilo 正在生成回答">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                ) : null}

                {generatedScenario ? (
                  <div className="analysis-sheet__result-block analysis-sheet__result-block--dark">
                    <div className="analysis-sheet__header analysis-sheet__header--dark analysis-sheet__header--reveal">
                      <p className="analysis-sheet__thinking-time">已思考 {generatedScenario.thinkingSeconds}s</p>
                      {generatedScenario.analysisLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>

                    <div className="analysis-sheet__section">
                      <p className="analysis-sheet__label analysis-sheet__label--dark">
                        {generatedScenario.plans.length > 1
                          ? `新增 ${generatedScenario.targetWeekday}${generatedScenario.targetDate} 计划`
                          : '增加今日计划'}
                      </p>
                      <div className="analysis-card-stack">
                        {generatedScenario.plans.map((plan) => (
                          <div key={`${plan.templateId}-${plan.timeLabel}-${plan.title}`} className="analysis-card analysis-card--dark analysis-card--generated analysis-card--pending">
                            <div className="analysis-card__meta-row">
                              <div className="analysis-card__meta-pill">
                                <span>{generatedScenario.targetWeekday}{generatedScenario.targetDate}</span>
                              </div>
                              <div className="analysis-card__meta-pill">
                                <span>{plan.timeLabel}</span>
                              </div>
                            </div>
                            <div className="analysis-card__row">
                              <div className="analysis-card__icon analysis-card__icon--dark" aria-hidden="true">
                                {renderPlanIcon(plan.icon)}
                              </div>
                              <div className="analysis-card__text analysis-card__text--dark">
                                <h3>
                                  {plan.hasAlert ? (
                                    <span className="analysis-card__title-row">
                                      <span className="analysis-card__title-text">
                                        {plan.title.slice(0, -1)}
                                        <span className="analysis-card__title-tail">
                                          {plan.title.slice(-1)}
                                          <span className="analysis-card__alert-dot" />
                                        </span>
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="analysis-card__title-row">
                                      <span className="analysis-card__title-text">{plan.title}</span>
                                    </span>
                                  )}
                                </h3>
                                <p>{plan.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="analysis-confirm-button"
                        onClick={() => props.onPrimaryAction(generatedScenario)}
                      >
                        {generatedScenario.confirmLabel}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : isChatDemo ? (
            <>
              <div className="analysis-sheet__conversation">
                {demoStage >= 1 ? (
                  <div className="analysis-sheet__chat-bubble">
                    <p>{demoQuestion}</p>
                  </div>
                ) : (
                  <div className="analysis-sheet__conversation-placeholder">
                    <span>可以直接问我今天怎么更稳地完成目标</span>
                  </div>
                )}

                {demoStage === 2 ? (
                  <div className="analysis-sheet__assistant-row">
                    <p className="analysis-sheet__thinking-time">已思考 3s</p>
                    <div className="analysis-sheet__typing" aria-label="Wilo 正在生成回答">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                ) : null}

                {demoStage >= 3 ? (
                  <>
                    <div className="analysis-sheet__header">
                      <p className="analysis-sheet__thinking-time">已思考 3s</p>
                      {thinkingLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>

                    <div className="analysis-sheet__section">
                      <p className="analysis-sheet__label">建议动作</p>
                      <div className="analysis-card">
                        <div className="analysis-card__row">
                          <div className="analysis-card__icon" aria-hidden="true">
                            <PhoneLimitIcon />
                          </div>
                          <div className="analysis-card__text">
                            <h3>活动一下</h3>
                            <p>先放下手机，喝一杯水。我会帮你开启5分钟的睡前放松引导，让今晚更容易按计划入睡。</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="moment-summary__cta analysis-card__cta analysis-card__cta--plain"
                          onClick={() => props.onPrimaryAction()}
                        >
                          <span>Wilo 一下</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="analysis-sheet__suggestions" aria-hidden={demoStage > 0}>
                    <button type="button" className="analysis-sheet__chip">
                      今晚怎么更早睡？
                    </button>
                    <button type="button" className="analysis-sheet__chip">
                      明天怎样更容易坚持？
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="analysis-sheet__chat-bubble">
                <p>{props.chatMessage ?? '你好，Wilo。我现在感觉有些头晕，而且注意力不太集中'}</p>
              </div>

              <div className="analysis-sheet__header">
                <p className="analysis-sheet__thinking-time">已思考 3s</p>
                {thinkingLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="analysis-sheet__section">
                <p className="analysis-sheet__label">建议动作</p>
                <div className="analysis-card">
                  <div className="analysis-card__row">
                    <div className="analysis-card__icon" aria-hidden="true">
                      <PhoneLimitIcon />
                    </div>
                    <div className="analysis-card__text">
                      <h3>{props.actionTitle ?? '活动一下'}</h3>
                      <p>{props.actionDescription ?? '饮用300ml 柠檬水。我会为你开启5分钟的“脑波调节”背景音乐。'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="moment-summary__cta analysis-card__cta analysis-card__cta--plain"
                    onClick={() => props.onPrimaryAction()}
                  >
                    <span>Wilo 一下</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <AnalysisInputBar
          dark={isMomentOptimize}
          chips={isMomentOptimize ? getOptimizePrompts() : undefined}
          value={optimizeInput}
          placeholder={isMomentOptimize ? '输入你的身体感受或今晚最想解决的问题' : undefined}
          onValueChange={setOptimizeInput}
          onSubmit={isMomentOptimize ? submitOptimizePrompt : undefined}
        />
      </section>
    </>
  );
}

function AnalysisInputBar({
  dark = false,
  chips,
  value,
  placeholder,
  onValueChange,
  onSubmit,
}: {
  dark?: boolean;
  chips?: string[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}) {
  const canSubmit = Boolean(onSubmit);

  return (
    <div className={`analysis-input-bar-wrap${dark ? ' analysis-input-bar-wrap--dark' : ''}`}>
      {chips?.length ? (
        <div className="analysis-input-bar__chips">
          <div className="analysis-input-bar__chips-track">
            {chips.map((chip, index) => (
              <button
                key={`${chip}-${index}`}
                type="button"
                className="analysis-input-bar__chip"
                onClick={() => {
                  onValueChange?.(chip);
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className={`analysis-input-bar${dark ? ' analysis-input-bar--dark' : ''}`}>
        <button type="button" className={`analysis-input-bar__icon${dark ? ' analysis-input-bar__icon--dark' : ''}`}>
          <GalleryIcon />
        </button>
        <div className={`analysis-input-bar__field${dark ? ' analysis-input-bar__field--dark' : ''}`}>
          {canSubmit ? (
            <input
              type="text"
              value={value ?? ''}
              onChange={(event) => onValueChange?.(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  onSubmit?.(value ?? '');
                }
              }}
              placeholder={placeholder ?? '输入你的身体感受'}
            />
          ) : (
            <span>输入你的身体感受</span>
          )}
        </div>
        <button
          type="button"
          className={`analysis-input-bar__icon${dark ? ' analysis-input-bar__icon--dark' : ''}${canSubmit ? ' analysis-input-bar__icon--submit' : ''}`}
          onClick={() => onSubmit?.(value ?? '')}
        >
          {canSubmit ? <SendIcon /> : <MicIcon />}
        </button>
      </div>
    </div>
  );
}

function GalleryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon" aria-hidden="true">
      <path d="M21 14.9999L17.914 11.9139C17.5389 11.539 17.0303 11.3284 16.5 11.3284C15.9697 11.3284 15.4611 11.539 15.086 11.9139L6 20.9999M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3ZM11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        d="M4 11.5 20 4l-5.4 16-2.8-6.3L4 11.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M11.8 13.7 20 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
