import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { MomentPage } from './pages/MomentPage';
import { PlanPage } from './pages/PlanPage';
import { WiloPage } from './pages/WiloPage';

type Screen = 'home' | 'moment-day' | 'moment-week' | 'moment-month' | 'plan' | 'wilo';
type MomentOverlay = 'none' | 'wilo-suggest' | 'agent-analysis';
type HomeOverlay = 'none' | 'goal-analysis';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [momentOverlay, setMomentOverlay] = useState<MomentOverlay>('none');
  const [homeOverlay, setHomeOverlay] = useState<HomeOverlay>('none');
  const [returnScreen, setReturnScreen] = useState<Exclude<Screen, 'wilo'>>('home');
  const [planReturnScreen, setPlanReturnScreen] = useState<'home' | 'moment-day' | 'moment-week'>('moment-week');

  const openWilo = (from: Exclude<Screen, 'wilo'>) => {
    setReturnScreen(from);
    setScreen('wilo');
  };

  let content;

  if (screen === 'wilo') {
    content = <WiloPage onBack={() => setScreen(returnScreen)} />;
  } else if (screen === 'moment-day') {
    content = (
      <MomentPage
        mode="day"
        onGoHome={() => {
          setMomentOverlay('none');
          setHomeOverlay('none');
          setScreen('home');
        }}
        onOpenDay={() => setScreen('moment-day')}
        onOpenWeek={() => setScreen('moment-week')}
        onOpenMonth={() => setScreen('moment-month')}
        onOpenWiloSuggest={() => {
          setScreen('moment-week');
          setMomentOverlay('wilo-suggest');
        }}
        onOpenPlan={() => {
          setMomentOverlay('none');
          setPlanReturnScreen('moment-day');
          setScreen('plan');
        }}
        onOpenAgentAnalysis={() => {
          setScreen('moment-week');
          setMomentOverlay('agent-analysis');
        }}
        onCloseOverlay={() => setMomentOverlay('none')}
        onConfirmPlan={() => {
          setMomentOverlay('none');
          setPlanReturnScreen('moment-week');
          setScreen('plan');
        }}
        onOpenWilo={() => openWilo('moment-day')}
      />
    );
  } else if (screen === 'moment-week') {
    content = (
      <MomentPage
        mode="week"
        overlay={momentOverlay}
        onGoHome={() => {
          setMomentOverlay('none');
          setHomeOverlay('none');
          setScreen('home');
        }}
        onOpenDay={() => {
          setMomentOverlay('none');
          setScreen('moment-day');
        }}
        onOpenWeek={() => setScreen('moment-week')}
        onOpenMonth={() => setScreen('moment-month')}
        onOpenPlan={() => {
          setMomentOverlay('none');
          setPlanReturnScreen('moment-week');
          setScreen('plan');
        }}
        onOpenWiloSuggest={() => setMomentOverlay('wilo-suggest')}
        onOpenAgentAnalysis={() => setMomentOverlay('agent-analysis')}
        onCloseOverlay={() => setMomentOverlay('none')}
        onConfirmPlan={() => {
          setMomentOverlay('none');
          setPlanReturnScreen('moment-week');
          setScreen('plan');
        }}
        onOpenWilo={() => openWilo('moment-week')}
      />
    );
  } else if (screen === 'moment-month') {
    content = (
      <MomentPage
        mode="month"
        overlay={momentOverlay}
        onGoHome={() => {
          setMomentOverlay('none');
          setHomeOverlay('none');
          setScreen('home');
        }}
        onOpenDay={() => {
          setMomentOverlay('none');
          setScreen('moment-day');
        }}
        onOpenWeek={() => {
          setMomentOverlay('none');
          setScreen('moment-week');
        }}
        onOpenMonth={() => setScreen('moment-month')}
        onOpenPlan={() => {
          setMomentOverlay('none');
          setPlanReturnScreen('moment-week');
          setScreen('plan');
        }}
        onOpenWiloSuggest={() => setMomentOverlay('wilo-suggest')}
        onOpenAgentAnalysis={() => setMomentOverlay('agent-analysis')}
        onCloseOverlay={() => setMomentOverlay('none')}
        onConfirmPlan={() => {
          setMomentOverlay('none');
          setPlanReturnScreen('moment-week');
          setScreen('plan');
        }}
        onOpenWilo={() => openWilo('moment-month')}
      />
    );
  } else if (screen === 'plan') {
    content = (
      <PlanPage
        onBack={() => setScreen(planReturnScreen)}
        onGoHome={() => {
          setMomentOverlay('none');
          setHomeOverlay('none');
          setScreen('home');
        }}
        onOpenAnalysis={() => {
          setMomentOverlay('agent-analysis');
          setScreen('moment-week');
        }}
        onOpenWilo={() => openWilo('plan')}
      />
    );
  } else {
    content = (
      <HomePage
        onOpenMoments={() => {
          setHomeOverlay('none');
          setMomentOverlay('none');
          setScreen('moment-day');
        }}
        onOpenPlan={() => {
          setHomeOverlay('none');
          setPlanReturnScreen('home');
          setMomentOverlay('none');
          setScreen('plan');
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

  return <div key={`${screen}-${momentOverlay}`} className="screen-stage">{content}</div>;
}

export default App;
