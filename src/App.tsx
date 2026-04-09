import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { MomentPage } from './pages/MomentPage';
import { PlanPage } from './pages/PlanPage';
import { WiloPage } from './pages/WiloPage';

type Screen = 'home' | 'moment-day' | 'moment-week' | 'plan' | 'wilo';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [returnScreen, setReturnScreen] = useState<Exclude<Screen, 'wilo'>>('home');

  const openWilo = (from: Exclude<Screen, 'wilo'>) => {
    setReturnScreen(from);
    setScreen('wilo');
  };

  if (screen === 'wilo') {
    return <WiloPage onBack={() => setScreen(returnScreen)} />;
  }

  if (screen === 'moment-day') {
    return (
      <MomentPage
        mode="day"
        onGoHome={() => {
          setAnalysisOpen(false);
          setScreen('home');
        }}
        onOpenDay={() => setScreen('moment-day')}
        onOpenWeek={() => setScreen('moment-week')}
        onOpenAnalysis={() => {
          setScreen('moment-week');
          setAnalysisOpen(true);
        }}
        onCloseAnalysis={() => setAnalysisOpen(false)}
        onConfirmPlan={() => {
          setAnalysisOpen(false);
          setScreen('plan');
        }}
        onOpenWilo={() => openWilo('moment-day')}
      />
    );
  }

  if (screen === 'moment-week') {
    return (
      <MomentPage
        mode="week"
        analysisOpen={analysisOpen}
        onGoHome={() => {
          setAnalysisOpen(false);
          setScreen('home');
        }}
        onOpenDay={() => {
          setAnalysisOpen(false);
          setScreen('moment-day');
        }}
        onOpenWeek={() => setScreen('moment-week')}
        onOpenAnalysis={() => setAnalysisOpen(true)}
        onCloseAnalysis={() => setAnalysisOpen(false)}
        onConfirmPlan={() => {
          setAnalysisOpen(false);
          setScreen('plan');
        }}
        onOpenWilo={() => openWilo('moment-week')}
      />
    );
  }

  if (screen === 'plan') {
    return (
      <PlanPage
        onBack={() => setScreen('moment-week')}
        onOpenWilo={() => openWilo('plan')}
      />
    );
  }

  return (
    <HomePage
      onOpenMoments={() => {
        setAnalysisOpen(false);
        setScreen('moment-day');
      }}
      onOpenAnalysis={() => {
        setAnalysisOpen(true);
        setScreen('moment-week');
      }}
      onOpenWilo={() => openWilo('home')}
    />
  );
}

export default App;
