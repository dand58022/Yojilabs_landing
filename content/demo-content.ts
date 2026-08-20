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
      availabilityNote: "A live Pantry demo already exists and can be connected to this card later.",
    },
    heroPreview: {
      appName: "Yoji Pantry",
      heading: "Good morning, Alex",
      summary: "Here is what is happening in your kitchen today.",
      metrics: [
        {
          label: "Low Stock",
          value: "4",
          context: "Items below par",
          trend: "down",
          delta: "Needs reorder",
        },
        {
          label: "Critical",
          value: "2",
          context: "Need same-day action",
          trend: "up",
          delta: "Before dinner service",
        },
        {
          label: "Next Delivery",
          value: "11:30",
          context: "Produce arrival",
          trend: "down",
          delta: "Veritable Vegetable",
        },
      ],
      chartTitle: "Stock Consumption",
      chartSeries: [
        { label: "Mon", value: 42 },
        { label: "Tue", value: 51 },
        { label: "Wed", value: 47 },
        { label: "Thu", value: 63 },
        { label: "Fri", value: 58 },
      ],
      sideListTitle: "Priority Items",
      sideListItems: [
        {
          label: "Wagyu Beef",
          value: "2.5 kg on hand",
          detail: "Par 8 kg • Sysco",
        },
        {
          label: "Truffle Oil",
          value: "0.8 L on hand",
          detail: "Par 2 L • Baldor",
        },
        {
          label: "Atlantic Salmon",
          value: "14 lb on hand",
          detail: "Par 12 lb • Chef's Warehouse",
        },
        {
          label: "Rice",
          value: "32 lb on hand",
          detail: "Par 28 lb • Restaurant Depot",
        },
      ],
      lowerPanels: [
        {
          title: "Draft Order",
          items: [
            { label: "Supplier", value: "Sysco" },
            { label: "Wagyu Beef", value: "+5.5 kg" },
            { label: "Atlantic Salmon", value: "+10 lb" },
            { label: "Est. Total", value: "$348" },
          ],
        },
        {
          title: "Reorder Action",
          items: [
            { label: "Next step", value: "Review order" },
            { label: "Priority", value: "Before 4:00 PM" },
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
        {
          label: "Today",
          value: "5",
          context: "Bookings",
          trend: "up",
          delta: "+2 vs yesterday",
        },
        {
          label: "Confirmed",
          value: "3",
          context: "60% confirmed",
          trend: "up",
          delta: "Replies trending ahead",
        },
        {
          label: "Open Slots",
          value: "1",
          context: "This afternoon",
          trend: "neutral",
          delta: "One hold still open",
        },
        {
          label: "This Week",
          value: "12",
          context: "Bookings",
          trend: "up",
          delta: "Best day is Thursday",
        },
      ],
      chartTitle: "Weekly Planner",
      chartSeries: [
        { label: "Mon", value: 4 },
        { label: "Tue", value: 6 },
        { label: "Wed", value: 3 },
        { label: "Thu", value: 7 },
        { label: "Fri", value: 5 },
      ],
      sideListTitle: "Upcoming",
      sideListItems: [
        {
          label: "9:30 AM",
          value: "Discovery Call",
          detail: "Juniper Hospitality",
        },
        {
          label: "11:00 AM",
          value: "Website Review",
          detail: "Harbor Bistro",
        },
        {
          label: "2:30 PM",
          value: "Launch Handoff",
          detail: "Northline Group",
        },
      ],
      lowerPanels: [
        {
          title: "Booking Page",
          items: [
            { label: "/book", value: "Live draft" },
            { label: "Auto confirmation", value: "Enabled" },
            { label: "Calendar sync", value: "Healthy" },
          ],
        },
        {
          title: "Booking Health",
          items: [
            { label: "Confirmation rate", value: "86%" },
            { label: "Avg. lead time", value: "3.4 days" },
            { label: "Open holds", value: "2" },
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
        {
          label: "Weekly Revenue",
          value: "$84.2k",
          context: "Across 7 days",
          trend: "up",
          delta: "+11.4% vs last week",
        },
        {
          label: "Open Workflows",
          value: "6",
          context: "Need owner review",
          trend: "down",
          delta: "2 fewer blockers",
        },
        {
          label: "Reporting Lag",
          value: "0.8 days",
          context: "Near-real-time",
          trend: "down",
          delta: "Warehouse sync healthy",
        },
        {
          label: "Automation Success",
          value: "96.4%",
          context: "Past 7 days",
          trend: "up",
          delta: "2 retries today",
        },
      ],
      chartTitle: "Weekly Revenue",
      chartSeries: [
        { label: "Mon", value: 12.4 },
        { label: "Tue", value: 13.1 },
        { label: "Wed", value: 11.8 },
        { label: "Thu", value: 15.6 },
        { label: "Fri", value: 17.3 },
        { label: "Sat", value: 18.9 },
        { label: "Sun", value: 14.7 },
      ],
      sideListTitle: "Executive Notes",
      sideListItems: [
        { label: "Top channel", value: "Direct booking", detail: "46% of revenue" },
        { label: "Slowest handoff", value: "Vendor follow-up", detail: "22 hr average response" },
        { label: "Fastest win", value: "Auto shift summary", detail: "Saved 4.6 hrs this week" },
      ],
      lowerPanels: [
        {
          title: "Workflow Health",
          items: [
            { label: "Completed", value: "68%" },
            { label: "In Progress", value: "22%" },
            { label: "Blocked", value: "10%" },
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
