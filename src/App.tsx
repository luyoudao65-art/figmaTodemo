import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { FriendMemoryPage } from './pages/FriendMemoryPage';
import { MomentPage } from './pages/MomentPage';
import { PlanPage } from './pages/PlanPage';
import { WiloPage } from './pages/WiloPage';
import type { GeneratedPlanScenario, GeneratedPlanSuggestion } from './types/generatedPlan';

type Screen =
  | 'home'
  | 'moment-day'
  | 'moment-month'
  | 'friend-memory'
  | 'plan'
  | 'wilo';
type MomentOverlay = 'none' | 'wilo-suggest';
type HomeOverlay = 'none' | 'goal-analysis';
type PlanVariant = 'default' | 'new-plan';
type FriendMemoryReturn = 'moment-day-excited' | 'moment-day-anxious';
type MomentDetailEntry = 'excited' | 'anxious' | null;

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [hasVisitedHome, setHasVisitedHome] = useState(false);
  const [momentOverlay, setMomentOverlay] = useState<MomentOverlay>('none');
  const [homeOverlay, setHomeOverlay] = useState<HomeOverlay>('none');
  const [planVariant, setPlanVariant] = useState<PlanVariant>('default');
  const [planInitialDate, setPlanInitialDate] = useState('29');
  const [generatedPlansByDate, setGeneratedPlansByDate] = useState<Record<string, GeneratedPlanSuggestion[]>>({});
  const [recentGeneratedPlanKeys, setRecentGeneratedPlanKeys] = useState<string[]>([]);
  const [returnScreen, setReturnScreen] = useState<Exclude<Screen, 'wilo'>>('home');
  const [friendMemoryReturn, setFriendMemoryReturn] = useState<FriendMemoryReturn>('moment-day-anxious');
  const [momentEntryDetail, setMomentEntryDetail] = useState<MomentDetailEntry>(null);

  const stageTone = screen === 'friend-memory' ? 'light' : 'dark';

  const openMomentDetail = (detail: 'excited' | 'anxious') => {
    setMomentEntryDetail(detail);
    setFriendMemoryReturn(detail === 'excited' ? 'moment-day-excited' : 'moment-day-anxious');
    setScreen('moment-day');
  };

  const openWilo = (from: Exclude<Screen, 'wilo'>) => {
    setReturnScreen(from);
    setScreen('wilo');
  };

  const planKeyFor = (plan: GeneratedPlanSuggestion) => `${plan.templateId}-${plan.timeLabel}-${plan.title}`;

  const openPlan = (variant: PlanVariant, targetDate = '29') => {
    setMomentOverlay('none');
    setPlanVariant(variant);
    setPlanInitialDate(targetDate);
    if (variant === 'default') {
      setRecentGeneratedPlanKeys([]);
    }
    setScreen('plan');
  };

  const confirmPlanScenario = (scenario?: GeneratedPlanScenario) => {
    if (!scenario) {
      setRecentGeneratedPlanKeys([]);
      openPlan('new-plan');
      return;
    }

    const confirmedPlans = scenario.plans.map((plan) => ({
      ...plan,
      hasAlert: false,
      isNew: true,
    }));
    const recentKeys = confirmedPlans.map(planKeyFor);

    setGeneratedPlansByDate((previous) => {
      const existing = previous[scenario.targetDate] ?? [];
      const merged = new Map<string, GeneratedPlanSuggestion>();

      existing.forEach((plan) => {
        merged.set(planKeyFor(plan), { ...plan, isNew: false });
      });

      confirmedPlans.forEach((plan) => {
        merged.set(planKeyFor(plan), plan);
      });

      return {
        ...previous,
        [scenario.targetDate]: Array.from(merged.values()).sort(
          (left, right) => (left.sortMinutes ?? 0) - (right.sortMinutes ?? 0)
        ),
      };
    });

    setRecentGeneratedPlanKeys(recentKeys);
    setPlanVariant('new-plan');
    setPlanInitialDate(scenario.targetDate);
    setMomentOverlay('none');
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
        onConfirmPlan={confirmPlanScenario}
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
        onConfirmPlan={confirmPlanScenario}
        onOpenFriendMemory={(detail) => {
          setFriendMemoryReturn(detail === 'excited' ? 'moment-day-excited' : 'moment-day-anxious');
          setMomentEntryDetail(detail);
          setScreen('friend-memory');
        }}
      />
    );
  } else if (screen === 'friend-memory') {
    content = (
      <FriendMemoryPage
        onBack={() => {
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
        generatedPlansByDate={generatedPlansByDate}
        recentGeneratedPlanKeys={recentGeneratedPlanKeys}
        initialActiveDate={planInitialDate}
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
        isFirstVisit={!hasVisitedHome}
        onOpenMoments={() => {
          setHomeOverlay('none');
          setMomentOverlay('none');
          setMomentEntryDetail(null);
          if (!hasVisitedHome) {
            setHasVisitedHome(true);
          }
          setScreen('moment-day');
        }}
        onOpenMomentDetail={(detail) => {
          openMomentDetail(detail);
          if (!hasVisitedHome) {
            setHasVisitedHome(true);
          }
        }}
        onOpenPlan={() => {
          setHomeOverlay('none');
          setMomentOverlay('none');
          if (!hasVisitedHome) {
            setHasVisitedHome(true);
          }
          openPlan('default');
        }}
        onOpenGoalAnalysis={() => setHomeOverlay('goal-analysis')}
        goalAnalysisOpen={homeOverlay === 'goal-analysis'}
        onCloseGoalAnalysis={() => setHomeOverlay('none')}
        onOpenWilo={() => {
          setHomeOverlay('none');
          if (!hasVisitedHome) {
            setHasVisitedHome(true);
          }
          openWilo('home');
        }}
      />
    );
  }

  return <div className={`screen-stage screen-stage--${stageTone}`}>{content}</div>;
}

export default App;
