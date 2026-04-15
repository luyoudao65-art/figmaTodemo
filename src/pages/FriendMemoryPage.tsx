import { BottomTabNav } from '../components/BottomTabNav';

type FriendMemoryPageProps = {
  onBack: () => void;
  onGoHome: () => void;
  onOpenPlan: () => void;
};

const groupCardImage = '/src/pic/FigmaPic/cardgroup.webp';
const friendPeople = [
  '/src/pic/people/Rectangle_279336331_2x.webp',
  '/src/pic/people/Rectangle_279336332_2x.webp',
  '/src/pic/people/Rectangle_279336333_2x.webp',
];

const memoryCards = [
  {
    title: '和Hellen的瞬间',
    avatar: friendPeople[0],
    segments: [
      { color: '#a6e7b6', width: '30%', label: '兴奋30%' },
      { color: '#c8d8f3', width: '50%' },
      { color: '#efb7a6', width: '20%' },
    ],
  },
  {
    title: '和Grace的瞬间',
    avatar: friendPeople[1],
    segments: [
      { color: '#a6e7b6', width: '30%', label: '兴奋30%' },
      { color: '#eed392', width: '30%', label: '焦虑 30%' },
      { color: '#c8d8f3', width: '22%' },
      { color: '#dbe1e5', width: '8%' },
      { color: '#efb7a6', width: '10%' },
    ],
  },
  {
    title: '与 Xan 的瞬间',
    avatar: friendPeople[2],
    segments: [
      { color: '#a6e7b6', width: '30%', label: '兴奋30%' },
      { color: '#eed392', width: '30%', label: '焦虑 30%' },
      { color: '#c8d8f3', width: '22%' },
      { color: '#dbe1e5', width: '8%' },
      { color: '#efb7a6', width: '10%' },
    ],
  },
];

export function FriendMemoryPage({
  onBack,
  onGoHome,
  onOpenPlan,
}: FriendMemoryPageProps) {
  return (
    <main className="app-shell app-shell--friend-memory">
      <section className="phone-frame phone-frame--friend-memory">
        <div className="phone-scroll phone-scroll--friend-memory">
          <div className="friend-memory-page">
            <header className="friend-memory-header">
              <button type="button" className="friend-memory-header__back" onClick={onBack} aria-label="返回">
                <BackIcon />
              </button>
              <h1>瞬间</h1>
              <button type="button" className="friend-memory-header__share" aria-label="分享">
                <ShareIcon />
              </button>
            </header>

            <section className="friend-memory-list">
              {memoryCards.map((card) => (
                <article key={card.title} className="friend-memory-card">
                  <div className="friend-memory-card__avatar-wrap">
                    <div className="friend-memory-card__avatar-glow" />
                    <div className="friend-memory-card__avatar">
                      <img src={card.avatar} alt="" />
                    </div>
                  </div>

                  <h2>{card.title}</h2>

                  <div className="friend-memory-card__image">
                    <img src={groupCardImage} alt="" />
                  </div>

                  <div className="friend-memory-card__segments" aria-hidden="true">
                    {card.segments.map((segment, index) => (
                      <span
                        key={`${card.title}-${index}`}
                        className={`friend-memory-card__segment${segment.label ? ' friend-memory-card__segment--labelled' : ''}`}
                        style={{ width: segment.width, backgroundColor: segment.color }}
                      >
                        {segment.label ? <span>{segment.label}</span> : null}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          </div>
        </div>

        <BottomTabNav theme="light" active="home" onGoHome={onGoHome} onOpenPlan={onOpenPlan} />
      </section>
    </main>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon" aria-hidden="true">
      <path d="M12 2V15M12 2L16 6M12 2L8 6M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
