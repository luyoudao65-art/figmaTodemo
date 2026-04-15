import { useEffect, useMemo, useState } from 'react';
import { PhoneLimitIcon } from './FeatureIcons';
import { AiSparkIcon } from './HomeFloatingBar';

type SuggestSheetProps = {
  variant: 'suggest';
  onClose: () => void;
  onPrimaryAction: () => void;
};

type MomentOptimizeSheetProps = {
  variant: 'moment-optimize';
  onClose: () => void;
  onPrimaryAction: () => void;
};

type AgentSheetProps = {
  variant: 'agent';
  onClose: () => void;
  onPrimaryAction: () => void;
  chatMessage?: string;
  thinkingLines?: string[];
  actionTitle?: string;
  actionDescription?: string;
};

type ChatDemoSheetProps = {
  variant: 'chat-demo';
  onClose: () => void;
  onPrimaryAction: () => void;
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

const momentOptimizeLines = [
  '根据我目前整合的数据（运动记录、心率及周围环境等）：建议今晚10:30后远离蓝光快速入睡，平复情绪，保证睡眠质量以恢复身心平衡。',
];

export function WiloAnalysisSheet(props: WiloAnalysisSheetProps) {
  const isSuggest = props.variant === 'suggest';
  const isMomentOptimize = props.variant === 'moment-optimize';
  const isChatDemo = props.variant === 'chat-demo';
  const thinkingLines = useMemo(() => {
    if (isSuggest) return [];
    if (isMomentOptimize) return momentOptimizeLines;
    if (isChatDemo) return demoAnswerLines;
    return props.thinkingLines ?? defaultAgentLines;
  }, [isSuggest, isMomentOptimize, isChatDemo, props]);
  const [demoStage, setDemoStage] = useState(isChatDemo ? 0 : 3);

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

  const sheetClassName = `analysis-sheet${isMomentOptimize ? ' analysis-sheet--dark' : ''}`;

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
                    onClick={props.onPrimaryAction}
                  >
                    <AiSparkIcon className="icon icon--sparkle-outline" />
                    <span>确认计划</span>
                  </button>
                </div>
              </div>
            </>
          ) : isMomentOptimize ? (
            <>
              <div className="analysis-sheet__header analysis-sheet__header--dark">
                <p className="analysis-sheet__thinking-time">已思考 3s</p>
                {thinkingLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="analysis-sheet__section">
                <p className="analysis-sheet__label analysis-sheet__label--dark">增加今日计划</p>
                <div className="analysis-card analysis-card--dark">
                  <div className="analysis-card__row">
                    <div className="analysis-card__icon analysis-card__icon--dark" aria-hidden="true">
                      <PhoneLimitIcon />
                    </div>
                    <div className="analysis-card__text analysis-card__text--dark">
                      <h3>远离手机</h3>
                      <p>晚10:30后无法打开除必要通讯工作软件外其他软件</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="analysis-confirm-button"
                    onClick={props.onPrimaryAction}
                  >
                    确认计划
                  </button>
                </div>
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
                          onClick={props.onPrimaryAction}
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
                    onClick={props.onPrimaryAction}
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
          chips={
            isMomentOptimize
              ? ['感觉这两天不舒服', '明天会下雨吗', '今天应该穿些什么衣服']
              : undefined
          }
        />
      </section>
    </>
  );
}

function AnalysisInputBar({
  dark = false,
  chips,
}: {
  dark?: boolean;
  chips?: string[];
}) {
  return (
    <div className={`analysis-input-bar-wrap${dark ? ' analysis-input-bar-wrap--dark' : ''}`}>
      {chips?.length ? (
        <div className="analysis-input-bar__chips" aria-hidden="true">
          {chips.map((chip) => (
            <span key={chip} className="analysis-input-bar__chip">
              {chip}
            </span>
          ))}
        </div>
      ) : null}

      <div className={`analysis-input-bar${dark ? ' analysis-input-bar--dark' : ''}`}>
        <button type="button" className={`analysis-input-bar__icon${dark ? ' analysis-input-bar__icon--dark' : ''}`}>
          <GalleryIcon />
        </button>
        <div className={`analysis-input-bar__field${dark ? ' analysis-input-bar__field--dark' : ''}`}>
          <span>输入你的身体感受</span>
        </div>
        <button type="button" className={`analysis-input-bar__icon${dark ? ' analysis-input-bar__icon--dark' : ''}`}>
          <MicIcon />
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
