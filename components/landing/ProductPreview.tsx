import type { ReactNode } from "react";

import { MiniBarChart, MiniLineChart } from "@/components/landing/DemoCharts";
import type { DemoExperience } from "@/types/site";

interface ProductPreviewProps {
  demo: DemoExperience;
}

const schedulingWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const schedulingTimeRows = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] as const;

const schedulingEvents = [
  {
    dayIndex: 0,
    rowIndex: 3,
    time: "3:00 PM",
    title: "Project Intake",
    client: "Juniper Hospitality",
  },
  {
    dayIndex: 1,
    rowIndex: 0,
    time: "9:00 AM",
    title: "Discovery Call",
    client: "Harbor Bistro",
  },
  {
    dayIndex: 3,
    rowIndex: 2,
    time: "1:00 PM",
    title: "Demo Review",
    client: "Northline Group",
  },
  {
    dayIndex: 4,
    rowIndex: 1,
    time: "11:00 AM",
    title: "Website Review",
    client: "Mesa Kitchen",
  },
] as const;

const schedulingHolds = [
  { dayIndex: 1, rowIndex: 2, label: "Hold" },
  { dayIndex: 4, rowIndex: 3, label: "Pending" },
] as const;

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
    <div className="flex h-full flex-col rounded-[calc(var(--radius-card)+0.2rem)] border border-border/75 bg-surface shadow-[0_28px_64px_rgba(48,24,10,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 px-4 py-3 sm:px-5">
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
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">{children}</div>
    </div>
  );
}

function CompactMetric({
  label,
  value,
  context,
}: {
  label: string;
  value: string;
  context?: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-[1.65rem] font-semibold leading-none text-text-strong">{value}</p>
      {context ? (
        <p className="mt-2 text-sm text-text-muted">{context}</p>
      ) : null}
    </div>
  );
}

function KitchenInventoryPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;
  const primaryItems = heroPreview.sideListItems.slice(0, 4);
  const draftOrder = heroPreview.lowerPanels[0]?.items ?? [];

  return (
    <DemoFrameShell
      eyebrow={heroPreview.appName}
      title="Inventory"
      status={demo.destination.availabilityLabel}
      actions={
        <button
          type="button"
          className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white"
        >
          + Create Order
        </button>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="preview-region [--preview-delay:20ms] flex flex-wrap gap-3">
          {heroPreview.metrics.slice(0, 2).map((metric) => (
            <div
              key={metric.label}
              className="rounded-full border border-border/80 bg-[#FFF7EC] px-4 py-2 text-sm font-medium text-text-strong"
            >
              <span className="font-semibold">{metric.value}</span> {metric.label}
            </div>
          ))}
        </div>

        <div className="preview-region [--preview-delay:70ms] grid flex-1 gap-4 xl:grid-cols-[minmax(0,1.28fr)_minmax(15rem,0.72fr)]">
          <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <div className="flex items-center justify-between gap-3 border-b border-border/65 pb-3">
              <p className="text-sm font-semibold text-text-strong">Inventory</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                Live status
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {primaryItems.map((item, index) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 rounded-[var(--radius-control)] bg-surface-soft/70 px-3 py-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium text-text-strong">{item.label}</p>
                    {item.detail ? (
                      <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                    ) : null}
                  </div>
                  <span className="text-text-muted">{item.value}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                      index < 2
                        ? "bg-[#FFF1E4] text-accent"
                        : "bg-[#F3F0E7] text-[#5E6F53]"
                    }`}
                  >
                    {index < 2 ? "Low" : "Good"}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 rounded-[var(--radius-card)] border border-border bg-background px-4 py-2.5 text-sm font-semibold text-text-strong transition hover:border-accent/40 hover:text-accent"
            >
              Reorder
            </button>
          </div>

          <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <div className="border-b border-border/65 pb-3">
              <p className="text-sm font-semibold text-text-strong">Draft Order</p>
              <p className="mt-1 text-xs text-text-muted">Sysco</p>
            </div>
            <div className="mt-3 space-y-2.5">
              {draftOrder.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] bg-[#FFF9EF] px-3 py-2.5 text-sm"
                >
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-medium text-text-strong">{item.value}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-[var(--radius-card)] bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              Review Order
            </button>
          </div>
        </div>

        <div className="preview-region [--preview-delay:120ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-text-strong">{heroPreview.chartTitle}</p>
              <p className="mt-1 text-xs text-text-muted">This week</p>
            </div>
          </div>
          <div className="mt-4">
            <MiniLineChart
              ariaLabel="Stock consumption this week"
              chartId="kitchen-consumption"
              points={heroPreview.chartSeries}
            />
          </div>
        </div>
      </div>
    </DemoFrameShell>
  );
}

function ClientSchedulingPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;
  const pageStatus = heroPreview.lowerPanels[0]?.items ?? [];

  return (
    <DemoFrameShell
      eyebrow={heroPreview.appName}
      title="Client Scheduling"
      status={demo.destination.availabilityLabel}
      actions={
        <button
          type="button"
          className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white"
        >
          + New Booking
        </button>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="preview-region [--preview-delay:20ms] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {heroPreview.metrics.map((metric) => (
            <CompactMetric
              key={metric.label}
              label={metric.label}
              value={metric.value}
              context={metric.context}
            />
          ))}
        </div>

        <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1.42fr)_minmax(15.5rem,0.58fr)]">
          <div className="preview-region [--preview-delay:70ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <div className="flex items-center justify-between gap-3 pb-3">
              <div>
                <p className="text-sm font-semibold text-text-strong">Weekly Planner</p>
                <p className="mt-1 text-xs text-text-muted">August 2026</p>
              </div>
              <span className="rounded-full bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                Week view
              </span>
            </div>

            <div className="overflow-x-auto pb-1">
              <div className="min-w-[36rem] overflow-hidden rounded-[var(--radius-card)] border border-border/65">
                <div className="grid grid-cols-[5rem_repeat(5,minmax(0,1fr))] border-b border-border/60 bg-surface-soft/80 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  <div className="px-3 py-3">Time</div>
                  {schedulingWeekDays.map((day) => (
                    <div key={day} className="border-l border-border/60 px-3 py-3 text-center">
                      {day}
                    </div>
                  ))}
                </div>

                {schedulingTimeRows.map((slot, rowIndex) => (
                  <div
                    key={slot}
                    className="grid grid-cols-[5rem_repeat(5,minmax(0,1fr))] text-sm"
                  >
                    <div className="border-b border-border/60 px-3 py-3 text-text-muted">
                      {slot}
                    </div>
                    {schedulingWeekDays.map((day, dayIndex) => {
                      const event = schedulingEvents.find(
                        (item) => item.dayIndex === dayIndex && item.rowIndex === rowIndex,
                      );
                      const hold = schedulingHolds.find(
                        (item) => item.dayIndex === dayIndex && item.rowIndex === rowIndex,
                      );

                      return (
                        <div
                          key={`${day}-${slot}`}
                          className="border-b border-l border-border/60 px-2 py-1.5"
                        >
                          {event ? (
                            <div className="rounded-[1rem] bg-[linear-gradient(135deg,#FCE3B0_0%,#F5B17D_100%)] px-3 py-2.5 text-[#6A2A12]">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-85">
                                {event.time}
                              </p>
                              <p className="mt-1 text-sm font-semibold">{event.title}</p>
                              <p className="mt-1 text-xs opacity-80">{event.client}</p>
                            </div>
                          ) : hold ? (
                            <div className="rounded-[1rem] border border-dashed border-border/80 bg-[#FFF8F1] px-3 py-2.5 text-text-muted">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                                Hold
                              </p>
                              <p className="mt-1 text-sm">{hold.label}</p>
                            </div>
                          ) : (
                            <div className="h-[4.45rem] rounded-[1rem] bg-surface-soft/55" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="preview-region [--preview-delay:95ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">{heroPreview.sideListTitle}</p>
            <div className="mt-3 space-y-2.5">
              {heroPreview.sideListItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-[var(--radius-control)] px-3 py-2.5 ${
                    index === 0
                      ? "bg-[#FFF4E6]"
                      : "border border-border/70 bg-surface-soft/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-text-strong">{item.label}</p>
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                      {index === 0 ? "Soon" : "Queued"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-strong">{item.value}</p>
                  {item.detail ? (
                    <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[var(--radius-card)] border border-border/65 bg-[#FFF9EF] px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                Booking Page
              </p>
              <div className="mt-2 space-y-2">
                {pageStatus.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-text-muted">{item.label}</span>
                    <span className="font-medium text-text-strong">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="preview-region [--preview-delay:130ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-text-strong">Bookings This Week</p>
              <p className="mt-1 text-xs text-text-muted">Confirmed demand by day</p>
            </div>
          </div>
          <div className="mt-4">
            <MiniBarChart
              ariaLabel="Bookings this week by day"
              points={heroPreview.chartSeries}
            />
          </div>
        </div>
      </div>
    </DemoFrameShell>
  );
}

function OperationsDashboardPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;
  const workflowHealth = heroPreview.lowerPanels[0]?.items ?? [];
  const automationQueue = heroPreview.lowerPanels[1]?.items ?? [];

  return (
    <DemoFrameShell
      eyebrow={heroPreview.appName}
      title="Operations Dashboard"
      status={demo.destination.availabilityLabel}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          {["Week", "Channel", "Team"].map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-border/80 bg-surface-soft px-3 py-1.5 text-xs font-medium text-text-muted"
            >
              {filter}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="preview-region [--preview-delay:20ms] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {heroPreview.metrics.map((metric) => (
            <CompactMetric
              key={metric.label}
              label={metric.label}
              value={metric.value}
              context={metric.context}
            />
          ))}
        </div>

        <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1.24fr)_minmax(15.75rem,0.76fr)]">
          <div className="preview-region [--preview-delay:70ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-strong">{heroPreview.chartTitle}</p>
                <p className="mt-1 text-xs text-text-muted">Daily revenue over the past week</p>
              </div>
              <span className="rounded-full bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                Last 7 Days
              </span>
            </div>
            <div className="mt-4">
              <MiniLineChart
                ariaLabel="Weekly revenue trend"
                chartId="operations-revenue"
                points={heroPreview.chartSeries}
                valuePrefix="$"
                valueSuffix="k"
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {workflowHealth.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[var(--radius-control)] bg-surface-soft/75 px-3 py-3 text-sm"
                >
                  <p className="text-text-muted">{item.label}</p>
                  <p className="mt-1 font-semibold text-text-strong">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-region [--preview-delay:100ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">{heroPreview.sideListTitle}</p>
            <div className="mt-3 space-y-2.5">
              {heroPreview.sideListItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[var(--radius-control)] bg-[#FFF9EF] px-3 py-2.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-text-strong">{item.label}</p>
                    <p className="text-sm text-text-muted">{item.value}</p>
                  </div>
                  {item.detail ? (
                    <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[var(--radius-card)] border border-border/65 bg-surface-soft/75 px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                Automation Queue
              </p>
              <div className="mt-2 space-y-2">
                {automationQueue.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-text-muted">{item.label}</span>
                    <span className="font-medium text-text-strong">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoFrameShell>
  );
}

export function ProductPreview({ demo }: ProductPreviewProps) {
  return (
    <div className="card-surface overflow-hidden p-4 sm:p-5 lg:min-h-[32.5rem] lg:aspect-[1.42/1] lg:p-6 xl:min-h-[34rem] xl:aspect-[1.46/1]">
      {demo.id === "kitchen-inventory" ? <KitchenInventoryPreview demo={demo} /> : null}
      {demo.id === "bookings-website" ? <ClientSchedulingPreview demo={demo} /> : null}
      {demo.id === "operations-dashboard" ? (
        <OperationsDashboardPreview demo={demo} />
      ) : null}
    </div>
  );
}
