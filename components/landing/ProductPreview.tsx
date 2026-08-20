import type { ReactNode } from "react";

import {
  MiniBarChart,
  MiniLineChart,
  StatusMeter,
} from "@/components/landing/DemoCharts";
import type { DemoExperience } from "@/types/site";

interface ProductPreviewProps {
  demo: DemoExperience;
}

const schedulingWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const schedulingTimeRows = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"] as const;

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

const schedulingHoldSlots = [
  { dayIndex: 1, rowIndex: 2, label: "Hold" },
  { dayIndex: 4, rowIndex: 3, label: "Pending" },
] as const;

const inventoryHealthItems = [
  { label: "Healthy", value: 72, valueLabel: "72%" },
  { label: "Low Stock", value: 21, valueLabel: "21%" },
  { label: "Critical", value: 7, valueLabel: "7%" },
] as const;

const workflowStatusItems = [
  { label: "Completed", value: 68, valueLabel: "68%" },
  { label: "In Progress", value: 22, valueLabel: "22%" },
  { label: "Blocked", value: 10, valueLabel: "10%" },
] as const;

const revenueChannelItems = [
  { label: "Direct Booking", value: 46, valueLabel: "46%" },
  { label: "Website", value: 31, valueLabel: "31%" },
  { label: "Marketplace", value: 23, valueLabel: "23%" },
] as const;

