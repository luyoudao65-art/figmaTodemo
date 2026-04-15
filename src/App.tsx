import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { FriendMemoryPage } from './pages/FriendMemoryPage';
import { MomentPage } from './pages/MomentPage';
import { MomentTwoPage } from './pages/MomentTwoPage';
import { PlanPage } from './pages/PlanPage';
import { WiloPage } from './pages/WiloPage';

type Screen =
  | 'home'
  | 'moment-day'
  | 'moment-month'
  | 'moment-two'
  | 'friend-memory'
  | 'plan'
  | 'wilo';
type MomentOverlay = 'none' | 'wilo-suggest';
type HomeOverlay = 'none' | 'goal-analysis';
type PlanVariant = 'default' | 'new-plan';
type FriendMemoryReturn = 'moment-two' | 'moment-day-excited' | 'moment-day-anxious';
type MomentDetailEntry = 'excited' | 'anxious' | null;

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [momentOverlay, setMomentOverlay] = useState<MomentOverlay>('none');
  const [homeOverlay, setHomeOverlay] = useState<HomeOverlay>('none');
  const [planVariant, setPlanVariant] = useState<PlanVariant>('default');
  const [phoneLimitShown, setPhoneLimitShown] = useState(false);
  const [returnScreen, setReturnScreen] = useState<Exclude<Screen, 'wilo'>>('home');
  const [friendMemoryReturn, setFriendMemoryReturn] = useState<FriendMemoryReturn>('moment-two');
  const [momentEntryDetail, setMomentEntryDetail] = useState<MomentDetailEntry>(null);

  const stageTone = screen === 'friend-memory' ? 'light' : 'dark';

  const openWilo = (from: Exclude<Screen, 'wilo'>) => {
    setReturnScreen(from);
    setScreen('wilo');
  };

  const openPlan = (variant: PlanVariant, withPhoneLimit = false) => {
    setMomentOverlay('none');
    setPlanVariant(variant);
    if (withPhoneLimit) {
      setPhoneLimitShown(true);
    }
    setScreen('plan');
  };

  let content;

  if (screen === 'wilo') {
    content = <WiloPage onBack={() => setScreen(returnScreen)} />;
  } else if (screen === 'moment-day') {
    content = (
      <MomentPage
        mode="day"
        overlay={momentOverlay}
        initialDetail={momentEntryDetail}
        onGoHome={() => {
          setMomentOverlay('none');
          setHomeOverlay('none');
          setMomentEntryDetail(null);
          setScreen('home');
        }}
        onOpenDay={() => {
          setMomentEntryDetail(null);
          setScreen('moment-day');
        }}
        onOpenMonth={() => {
          setMomentEntryDetail(null);
          setScreen('moment-month');
        }}
        onOpenWiloSuggest={() => setMomentOverlay('wilo-suggest')}
        onOpenPlan={() => openPlan('default')}
        onCloseOverlay={() => setMomentOverlay('none')}
        onConfirmPlan={() => openPlan('new-plan', true)}
        onOpenFriendMemory={(detail) => {
          setFriendMemoryReturn(detail === 'excited' ? 'moment-day-excited' : 'moment-day-anxious');
          setMomentEntryDetail(detail);
          setScreen('friend-memory');
        }}
      />
    );
  } else if (screen === 'moment-month') {
    content = (
      <MomentPage
        mode="month"
        overlay={momentOverlay}
        initialDetail={null}
        onGoHome={() => {
          setMomentOverlay('none');
          setHomeOverlay('none');
          setMomentEntryDetail(null);
          setScreen('home');
        }}
        onOpenDay={() => {
          setMomentOverlay('none');
          setMomentEntryDetail(null);
          setScreen('moment-day');
        }}
        onOpenMonth={() => setScreen('moment-month')}
        onOpenPlan={() => openPlan('default')}
        onOpenWiloSuggest={() => setMomentOverlay('wilo-suggest')}
        onCloseOverlay={() => setMomentOverlay('none')}
        onConfirmPlan={() => openPlan('new-plan', true)}
        onOpenFriendMemory={(detail) => {
          setFriendMemoryReturn(detail === 'excited' ? 'moment-day-excited' : 'moment-day-anxious');
          setMomentEntryDetail(detail);
          setScreen('friend-memory');
        }}
      />
    );
  } else if (screen === 'moment-two') {
    content = (
      <MomentTwoPage
        onBack={() => {
          setHomeOverlay('none');
          setMomentOverlay('none');
          setScreen('home');
        }}
        onGoHome={() => {
          setHomeOverlay('none');
          setMomentOverlay('none');
          setScreen('home');
        }}
        onOpenPlan={() => openPlan('default')}
        onOpenFriendMemory={() => {
          setFriendMemoryReturn('moment-two');
          setScreen('friend-memory');
        }}
      />
    );
  } else if (screen === 'friend-memory') {
    content = (
      <FriendMemoryPage
        onBack={() => {
          if (friendMemoryReturn === 'moment-two') {
            setScreen('moment-two');
            return;
          }

          setMomentEntryDetail(friendMemoryReturn === 'moment-day-excited' ? 'excited' : 'anxious');
          setScreen('moment-day');
        }}
        onGoHome={() => {
          setHomeOverlay('none');
          setMomentOverlay('none');
          setMomentEntryDetail(null);
          setScreen('home');
        }}
        onOpenPlan={() => openPlan('default')}
      />
    );
  } else if (screen === 'plan') {
    content = (
      <PlanPage
        variant={planVariant}
        showPhoneLimit={phoneLimitShown}
        onGoHome={() => {
          setMomentOverlay('none');
          setHomeOverlay('none');
          setScreen('home');
        }}
      />
    );
  } else {
    content = (
      <HomePage
        onOpenMoments={() => {
          setHomeOverlay('none');
          setMomentOverlay('none');
          setMomentEntryDetail(null);
          setScreen('moment-day');
        }}
        onOpenPlan={() => {
          setHomeOverlay('none');
          setMomentOverlay('none');
          openPlan('default');
        }}
        onOpenGoalAnalysis={() => setHomeOverlay('goal-analysis')}
        goalAnalysisOpen={homeOverlay === 'goal-analysis'}
        onCloseGoalAnalysis={() => setHomeOverlay('none')}
        onOpenWilo={() => {
          setHomeOverlay('none');
          openWilo('home');
        }}
      />
    );
  }

  return <div className={`screen-stage screen-stage--${stageTone}`}>{content}</div>;
}

export default App;
