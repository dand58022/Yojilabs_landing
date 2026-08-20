import type { DemoExperience } from "@/types/site";

interface ProductPreviewProps {
  demo: DemoExperience;
}

export function ProductPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;
  const maxPoint = Math.max(...heroPreview.chartSeries.map((point) => point.value));

  return (
    <div className="card-surface overflow-hidden p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <p className="text-sm font-semibold text-text-strong">
            {heroPreview.appName}
          </p>
          <p className="mt-1 text-2xl font-semibold text-text-strong">
            {heroPreview.heading}
          </p>
          <p className="mt-2 text-sm leading-7 text-text-muted">
            {heroPreview.summary}
          </p>
        </div>
        <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-text-muted">
          {demo.destination.availabilityLabel}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {heroPreview.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              {metric.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-text-strong">
              {metric.value}
            </p>
            <p
              className={`mt-2 text-xs font-medium ${
                metric.trend === "down"
                  ? "text-accent"
                  : metric.trend === "up"
                    ? "text-[#3D7B4F]"
                    : "text-text-muted"
              }`}
            >
              {metric.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-text-strong">
              {heroPreview.chartTitle}
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
              Sample
            </p>
          </div>

          <div className="mt-6 flex h-44 items-end gap-3">
            {heroPreview.chartSeries.map((point) => (
              <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-full w-full items-end rounded-full bg-surface-soft px-1">
                  <div
                    className="w-full rounded-full bg-[linear-gradient(180deg,#E9A342_0%,#D35F39_100%)]"
                    style={{ height: `${(point.value / maxPoint) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-text-muted">{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
          <p className="text-sm font-semibold text-text-strong">
            {heroPreview.sideListTitle}
          </p>
          <div className="mt-4 space-y-3">
            {heroPreview.sideListItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-control)] bg-surface-soft px-3 py-3"
              >
                <span className="text-sm font-medium text-text-strong">
                  {item.label}
                </span>
                <span className="text-sm text-text-muted">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {heroPreview.lowerPanels.map((panel) => (
          <div
            key={panel.title}
            className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5"
          >
            <p className="text-sm font-semibold text-text-strong">{panel.title}</p>
            <div className="mt-4 space-y-3">
              {panel.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-medium text-text-strong">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
