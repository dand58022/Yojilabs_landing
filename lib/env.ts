import type {
  AbsoluteUrl,
  DeploymentStage,
  MarketingRouteBase,
  MaybeAbsoluteUrl,
  SiteUrlConfig,
} from "@/types/site";

const DEFAULT_SITE_URL: AbsoluteUrl = "http://localhost:3000";
const DEFAULT_PANTRY_APP_URL: AbsoluteUrl =
  "https://pantry.yojilabs.com/login?redirect_url=https%3A%2F%2Fpantry.yojilabs.com%2Fdashboard";
const DEFAULT_OG_IMAGE_PATH = "/brand/og-placeholder.png";

function readEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();

  return value ? value : undefined;
}

function ensureAbsoluteUrl(value: string, label: string): AbsoluteUrl {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid absolute URL. Received: ${value}`);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`${label} must start with http:// or https://. Received: ${value}`);
  }

  return parsed.toString() as AbsoluteUrl;
}

function readAbsoluteUrl(key: string, fallback: AbsoluteUrl): AbsoluteUrl {
  const value = readEnv(key);

  return value ? ensureAbsoluteUrl(value, key) : fallback;
}

function readOptionalAbsoluteUrl(key: string): MaybeAbsoluteUrl {
  const value = readEnv(key);

  return value ? ensureAbsoluteUrl(value, key) : null;
}

function normalizeMarketingRouteBase(value: string, label: string): MarketingRouteBase {
  if (!value.startsWith("/")) {
    throw new Error(`${label} must start with "/". Received: ${value}`);
  }

  const trimmed = value.replace(/\/+$/, "");

  return (trimmed === "" ? "/" : trimmed) as MarketingRouteBase;
}

function readMarketingRouteBase(
  key: string,
  fallback: MarketingRouteBase = "/",
): MarketingRouteBase {
  const value = readEnv(key);

  return value ? normalizeMarketingRouteBase(value, key) : fallback;
}

function resolveSiteUrl(): AbsoluteUrl {
  const explicit = readEnv("NEXT_PUBLIC_SITE_URL");

  if (explicit) {
    return ensureAbsoluteUrl(explicit, "NEXT_PUBLIC_SITE_URL");
  }

  // On Vercel, fall back to the deployment's own host so canonical/OG/sitemap
  // URLs are never "localhost" on a preview or an un-configured production build.
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? readEnv("VERCEL_PROJECT_PRODUCTION_URL")
      : readEnv("VERCEL_BRANCH_URL") ?? readEnv("VERCEL_URL");

  if (vercelHost) {
    return ensureAbsoluteUrl(`https://${vercelHost}`, "VERCEL_URL");
  }

  return DEFAULT_SITE_URL;
}

const siteUrl = resolveSiteUrl();
const explicitStage = readEnv("NEXT_PUBLIC_DEPLOYMENT_STAGE");

function getDeploymentStage(siteUrlValue: AbsoluteUrl): DeploymentStage {
  if (explicitStage === "local" || explicitStage === "preview" || explicitStage === "production") {
    return explicitStage;
  }

  const host = new URL(siteUrlValue).hostname;

  if (host === "localhost" || host === "127.0.0.1") {
    return "local";
  }

  if (process.env.VERCEL_ENV === "production") {
    return "production";
  }

  if (process.env.VERCEL_ENV === "preview") {
    return "preview";
  }

  if (process.env.NODE_ENV === "production") {
    return "preview";
  }

  return "local";
}

const deploymentStage = getDeploymentStage(siteUrl);

export const env: SiteUrlConfig = {
  siteUrl,
  canonicalUrl: readAbsoluteUrl("NEXT_PUBLIC_CANONICAL_URL", siteUrl),
  ogImageUrl: readAbsoluteUrl(
    "NEXT_PUBLIC_OG_IMAGE_URL",
    new URL(DEFAULT_OG_IMAGE_PATH, siteUrl).toString() as AbsoluteUrl,
  ),
  marketingRouteBase: readMarketingRouteBase("NEXT_PUBLIC_MARKETING_ROUTE_BASE"),
  externalApps: {
    pantryApp: readAbsoluteUrl("NEXT_PUBLIC_PANTRY_APP_URL", DEFAULT_PANTRY_APP_URL),
    kitchenInventoryDemo: readAbsoluteUrl(
      "NEXT_PUBLIC_KITCHEN_INVENTORY_DEMO_URL",
      DEFAULT_PANTRY_APP_URL,
    ),
    bookingsWebsiteDemo: readOptionalAbsoluteUrl("NEXT_PUBLIC_BOOKINGS_DEMO_URL"),
    operationsDashboardDemo: readOptionalAbsoluteUrl(
      "NEXT_PUBLIC_OPERATIONS_DASHBOARD_DEMO_URL",
    ),
  },
  contactEndpoints: {
    generalContact: readOptionalAbsoluteUrl("NEXT_PUBLIC_CONTACT_ENDPOINT"),
    projectIntake: readOptionalAbsoluteUrl("NEXT_PUBLIC_PROJECT_INTAKE_ENDPOINT"),
    bookingRequest: readOptionalAbsoluteUrl("NEXT_PUBLIC_BOOKING_ENDPOINT"),
  },
  integrations: {
    calLink: readEnv("NEXT_PUBLIC_CAL_LINK") ?? null,
    turnstileSiteKey: readEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY") ?? null,
    pantryTourUrl: readOptionalAbsoluteUrl("NEXT_PUBLIC_PANTRY_TOUR_URL"),
  },
};

export const seoEnv = {
  deploymentStage,
  allowIndexing: deploymentStage === "production",
} as const;
