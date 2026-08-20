import { siteConfig } from "@/lib/site-config";
import type { LandingSiteContent } from "@/types/site";

const routeMap = {
  home: "/",
  demos: "/demos",
  privacy: "/privacy",
  terms: "/terms",
  startProject: "/start-a-project",
  startProjectBook: "/start-a-project/book",
  startProjectIntake: "/start-a-project/intake",
  servicesAnchor: "/#services",
  aboutContactAnchor: "/#about-contact",
} as const;

export const siteContent = {
  routeMap,
  externalReferences: {
    pantryApp: siteConfig.urls.externalApps.pantryApp,
    kitchenInventoryDemo: siteConfig.urls.externalApps.kitchenInventoryDemo,
    bookingsWebsiteDemo: siteConfig.urls.externalApps.bookingsWebsiteDemo,
    operationsDashboardDemo: siteConfig.urls.externalApps.operationsDashboardDemo,
  },
  navigation: {
    header: [
      { id: "services", label: "Services", href: routeMap.servicesAnchor },
      { id: "demos", label: "Demos", href: routeMap.demos },
      {
        id: "about-contact",
        label: "About / Contact",
        href: routeMap.aboutContactAnchor,
      },
    ],
    primaryCta: {
      label: "Start a Project",
      href: routeMap.startProject,
    },
  },
  sharedLabels: {
    bookCall: "Book a Call",
    sendProjectDetails: "Send Project Details",
    exploreDemos: "Explore Demos",
    viewServices: "View Services",
  },
  home: {
    hero: {
      eyebrow: "Custom software. Real impact.",
      title: "Software built around your business.",
      body:
        "We build custom tools, automate workflows, and create internal systems that help you run smoother, serve better, and grow with confidence.",
      primaryCta: {
        label: "Start a Project",
        href: routeMap.startProject,
      },
      secondaryCta: {
        label: "Explore Demos",
        href: routeMap.demos,
      },
      demoOrder: [
        "kitchen-inventory",
        "bookings-website",
        "operations-dashboard",
      ],
    },
    services: {
      eyebrow: "What we build",
      title: "Systems that power your business.",
      intro:
        "From public-facing websites to internal workflow tools, we build the software layer that helps teams operate with more clarity and less manual drag.",
      cards: [
        {
          id: "custom-software",
          title: "Custom Software",
          description:
            "Tailored web apps and internal tools built around your workflow instead of forcing you into someone else’s process.",
          supportingTopics: ["Websites", "Internal tools", "Client portals"],
        },
        {
          id: "automation-integrations",
          title: "Automation and Integrations",
          description:
            "Connect the tools you already use and remove repetitive manual work that slows down your team.",
          supportingTopics: ["Workflow automation", "CRM sync", "Lead routing"],
        },
        {
          id: "operations-systems",
          title: "Operations Systems",
          description:
            "Build the operational backbone for inventory, service workflows, reporting, and day-to-day team coordination.",
          supportingTopics: ["Kitchen systems", "Ops software", "Scheduling flows"],
        },
        {
          id: "data-intelligence",
          title: "Data and Intelligence",
          description:
            "Give decision-makers clearer reporting, stronger SEO + GEO support, and the data context they need to act faster.",
          supportingTopics: ["Dashboards", "SEO + GEO", "Reporting layers"],
        },
      ],
    },
    demosPreview: {
      eyebrow: "Explore demos",
      title: "A few ways YojiLabs software shows up in the real world.",
      intro:
        "Start with the strongest proof point, then expand into site-led conversion flows and broader operating dashboards.",
      demoOrder: [
        "kitchen-inventory",
        "bookings-website",
        "operations-dashboard",
      ],
      cta: {
        label: "Explore Demos",
        href: routeMap.demos,
      },
    },
    aboutContact: {
      eyebrow: "About YojiLabs",
      title: "Small team. Big focus.",
      description:
        "We partner closely with operators and business owners to design systems that solve real problems, prep better conversations, and keep momentum after launch.",
      responseNote: "We typically reply within 1–2 business days.",
      process: [
        {
          id: "discover",
          stepNumber: "01",
          title: "Discover",
          description: "We learn the workflow, the friction points, and the real business context first.",
        },
        {
          id: "prototype",
          stepNumber: "02",
          title: "Prototype",
          description: "We validate the shape of the solution early so the build stays grounded in reality.",
        },
        {
          id: "build",
          stepNumber: "03",
          title: "Build",
          description: "We turn the approved direction into software that is clean, practical, and usable.",
        },
        {
          id: "improve",
          stepNumber: "04",
          title: "Improve",
          description: "We keep refining what works and extend the system as the business evolves.",
        },
      ],
      contact: {
        email: siteConfig.contactEmail,
        formTitle: "Tell us what you are working on",
        formDescription:
          "Use the general contact form for questions, early ideas, or project context before the next step.",
      },
    },
    finalCta: {
      title: "Have a workflow that should not be manual?",
      description:
        "Start with the clearest next step and we will route the conversation from there.",
      primaryCta: {
        label: "Start a Project",
        href: routeMap.startProject,
      },
    },
  },
  startProject: {
    title: "Start your project on-site.",
    description:
      "YojiLabs is a one-stop shop for websites, operations systems, automation, and internal tools. Choose the path that fits you best: book time first, or send enough detail that the follow-up call can start from something concrete.",
    primaryAction: {
      label: "Book a Call",
      href: routeMap.startProjectBook,
    },
    secondaryAction: {
      label: "Send Project Details",
      href: routeMap.startProjectIntake,
    },
  },
  demosRoute: {
    title: "Explore the product directions we are building around.",
    description:
      "These previews show how YojiLabs software can support inventory, client conversion, and broader operational visibility.",
    preparationNote: "Fuller interactive demos are being prepared.",
    demoOrder: [
      "kitchen-inventory",
      "bookings-website",
      "operations-dashboard",
    ],
  },
  footer: {
    brandSummary:
      "Custom software, automation, websites, and operations systems for teams that want cleaner workflows and clearer momentum.",
    contactLabel: "Contact",
    email: siteConfig.contactEmail,
    linkGroups: [
      {
        title: "Company",
        links: [
          { label: "About / Contact", href: routeMap.aboutContactAnchor },
          { label: "Demos", href: routeMap.demos },
          { label: "Start a Project", href: routeMap.startProject },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Custom Software", href: routeMap.servicesAnchor },
          { label: "Automation and Integrations", href: routeMap.servicesAnchor },
          { label: "Operations Systems", href: routeMap.servicesAnchor },
          { label: "Data and Intelligence", href: routeMap.servicesAnchor },
        ],
      },
    ],
    legalLinks: [
      { label: "Privacy", href: routeMap.privacy },
      { label: "Terms", href: routeMap.terms },
    ],
  },
} satisfies LandingSiteContent;