function DemoMetricCard({
  label,
  value,
  context,
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
      <p className="mt-3 text-[2rem] font-semibold leading-none text-text-strong">{value}</p>
      {context ? (
        <p className="mt-2 text-sm font-medium text-text-strong">{context}</p>
      ) : null}
      <p className={`mt-2 text-xs font-medium ${trendClass}`}>{delta}</p>
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
      <div className="grid gap-4 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
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
              Reorder seafood before dinner service and confirm two pending deliveries.
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

          <div className="preview-region [--preview-delay:70ms] grid gap-3 lg:grid-cols-3">
            {heroPreview.metrics.map((metric) => (
              <DemoMetricCard key={metric.label} {...metric} />
            ))}
          </div>

          <div className="preview-region [--preview-delay:120ms] grid gap-4 2xl:grid-cols-[minmax(0,1.24fr)_minmax(16rem,0.76fr)]">
            <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-text-strong">
                    {heroPreview.chartTitle}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">This week</p>
                </div>
                <span className="rounded-full bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                  This week
                </span>
              </div>
              <div className="mt-5">
                <MiniLineChart
                  ariaLabel="Ingredient usage this week"
                  chartId="kitchen-usage"
                  points={heroPreview.chartSeries}
                />
              </div>
              <div className="mt-5 rounded-[var(--radius-card)] border border-border/65 bg-[#FFF9EF] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-text-strong">Inventory Health</p>
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                    Current
                  </span>
                </div>
                <div className="mt-4">
                  <StatusMeter
                    ariaLabel="Inventory health distribution"
                    items={inventoryHealthItems}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
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
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-text-strong">{item.label}</p>
                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                          Priority
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-text-muted">{item.value}</p>
                      {item.detail ? (
                        <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {heroPreview.lowerPanels.map((panel) => (
                <div
                  key={panel.title}
                  className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4"
                >
                  <p className="text-sm font-semibold text-text-strong">{panel.title}</p>
                  <div className="mt-3 space-y-3">
                    {panel.items.map((item) => (
                      <div key={item.label} className="rounded-[var(--radius-control)] bg-[#FFF9EF] px-3 py-3">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-text-muted">{item.label}</span>
                          <span className="font-medium text-text-strong">{item.value}</span>
                        </div>
                        {item.detail ? (
                          <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DemoFrameShell>
  );
}

function ClientSchedulingPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;
  const upcomingItems = heroPreview.sideListItems.slice(0, 3);
  const bookingPagePanel = heroPreview.lowerPanels[0];
  const bookingHealthPanel = heroPreview.lowerPanels[1];

  return (
    <DemoFrameShell
      eyebrow={heroPreview.appName}
      title="Client Scheduling"
      status={demo.destination.availabilityLabel}
      actions={
        <span className="rounded-[999px] bg-accent px-3.5 py-1.5 text-xs font-semibold text-white">
          + New Booking
        </span>
      }
    >
      <div className="space-y-4">
        <div className="preview-region [--preview-delay:20ms] rounded-[var(--radius-card)] border border-border/70 bg-[#FFF9EF] px-5 py-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Client scheduling
              </p>
              <h3 className="mt-3 max-w-[16ch] text-[2.05rem] leading-[0.98] text-text-strong">
                {heroPreview.summary}
              </h3>
            </div>
            <div className="rounded-full border border-border/70 bg-background/85 px-3 py-1.5 text-xs font-medium text-text-muted">
              August 2026
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {heroPreview.metrics.map((metric) => (
              <DemoMetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.82fr)_minmax(17.5rem,0.84fr)]">
          <div className="preview-region [--preview-delay:80ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-text-strong">Weekly Planner</p>
                <p className="mt-1 text-xs text-text-muted">
                  A week view that keeps appointments, holds, and open time readable.
                </p>
              </div>
              <div className="flex gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                <span className="rounded-full bg-surface-soft px-3 py-1.5">Week</span>
                <span className="rounded-full border border-border/80 px-3 py-1.5">
                  August 2026
                </span>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto pb-1">
              <div className="min-w-[42rem] overflow-hidden rounded-[var(--radius-card)] border border-border/70">
                <div className="grid grid-cols-[5.5rem_repeat(5,minmax(0,1fr))] border-b border-border/60 bg-surface-soft/80 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
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
                    className="grid grid-cols-[5.5rem_repeat(5,minmax(0,1fr))] text-sm"
                  >
                    <div className="border-b border-border/60 px-3 py-4 font-medium text-text-muted">
                      {slot}
                    </div>
                    {schedulingWeekDays.map((day, dayIndex) => {
                      const event = schedulingEvents.find(
                        (item) => item.dayIndex === dayIndex && item.rowIndex === rowIndex,
                      );
                      const hold = schedulingHoldSlots.find(
                        (item) => item.dayIndex === dayIndex && item.rowIndex === rowIndex,
                      );

                      return (
                        <div
                          key={`${day}-${slot}`}
                          className="border-b border-l border-border/60 px-2 py-2"
                        >
                          {event ? (
                            <div className="min-h-[6.2rem] rounded-[1rem] bg-[linear-gradient(135deg,#FCE3B0_0%,#F5B17D_100%)] px-3 py-3 text-[#6A2A12]">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-85">
                                {event.time}
                              </p>
                              <p className="mt-2 text-sm font-semibold leading-5">
                                {event.title}
                              </p>
                              <p className="mt-1 text-xs leading-5 opacity-80">
                                {event.client}
                              </p>
                            </div>
                          ) : hold ? (
                            <div className="min-h-[6.2rem] rounded-[1rem] border border-dashed border-border/80 bg-[#FFF8F1] px-3 py-3 text-text-muted">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                                Hold
                              </p>
                              <p className="mt-2 text-sm font-medium">{hold.label}</p>
                            </div>
                          ) : (
                            <div className="min-h-[6.2rem] rounded-[1rem] bg-surface-soft/55" />
                          )}
                        </div>
                      );
                    })}
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
                    <p className="mt-2 text-sm text-text-strong">{item.value}</p>
                    {item.detail ? (
                      <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="preview-region [--preview-delay:110ms] rounded-[var(--radius-card)] border border-border/70 bg-surface-soft/70 px-4 py-4">
              <p className="text-sm font-semibold text-text-strong">Open Holds</p>
              <div className="mt-4 space-y-3">
                {["Friday 3:30 PM", "Tuesday 1:00 PM"].map((slot, index) => (
                  <div
                    key={slot}
                    className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] bg-surface px-3 py-3"
                  >
                    <span className="text-sm text-text-muted">{slot}</span>
                    <span className="text-sm font-medium text-text-strong">
                      {index === 0 ? "Pending confirmation" : "Reschedule option"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="preview-region [--preview-delay:170ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-text-strong">Bookings This Week</p>
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                  Trend
                </span>
              </div>
              <div className="mt-4">
                <MiniBarChart
                  ariaLabel="Bookings this week by day"
                  points={heroPreview.chartSeries}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="preview-region [--preview-delay:140ms] grid gap-4 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">{bookingPagePanel?.title}</p>
            <div className="mt-4 space-y-3">
              {bookingPagePanel?.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] bg-[#FFF9EF] px-3 py-3 text-sm"
                >
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-medium text-text-strong">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">{bookingHealthPanel?.title}</p>
            <div className="mt-4 space-y-3">
              {bookingHealthPanel?.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] bg-surface-soft px-3 py-3 text-sm"
                >
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-medium text-text-strong">{item.value}</span>
                </div>
              ))}
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

        <div className="preview-region [--preview-delay:70ms] grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {heroPreview.metrics.map((metric) => (
            <DemoMetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="preview-region [--preview-delay:120ms] grid gap-4 xl:grid-cols-[minmax(0,1.16fr)_minmax(19rem,0.84fr)]">
          <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-strong">
                  {heroPreview.chartTitle}
                </p>
                <p className="mt-1 text-xs text-text-muted">Daily revenue over the past week</p>
              </div>
              <span className="rounded-full bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                Last 7 Days
              </span>
            </div>
            <div className="mt-5">
              <MiniLineChart
                ariaLabel="Weekly revenue trend"
                chartId="operations-revenue"
                points={heroPreview.chartSeries}
                valuePrefix="$"
                valueSuffix="k"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
              <p className="text-sm font-semibold text-text-strong">Workflow Status</p>
              <div className="mt-4">
                <StatusMeter
                  ariaLabel="Workflow status distribution"
                  items={workflowStatusItems}
                />
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
              <p className="text-sm font-semibold text-text-strong">Revenue by Channel</p>
              <div className="mt-4">
                <StatusMeter
                  ariaLabel="Revenue by channel distribution"
                  items={revenueChannelItems}
                />
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
              <p className="text-sm font-semibold text-text-strong">
                {heroPreview.sideListTitle}
              </p>
              <div className="mt-4 space-y-3">
                {heroPreview.sideListItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[var(--radius-control)] bg-surface-soft px-3 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-text-strong">{item.label}</p>
                      <p className="text-sm text-text-muted">{item.value}</p>
                    </div>
                    {item.detail ? (
                      <p className="mt-1 text-xs leading-6 text-text-muted">{item.detail}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="preview-region [--preview-delay:180ms] grid gap-4 lg:grid-cols-2">
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
    <div className="card-surface min-h-[46rem] overflow-hidden p-4 sm:p-5 lg:p-6">
      {demo.id === "kitchen-inventory" ? <KitchenInventoryPreview demo={demo} /> : null}
      {demo.id === "bookings-website" ? <ClientSchedulingPreview demo={demo} /> : null}
      {demo.id === "operations-dashboard" ? (
        <OperationsDashboardPreview demo={demo} />
      ) : null}
    </div>
  );
}
