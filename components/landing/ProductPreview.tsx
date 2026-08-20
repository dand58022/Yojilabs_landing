import type { DemoExperience } from "@/types/site";

interface ProductPreviewProps {
  demo: DemoExperience;
}

function DemoMetricCard({
  label,
  value,
  delta,
  trend,
}: DemoExperience["heroPreview"]["metrics"][number]) {
  const trendClass =
    trend === "down"
      ? "text-accent"
      : trend === "up"
        ? "text-[#3D7B4F]"
        : "text-text-muted";

  return (
    <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-[1.7rem] font-semibold leading-none text-text-strong">
        {value}
      </p>
      <p className={`mt-2 text-xs font-medium ${trendClass}`}>{delta}</p>
    </div>
  );
}

function DemoBars({
  points,
  compact = false,
}: {
  points: DemoExperience["heroPreview"]["chartSeries"];
  compact?: boolean;
}) {
  const maxPoint = Math.max(...points.map((point) => point.value));

  return (
    <div className={`flex items-end gap-3 ${compact ? "h-36" : "h-44"}`}>
      {points.map((point) => (
        <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
          <div className="flex h-full w-full items-end rounded-[1rem] bg-surface-soft px-1.5 py-1.5">
            <div
              className="w-full rounded-[0.85rem] bg-[linear-gradient(180deg,#E9A342_0%,#D35F39_100%)]"
              style={{ height: `${(point.value / maxPoint) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-text-muted">{point.label}</span>
        </div>
      ))}
    </div>
  );
}

function KitchenInventoryPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;

  return (
    <div className="grid gap-4 lg:grid-cols-[13.25rem_minmax(0,1fr)]">
      <aside className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
        <div className="border-b border-border/70 pb-4">
          <p className="text-sm font-semibold text-text-strong">{heroPreview.appName}</p>
          <p className="mt-2 text-xs leading-6 text-text-muted">{heroPreview.summary}</p>
        </div>

        <div className="mt-4 space-y-2.5 text-sm text-text-muted">
          {["Overview", "Inventory", "Purchases", "Prep", "Reports", "Settings"].map(
            (item, index) => (
              <div
                key={item}
                className={`rounded-[var(--radius-control)] px-3 py-2.5 ${
                  index === 0
                    ? "bg-surface-soft font-semibold text-text-strong"
                    : "hover:bg-surface-soft/70"
                }`}
              >
                {item}
              </div>
            ),
          )}
        </div>

        <div className="mt-4 rounded-[var(--radius-card)] border border-border/80 bg-surface-soft px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Priority
          </p>
          <p className="mt-2 text-sm font-medium text-text-strong">
            Three items need reorders before dinner service.
          </p>
        </div>
      </aside>

      <div className="space-y-4">
        <div className="preview-region [--preview-delay:20ms] flex items-start justify-between gap-4 rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              Daily Snapshot
            </p>
            <p className="mt-2 text-2xl font-semibold text-text-strong">
              {heroPreview.heading}
            </p>
          </div>
          <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-text-muted">
            {demo.destination.availabilityLabel}
          </span>
        </div>

        <div className="preview-region [--preview-delay:70ms] grid gap-3 sm:grid-cols-3">
          {heroPreview.metrics.map((metric) => (
            <DemoMetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="preview-region [--preview-delay:120ms] grid gap-4 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)]">
          <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-text-strong">
                {heroPreview.chartTitle}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                This week
              </p>
            </div>
            <div className="mt-5">
              <DemoBars points={heroPreview.chartSeries} />
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
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] bg-surface-soft px-3 py-3"
                >
                  <span className="text-sm font-medium text-text-strong">{item.label}</span>
                  <span className="text-sm text-text-muted">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-region [--preview-delay:180ms] grid gap-4 sm:grid-cols-2">
          {heroPreview.lowerPanels.map((panel) => (
            <div
              key={panel.title}
              className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5"
            >
              <p className="text-sm font-semibold text-text-strong">{panel.title}</p>
              <div className="mt-4 space-y-3">
                {panel.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-text-muted">{item.label}</span>
                    <span className="font-medium text-text-strong">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingsWebsitePreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;
  const primaryMetric = heroPreview.metrics[0];
  const secondaryMetrics = heroPreview.metrics.slice(1);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)]">
      <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
        <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-warm/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#88A176]" />
          </div>
          <div className="rounded-full border border-border/80 bg-surface-soft px-4 py-1.5 text-xs font-medium text-text-muted">
            yojilabs.com/start
          </div>
          <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-text-muted">
            {demo.destination.availabilityLabel}
          </span>
        </div>

        <div className="preview-region [--preview-delay:30ms] mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(15rem,0.92fr)]">
          <div className="rounded-[var(--radius-card)] border border-border/70 bg-[#FFF9EF] px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Site-led conversion
            </p>
            <h3 className="mt-3 max-w-[12ch] text-[2.1rem] leading-[0.98] text-text-strong">
              {heroPreview.heading}
            </h3>
            <p className="mt-4 max-w-[32rem] text-sm leading-7 text-text-muted">
              Keep demos, intake, and booking steps on-site so prospects stay inside a single YojiLabs experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-[var(--radius-card)] bg-accent px-4 py-3 text-sm font-semibold text-white">
                Book a Call
              </div>
              <div className="rounded-[var(--radius-card)] border border-border bg-surface px-4 py-3 text-sm font-semibold text-text-strong">
                Send Project Details
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4 sm:col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Featured message
                </p>
                <p className="mt-3 text-lg font-semibold text-text-strong">
                  Custom software, websites, and automations built around how your team actually works.
                </p>
              </div>
              <DemoMetricCard {...primaryMetric} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface-soft px-4 py-4">
              <p className="text-sm font-semibold text-text-strong">Client prep flow</p>
              <div className="mt-4 grid gap-2">
                {["Choose path", "Share context", "Book time", "Receive follow-up"].map(
                  (step, index) => (
                    <div
                      key={step}
                      className={`flex items-center justify-between rounded-[var(--radius-control)] px-3 py-2.5 text-sm ${
                        index === 1
                          ? "bg-surface text-text-strong"
                          : "bg-[#FFF9EF] text-text-muted"
                      }`}
                    >
                      <span>{step}</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                        0{index + 1}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
              <p className="text-sm font-semibold text-text-strong">{heroPreview.sideListTitle}</p>
              <div className="mt-4 space-y-3">
                {heroPreview.sideListItems.map((item) => (
                  <div key={item.label} className="border-b border-border/55 pb-3 last:border-b-0 last:pb-0">
                    <p className="text-sm font-medium text-text-strong">{item.label}</p>
                    <p className="mt-1 text-xs leading-6 text-text-muted">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="preview-region [--preview-delay:120ms] mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)]">
          <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-text-strong">{heroPreview.chartTitle}</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                Weekly
              </p>
            </div>
            <div className="mt-5">
              <DemoBars points={heroPreview.chartSeries} compact />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {secondaryMetrics.map((metric) => (
              <DemoMetricCard key={metric.label} {...metric} />
            ))}
            {heroPreview.lowerPanels.map((panel) => (
              <div
                key={panel.title}
                className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4 sm:col-span-2"
              >
                <p className="text-sm font-semibold text-text-strong">{panel.title}</p>
                <div className="mt-3 space-y-3">
                  {panel.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-text-muted">{item.label}</span>
                      <span className="font-medium text-text-strong">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OperationsDashboardPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;

  return (
    <div className="space-y-4">
      <div className="preview-region [--preview-delay:20ms] flex flex-col gap-3 rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Reporting Layer
          </p>
          <p className="mt-2 text-2xl font-semibold text-text-strong">{heroPreview.heading}</p>
          <p className="mt-2 text-sm leading-7 text-text-muted">{heroPreview.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Week", "Channel", "Team", "Export"].map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-border/80 bg-surface-soft px-3 py-1.5 text-xs font-medium text-text-muted"
            >
              {filter}
            </span>
          ))}
          <span className="rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs font-medium text-text-muted">
            {demo.destination.availabilityLabel}
          </span>
        </div>
      </div>

      <div className="preview-region [--preview-delay:70ms] grid gap-3 sm:grid-cols-3">
        {heroPreview.metrics.map((metric) => (
          <DemoMetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="preview-region [--preview-delay:120ms] grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(18rem,0.82fr)]">
        <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-text-strong">{heroPreview.chartTitle}</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Snapshot
            </p>
          </div>
          <div className="mt-5">
            <DemoBars points={heroPreview.chartSeries} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Revenue", "Workflow Load", "Service Health"].map((topic, index) => (
              <div
                key={topic}
                className={`rounded-[var(--radius-control)] px-3 py-3 text-sm ${
                  index === 0 ? "bg-[#FFF4E6] text-text-strong" : "bg-surface-soft text-text-muted"
                }`}
              >
                {topic}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
          <p className="text-sm font-semibold text-text-strong">{heroPreview.sideListTitle}</p>
          <div className="mt-4 space-y-3">
            {heroPreview.sideListItems.map((item) => (
              <div key={item.label} className="rounded-[var(--radius-control)] bg-surface-soft px-3 py-3">
                <p className="text-sm font-medium text-text-strong">{item.label}</p>
                <p className="mt-1 text-xs leading-6 text-text-muted">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="preview-region [--preview-delay:180ms] grid gap-4 sm:grid-cols-2">
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
                  className="flex items-center justify-between gap-3 border-b border-border/55 pb-3 text-sm last:border-b-0 last:pb-0"
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

export function ProductPreview({ demo }: ProductPreviewProps) {
  return (
    <div className="card-surface min-h-[41rem] overflow-hidden p-4 sm:p-5 lg:p-6">
      {demo.id === "kitchen-inventory" ? <KitchenInventoryPreview demo={demo} /> : null}
      {demo.id === "bookings-website" ? <BookingsWebsitePreview demo={demo} /> : null}
      {demo.id === "operations-dashboard" ? <OperationsDashboardPreview demo={demo} /> : null}
    </div>
  );
}
