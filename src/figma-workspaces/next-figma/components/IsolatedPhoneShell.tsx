import type { PropsWithChildren } from 'react';

type IsolatedPhoneShellProps = PropsWithChildren<{
  workspaceLabel: string;
}>;

export function IsolatedPhoneShell({
  workspaceLabel,
  children,
}: IsolatedPhoneShellProps) {
  return (
    <main className="app-shell isolated-figma-shell">
      <section className="phone-frame isolated-figma-frame">
        <div className="status-bar">
          <span className="status-bar__time">9:41</span>
          <div className="status-bar__island" />
          <div className="status-bar__icons" aria-hidden="true">
            <span className="isolated-figma-signal" />
            <span className="isolated-figma-wifi" />
            <span className="isolated-figma-battery" />
          </div>
        </div>

        <div className="isolated-figma-label">{workspaceLabel}</div>
        <div className="phone-scroll isolated-figma-scroll">{children}</div>
      </section>
    </main>
  );
}
