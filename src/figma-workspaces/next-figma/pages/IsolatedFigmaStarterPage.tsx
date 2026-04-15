import { IsolatedPhoneShell } from '../components/IsolatedPhoneShell';
import {
  nextFigmaHero,
  nextFigmaMetrics,
  nextFigmaPanels,
} from '../content/starterContent';

export function IsolatedFigmaStarterPage() {
  return (
    <IsolatedPhoneShell workspaceLabel="next-figma">
      <section className="isolated-figma-hero">
        <div className="isolated-figma-hero__glow" aria-hidden="true" />
        <div className="isolated-figma-hero__content">
          <span className="isolated-figma-hero__eyebrow">
            {nextFigmaHero.eyebrow}
          </span>
          <h1>{nextFigmaHero.title}</h1>
          <p>{nextFigmaHero.description}</p>
        </div>

        <div className="isolated-figma-metrics" aria-label="workspace metrics">
          {nextFigmaMetrics.map((metric) => (
            <article key={`${metric.label}-${metric.value}`} className="isolated-figma-metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="isolated-figma-panels" aria-label="workspace structure">
        {nextFigmaPanels.map((panel) => (
          <article key={panel.id} className="isolated-figma-panel">
            <div className="isolated-figma-panel__meta">{panel.meta}</div>
            <h2>{panel.title}</h2>
            <p>{panel.body}</p>
          </article>
        ))}
      </section>
    </IsolatedPhoneShell>
  );
}
