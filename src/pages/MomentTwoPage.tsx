import { BottomTabNav } from '../components/BottomTabNav';
import { MomentDetailView } from '../components/MomentDetailView';
import { RelatedPeopleButton } from '../components/RelatedPeopleButton';
import { WaveBars } from '../components/WaveBars';


type MomentTwoPageProps = {
  onBack: () => void;
  onGoHome: () => void;
  onOpenPlan: () => void;
  onOpenFriendMemory: () => void;
};

const anxietyMomentImage = '/src/pic/FigmaPic/peopletalking.webp';
const peopleImages = [
  '/src/pic/people/Rectangle_279336331_2x.webp',
  '/src/pic/people/Rectangle_279336332_2x.webp',
  '/src/pic/people/Rectangle_279336333_2x.webp',
];

const anxiousDetailBars = [32, 28, 35, 42, 38, 32, 28, 24, 32, 48, 62, 78, 88, 95, 98, 95, 88, 72, 58, 45, 38, 32, 28, 24, 18, 15, 12, 10, 8, 6];

export function MomentTwoPage({
  onBack,
  onGoHome,
  onOpenPlan,
  onOpenFriendMemory,
}: MomentTwoPageProps) {
  return (
    <main className="app-shell app-shell--moment-dark">
      <section className="phone-frame phone-frame--moments phone-frame--moments-dark">
        <div className="phone-scroll phone-scroll--moment-dark">


          <MomentDetailView
            title="焦虑"
            time="14:30-15:00"
            imageSrc={anxietyMomentImage}
            imageAlt="会议交流时刻"
            description="检测到心率上升过快，皮质醇水平上升，呼吸变浅快，注意力难以集中。放轻松，已为你自动语音记录，不错过任何重点信息。"
            cardClassName="moment-detail-card--anxiety-view"
            onBack={onBack}
            emotion="anxious"
            chart={
              <WaveBars
                bars={anxiousDetailBars}
                height={120}
                fillWidth
                accentStart={10}
                accentEnd={17}
                accentColor="#f0ac98"
              />
            }
            accessory={
              <RelatedPeopleButton
                people={peopleImages}
                onClick={onOpenFriendMemory}
              />
            }
          />
        </div>

        <BottomTabNav active="home" onGoHome={onGoHome} onOpenPlan={onOpenPlan} />
      </section>
    </main>
  );
}
