import type { ReactNode } from "react";

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

function DemoFrameShell({
  eyebrow,
  title,
  status,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  status: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[calc(var(--radius-card)+0.2rem)] border border-border/75 bg-surface shadow-[0_28px_64px_rgba(48,24,10,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/75" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-warm/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#88A176]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              {eyebrow}
            </p>
            <p className="mt-1 text-sm font-semibold text-text-strong">{title}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {actions}
          <span className="rounded-full border border-border/80 bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
            {status}
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function KitchenInventoryPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;

  return (
    <DemoFrameShell
      eyebrow={heroPreview.appName}
      title={heroPreview.heading}
      status={demo.destination.availabilityLabel}
      actions={
        <span className="rounded-full border border-border/80 bg-[#FFF7EC] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
          Daily snapshot
        </span>
      }
    >
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
                    <span className="text-sm font-medium text-text-strong">
                      {item.label}
                    </span>
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
      </div>
    </DemoFrameShell>
  );
}

function ClientSchedulingPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeRows = ["9:00", "11:00", "1:00", "3:00", "5:00"];
  const upcomingItems = heroPreview.sideListItems.slice(0, 3);
  const openHoldItems = heroPreview.lowerPanels[1]?.items ?? [];

  return (
    <DemoFrameShell
      eyebrow={heroPreview.appName}
      title={heroPreview.heading}
      status={demo.destination.availabilityLabel}
      actions={
        <>
          <span className="rounded-full border border-border/80 bg-[#FFF7EC] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            Guided preview
          </span>
          <span className="rounded-[999px] bg-accent px-3.5 py-1.5 text-xs font-semibold text-white">
            + New Booking
          </span>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)]">
        <div className="space-y-4">
          <div className="preview-region [--preview-delay:20ms] rounded-[var(--radius-card)] border border-border/70 bg-[#FFF9EF] px-5 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Client scheduling
                </p>
                <h3 className="mt-3 text-[2rem] leading-[1] text-text-strong">
                  {heroPreview.summary}
                </h3>
              </div>
              <div className="rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-xs font-medium text-text-muted">
                August 2026
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {heroPreview.metrics.map((metric) => (
                <DemoMetricCard key={metric.label} {...metric} />
              ))}
            </div>
          </div>

          <div className="preview-region [--preview-delay:80ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-strong">
                  {heroPreview.chartTitle}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Availability, holds, and confirmed calls.
                </p>
              </div>
              <div className="flex gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                <span className="rounded-full bg-surface-soft px-3 py-1.5">Week</span>
                <span className="rounded-full border border-border/80 px-3 py-1.5">
                  Team
                </span>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-[var(--radius-card)] border border-border/70">
              <div className="grid grid-cols-[4.25rem_repeat(5,minmax(0,1fr))] border-b border-border/60 bg-surface-soft/80 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                <div className="px-3 py-3">Time</div>
                {weekDays.map((day) => (
                  <div key={day} className="border-l border-border/60 px-3 py-3 text-center">
                    {day}
                  </div>
                ))}
              </div>

              {timeRows.map((slot, rowIndex) => (
                <div
                  key={slot}
                  className="grid grid-cols-[4.25rem_repeat(5,minmax(0,1fr))] text-sm"
                >
                  <div className="border-b border-border/60 px-3 py-4 font-medium text-text-muted">
                    {slot}
                  </div>
                  {weekDays.map((day, columnIndex) => {
                    const isHighlighted =
                      (rowIndex === 0 && columnIndex === 1) ||
                      (rowIndex === 2 && columnIndex === 3) ||
                      (rowIndex === 3 && columnIndex === 0);
                    const isHold =
                      (rowIndex === 1 && columnIndex === 4) ||
                      (rowIndex === 4 && columnIndex === 2);

                    return (
                      <div
                        key={`${slot}-${day}`}
                        className="border-b border-l border-border/60 px-2 py-2"
                      >
                        <div
                          className={`min-h-[3.9rem] rounded-[1rem] px-3 py-2 ${
                            isHighlighted
                              ? "bg-[linear-gradient(135deg,#FCE3B0_0%,#F5B17D_100%)] text-[#6A2A12]"
                              : isHold
                                ? "border border-dashed border-border/80 bg-[#FFF8F1] text-text-muted"
                                : "bg-surface-soft/70 text-transparent"
                          }`}
                        >
                          {isHighlighted ? (
                            <>
                              <p className="text-xs font-semibold">
                                {columnIndex === 1
                                  ? "Discovery Call"
                                  : columnIndex === 3
                                    ? "Demo Review"
                                    : "Project Intake"}
                              </p>
                              <p className="mt-1 text-[11px] font-medium opacity-80">
                                {columnIndex === 1
                                  ? "Restaurant group"
                                  : columnIndex === 3
                                    ? "Website prospect"
                                    : "Ops workflow"}
                              </p>
                            </>
                          ) : isHold ? (
                            <p className="text-[11px] font-medium">Held</p>
                          ) : (
                            "."
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="preview-region [--preview-delay:140ms] grid gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
              <p className="text-sm font-semibold text-text-strong">Confirmed this week</p>
              <div className="mt-4">
                <DemoBars points={heroPreview.chartSeries} compact />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {heroPreview.lowerPanels.slice(0, 2).map((panel) => (
                <div
                  key={panel.title}
                  className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4"
                >
                  <p className="text-sm font-semibold text-text-strong">{panel.title}</p>
                  <div className="mt-3 space-y-3">
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
        </div>

        <div className="space-y-4">
          <div className="preview-region [--preview-delay:50ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">
              {heroPreview.sideListTitle}
            </p>
            <div className="mt-4 space-y-3">
              {upcomingItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-[var(--radius-control)] px-3 py-3 ${
                    index === 0
                      ? "bg-[#FFF4E6]"
                      : "border border-border/70 bg-surface-soft/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-text-strong">{item.label}</p>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                      {index === 0 ? "Soon" : "Queued"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-text-muted">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-region [--preview-delay:110ms] rounded-[var(--radius-card)] border border-border/70 bg-surface-soft/70 px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">Open holds</p>
            <div className="mt-4 space-y-3">
              {openHoldItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] bg-surface px-3 py-3"
                >
                  <span className="text-sm text-text-muted">{item.label}</span>
                  <span className="text-sm font-medium text-text-strong">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-region [--preview-delay:170ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">Client prep flow</p>
            <div className="mt-4 grid gap-2">
              {["Choose path", "Share context", "Book time", "Receive follow-up"].map(
                (step, index) => (
                  <div
                    key={step}
                    className={`flex items-center justify-between rounded-[var(--radius-control)] px-3 py-2.5 text-sm ${
                      index === 2
                        ? "bg-[#FFF4E6] text-text-strong"
                        : "bg-surface-soft text-text-muted"
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
        </div>
      </div>
    </DemoFrameShell>
  );
}

function OperationsDashboardPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;

  return (
    <DemoFrameShell
      eyebrow={heroPreview.appName}
      title={heroPreview.heading}
      status={demo.destination.availabilityLabel}
      actions={
        <>
          {["Week", "Channel", "Team", "Export"].map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-border/80 bg-surface-soft px-3 py-1.5 text-xs font-medium text-text-muted"
            >
              {filter}
            </span>
          ))}
        </>
      }
    >
      <div className="space-y-4">
        <div className="preview-region [--preview-delay:20ms] flex flex-col gap-3 rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              Reporting Layer
            </p>
            <p className="mt-2 text-2xl font-semibold text-text-strong">
              {heroPreview.heading}
            </p>
            <p className="mt-2 text-sm leading-7 text-text-muted">{heroPreview.summary}</p>
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
              <p className="text-sm font-semibold text-text-strong">
                {heroPreview.chartTitle}
              </p>
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
                    index === 0
                      ? "bg-[#FFF4E6] text-text-strong"
                      : "bg-surface-soft text-text-muted"
                  }`}
                >
                  {topic}
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
                  className="rounded-[var(--radius-control)] bg-surface-soft px-3 py-3"
                >
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
    </DemoFrameShell>
  );
}

export function ProductPreview({ demo }: ProductPreviewProps) {
  return (
    <div className="card-surface min-h-[44rem] overflow-hidden p-4 sm:p-5 lg:p-6">
      {demo.id === "kitchen-inventory" ? <KitchenInventoryPreview demo={demo} /> : null}
      {demo.id === "bookings-website" ? <ClientSchedulingPreview demo={demo} /> : null}
      {demo.id === "operations-dashboard" ? (
        <OperationsDashboardPreview demo={demo} />
      ) : null}
    </div>
  );
}
