import type { ReactNode } from "react";

import type { DemoChartPoint, DemoExperience } from "@/types/site";

interface ProductPreviewProps {
  demo: DemoExperience;
}

const schedulingPlannerColumns = [
  {
    day: "Mon",
    items: [
      { title: "Intake", detail: "3:00 PM", accent: true },
    ],
  },
  {
    day: "Tue",
    items: [
      { title: "Discovery", detail: "9:00 AM", accent: true },
      { title: "Consult", detail: "Hold", accent: false },
    ],
  },
  {
    day: "Wed",
    items: [{ title: "Prep", detail: "Open", accent: false }],
  },
  {
    day: "Thu",
    items: [{ title: "Review", detail: "1:00 PM", accent: true }],
  },
  {
    day: "Fri",
    items: [
      { title: "Website", detail: "11:00 AM", accent: true },
      { title: "Handoff", detail: "2:30 PM", accent: false },
    ],
  },
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
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-3.5 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-[1.55rem] font-semibold leading-none text-text-strong">{value}</p>
      {helper ? <p className="mt-1.5 text-xs text-text-muted">{helper}</p> : null}
    </div>
  );
}

function CompactTrendChart({
  title,
  subtitle,
  points,
  valuePrefix = "",
  valueSuffix = "",
}: {
  title: string;
  subtitle: string;
  points: readonly DemoChartPoint[];
  valuePrefix?: string;
  valueSuffix?: string;
}) {
  const width = 356;
  const height = 120;
  const padding = { top: 14, right: 10, bottom: 22, left: 8 };
  const values = points.map((point) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(1, maxValue - minValue);
  const usableWidth = width - padding.left - padding.right;
  const usableHeight = height - padding.top - padding.bottom;

  const coordinates = points.map((point, index) => {
    const x =
      padding.left +
      (points.length === 1 ? usableWidth / 2 : (usableWidth / (points.length - 1)) * index);
    const y =
      padding.top + usableHeight - ((point.value - minValue) / range) * usableHeight;

    return { ...point, x, y };
  });

  const linePath = coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text-strong">{title}</p>
          <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
        </div>
        <span className="rounded-full bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
          Last 7 Days
        </span>
      </div>

      <svg
        role="img"
        aria-label={title}
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 h-[7.25rem] w-full"
      >
        {[0, 1, 2].map((row) => {
          const y = padding.top + (usableHeight / 2) * row;

          return (
            <line
              key={row}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgba(108,92,77,0.12)"
              strokeWidth="1"
            />
          );
        })}

        <path
          d={linePath}
          fill="none"
          stroke="#D35F39"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {coordinates.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="4" fill="#FCF7EE" stroke="#D35F39" strokeWidth="2" />
            <text
              x={point.x}
              y={height - 4}
              textAnchor="middle"
              fontSize="10.5"
              fill="#6C5C4D"
              fontFamily="var(--font-body-family)"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-text-muted">
        {points.slice(0, 4).map((point) => (
          <span
            key={point.label}
            className="rounded-full border border-border/70 bg-surface-soft px-2.5 py-1"
          >
            {point.label} {valuePrefix}
            {point.value}
            {valueSuffix}
          </span>
        ))}
      </div>
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
      <div className="flex h-full flex-col gap-3">
        <div className="preview-region [--preview-delay:20ms] flex flex-wrap gap-2.5">
          {heroPreview.metrics.slice(0, 2).map((metric) => (
            <div
              key={metric.label}
              className="rounded-full border border-border/80 bg-[#FFF7EC] px-4 py-2 text-sm font-medium text-text-strong"
            >
              <span className="font-semibold">{metric.value}</span> {metric.label}
            </div>
          ))}
        </div>

        <div className="preview-region [--preview-delay:70ms] grid flex-1 gap-3 xl:grid-cols-[minmax(0,1.32fr)_minmax(13.75rem,0.68fr)]">
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
                  <div className="min-w-0">
                    <p className="truncate font-medium text-text-strong">{item.label}</p>
                    {item.detail ? (
                      <p className="mt-0.5 truncate text-xs text-text-muted">{item.detail}</p>
                    ) : null}
                  </div>
                  <span className="whitespace-nowrap text-text-muted">{item.value}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      index < 2 ? "bg-[#FFF1E4] text-accent" : "bg-[#F3F0E7] text-[#5E6F53]"
                    }`}
                  >
                    {index < 2 ? "Low" : "Good"}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-3 rounded-[var(--radius-card)] border border-border bg-background px-4 py-2.5 text-sm font-semibold text-text-strong transition hover:border-accent/40 hover:text-accent"
            >
              Reorder
            </button>
          </div>

          <div className="rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <div className="border-b border-border/65 pb-3">
              <p className="text-sm font-semibold text-text-strong">Draft Order</p>
              <p className="mt-1 text-xs text-text-muted">Sysco</p>
            </div>

            <div className="mt-3 space-y-2">
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
              className="mt-3 w-full rounded-[var(--radius-card)] bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              Review Order
            </button>
          </div>
        </div>

      </div>
    </DemoFrameShell>
  );
}

function ClientSchedulingPreview({ demo }: ProductPreviewProps) {
  const { heroPreview } = demo;

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
      <div className="flex h-full flex-col gap-3">
        <div className="preview-region [--preview-delay:20ms] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <CompactMetric label="Today" value={heroPreview.metrics[0]?.value ?? "5"} helper="Bookings" />
          <CompactMetric label="Confirmed" value={heroPreview.metrics[1]?.value ?? "3"} helper="Booked" />
          <CompactMetric label="Open Slots" value={heroPreview.metrics[2]?.value ?? "1"} helper="Available" />
          <CompactMetric label="This Week" value={heroPreview.metrics[3]?.value ?? "12"} helper="Bookings" />
        </div>

        <div className="grid flex-1 gap-3 xl:grid-cols-[minmax(0,1.28fr)_minmax(13.75rem,0.72fr)]">
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

            <div className="grid grid-cols-5 gap-2.5 rounded-[var(--radius-card)] border border-border/65 bg-[#FFF9EF] p-3">
              {schedulingPlannerColumns.map((column) => (
                <div
                  key={column.day}
                  className="rounded-[var(--radius-card)] border border-border/60 bg-surface px-2.5 py-3"
                >
                  <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                    {column.day}
                  </p>
                  <div className="mt-3 space-y-2">
                    {column.items.map((item) => (
                      <div
                        key={`${column.day}-${item.title}`}
                        className={`rounded-[0.95rem] px-2.5 py-2 ${
                          item.accent
                            ? "bg-[linear-gradient(135deg,#FCE3B0_0%,#F5B17D_100%)] text-[#6A2A12]"
                            : "bg-surface-soft text-text-muted"
                        }`}
                      >
                        <p className="text-xs font-semibold">{item.title}</p>
                        <p className="mt-0.5 text-[11px]">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-region [--preview-delay:95ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">{heroPreview.sideListTitle}</p>
            <div className="mt-3 space-y-2.5">
              {heroPreview.sideListItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-[var(--radius-control)] px-3 py-2.5 ${
                    index === 0 ? "bg-[#FFF4E6]" : "border border-border/70 bg-surface-soft/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-text-strong">{item.label}</p>
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted">
                      {index === 0 ? "Soon" : "Queued"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-text-strong">{item.value}</p>
                  {item.detail ? <p className="mt-0.5 text-xs text-text-muted">{item.detail}</p> : null}
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
      <div className="flex h-full flex-col gap-3">
        <div className="preview-region [--preview-delay:20ms] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {heroPreview.metrics.map((metric) => (
            <CompactMetric
              key={metric.label}
              label={metric.label}
              value={metric.value}
              helper={metric.context}
            />
          ))}
        </div>

        <div className="grid flex-1 gap-3 xl:grid-cols-[minmax(0,1.18fr)_minmax(13.5rem,0.82fr)]">
          <div className="preview-region [--preview-delay:70ms]">
            <CompactTrendChart
              title={heroPreview.chartTitle}
              subtitle="Daily revenue over the past week"
              points={heroPreview.chartSeries}
              valuePrefix="$"
              valueSuffix="k"
            />
          </div>

          <div className="preview-region [--preview-delay:95ms] rounded-[var(--radius-card)] border border-border/70 bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-text-strong">{heroPreview.sideListTitle}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-text-muted">
              {automationQueue.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-border/70 bg-surface-soft px-2.5 py-1"
                >
                  {item.label}: <span className="font-medium text-text-strong">{item.value}</span>
                </span>
              ))}
            </div>
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
                  {item.detail ? <p className="mt-1 text-xs text-text-muted">{item.detail}</p> : null}
                </div>
              ))}
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
