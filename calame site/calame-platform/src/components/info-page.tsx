import type { ReactNode } from 'react';

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="container-page py-12">
      <header className="mb-8 max-w-3xl reveal">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {intro ? <p className="muted mt-3 text-lg">{intro}</p> : null}
      </header>
      <div className="prose-block grid gap-6">{children}</div>
    </div>
  );
}
