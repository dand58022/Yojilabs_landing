import { siteConfig } from "@/lib/site-config";
import type { DemoExperience } from "@/types/site";

export const demoContent = [
  {
    id: "kitchen-inventory",
    title: "Kitchen Inventory",
    shortLabel: "Inventory",
    category: "Operations system",
    heroTabLabel: "Kitchen Inventory",
    heroCaption:
      "Track stock, usage, and prep gaps in one place so your kitchen can move faster with fewer surprises.",
    destination: {
      status: "live",
      availabilityLabel: "Live demo",
      link: {
        kind: "external",
        href: siteConfig.urls.externalApps.kitchenInventoryDemo,
      },
    },
    previewCard: {
      title: "Pantry inventory control",
      useCase: "Give kitchen teams one live place to manage stock, ordering, and prep visibility.",
      outcome: "Reduce low-stock surprises and turn daily counts into a repeatable workflow.",
    },
    routeCard: {
      summary:
        "A restaurant-ready inventory workflow that keeps purchasing, stock visibility, and service prep in sync.",
      highlights: [
        "Daily stock view with low-stock flags and reorder context.",
        "Simple purchasing and prep visibility for operators and managers.",
        "Grounded in the strongest current YojiLabs proof point.",
      ],
      availabilityNote: "A live Pantry demo exists today and can be connected to this card later.",
    },
    heroPreview: {
      appName: "Yoji Pantry",
      heading: "Good morning, Alex",
      summary: "Here is what is happening in your kitchen today.",
      metrics: [
        { label: "Low Stock Alerts", value: "12", trend: "down", delta: "3 fewer than yesterday" },
        { label: "Orders Checked", value: "24", trend: "up", delta: "8 more than yesterday" },
        { label: "Prep Variance", value: "2.1%", trend: "down", delta: "Back inside target" },
      ],
      chartTitle: "Usage Trend",
      chartSeries: [
        { label: "Mon", value: 24 },
        { label: "Tue", value: 31 },
        { label: "Wed", value: 28 },
        { label: "Thu", value: 36 },
        { label: "Fri", value: 42 },
      ],
      sideListTitle: "Priority Items",
      sideListItems: [
        { label: "Wagyu Beef", value: "2.5 kg left" },
        { label: "Truffle Oil", value: "0.8 L left" },
        { label: "Yuzu Kosho", value: "1 jar left" },
      ],
      lowerPanels: [
        {
          title: "Upcoming Deliveries",
          items: [
            { label: "Produce", value: "11:30 AM" },
            { label: "Seafood", value: "2:00 PM" },
          ],
        },
        {
          title: "Shift Notes",
          items: [
            { label: "Prep team", value: "Two substitutions logged" },
            { label: "Chef note", value: "Update tasting-menu counts" },
          ],
        },
      ],
    },
  },
  {
    id: "bookings-website",
    title: "Client Scheduling",
    shortLabel: "Scheduling",
    category: "Planning system",
    heroTabLabel: "Client Scheduling",
    heroCaption:
      "Keep bookings, confirmations, availability, and client context inside one scheduling workflow.",
    destination: {
      status: "guided-preview",
      availabilityLabel: "Guided preview",
      link: siteConfig.urls.externalApps.bookingsWebsiteDemo
        ? {
            kind: "external",
            href: siteConfig.urls.externalApps.bookingsWebsiteDemo,
          }
        : null,
    },
    previewCard: {
      title: "Client scheduling and booking",
      useCase: "Manage bookings, confirmations, and client follow-ups from one scheduling layer.",
      outcome: "Give teams one clear view of what is booked, what is pending, and where time is available.",
    },
    routeCard: {
      summary:
        "A scheduling workflow that connects client bookings, calendar visibility, and booking-page readiness.",
      highlights: [
        "Weekly planner view with clear appointment states and open slots.",
        "Supports client context, confirmations, and booking-page integration together.",
        "Keeps scheduling visibly distinct from inventory and reporting products.",
      ],
      availabilityNote: "This demo is being prepared as a guided preview for early iterations.",
    },
    heroPreview: {
      appName: "Yoji Schedule",
      heading: "Client schedule overview",
      summary: "Bookings, confirmations, and open time in one place.",
      metrics: [
        { label: "Today", value: "5 bookings", trend: "up", delta: "2 more than yesterday" },
        { label: "Confirmed", value: "3", trend: "up", delta: "Most replies already in" },
        { label: "Open Slots", value: "1", trend: "neutral", delta: "One afternoon hold remains" },
      ],
      chartTitle: "August 2026",
      chartSeries: [
        { label: "Mon", value: 4 },
        { label: "Tue", value: 5 },
        { label: "Wed", value: 3 },
        { label: "Thu", value: 6 },
        { label: "Fri", value: 4 },
      ],
      sideListTitle: "Upcoming",
      sideListItems: [
        { label: "9:30 AM", value: "Discovery call - Mason Street Hospitality" },
        { label: "11:00 AM", value: "Website review - Harbor Bistro" },
        { label: "2:30 PM", value: "Launch handoff - Northline Group" },
      ],
      lowerPanels: [
        {
          title: "Booking Page",
          items: [
            { label: "/book", value: "Ready" },
            { label: "Intake form", value: "Connected" },
            { label: "Calendar sync", value: "Healthy" },
          ],
        },
        {
          title: "Open Holds",
          items: [
            { label: "Friday 3:30 PM", value: "Pending confirmation" },
            { label: "Tuesday 1:00 PM", value: "Reschedule option" },
          ],
        },
      ],
    },
  },
  {
    id: "operations-dashboard",
    title: "Operations Dashboard",
    shortLabel: "Dashboard",
    category: "Reporting system",
    heroTabLabel: "Operations Dashboard",
    heroCaption:
      "Surface the KPIs, operational bottlenecks, and team updates that help owners make decisions without digging.",
    destination: {
      status: "coming-soon",
      availabilityLabel: "Coming soon",
      link: null,
    },
    previewCard: {
      title: "Operational visibility",
      useCase: "Turn fragmented reporting into one dashboard teams can review every week.",
      outcome: "Give operators a single view of revenue, workload, and service health.",
    },
    routeCard: {
      summary:
        "An operations layer for teams that need live signals, simpler reporting, and cleaner weekly reviews.",
      highlights: [
        "KPI rollups that are easier to scan than spreadsheet exports.",
        "Flexible enough for hospitality, service, and internal-tool contexts.",
        "Pairs naturally with automation and data-intelligence work.",
      ],
      availabilityNote: "This concept is queued as a coming-soon demo while live sample data is prepared.",
    },
    heroPreview: {
      appName: "Yoji Ops",
      heading: "Weekly operations snapshot",
      summary: "Revenue, throughput, and service signals in one review layer.",
      metrics: [
        { label: "Weekly Revenue", value: "$84.2k", trend: "up", delta: "11% above last week" },
        { label: "Open Workflows", value: "6", trend: "down", delta: "2 fewer blockers" },
        { label: "Reporting Lag", value: "0.8 days", trend: "down", delta: "Now near real time" },
      ],
      chartTitle: "Weekly Performance",
      chartSeries: [
        { label: "Week 1", value: 62 },
        { label: "Week 2", value: 68 },
        { label: "Week 3", value: 71 },
        { label: "Week 4", value: 84 },
      ],
      sideListTitle: "Key Signals",
      sideListItems: [
        { label: "Top channel", value: "Direct bookings" },
        { label: "Slowest handoff", value: "Manual vendor follow-up" },
        { label: "Fastest win", value: "Auto-generated shift summary" },
      ],
      lowerPanels: [
        {
          title: "Upcoming Reviews",
          items: [
            { label: "Ops sync", value: "Monday 9:00 AM" },
            { label: "Finance recap", value: "Wednesday 1:30 PM" },
          ],
        },
        {
          title: "Automation Queue",
          items: [
            { label: "Reporting export", value: "Ready" },
            { label: "Lead digest", value: "Scheduled for 5:00 PM" },
          ],
        },
      ],
    },
  },
] satisfies readonly DemoExperience[];
