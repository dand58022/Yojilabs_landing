export type AbsoluteUrl = `http://${string}` | `https://${string}`;

export type AssetPath = `/${string}`;

export type DeploymentStage = "local" | "preview" | "production";

export type MarketingRouteBase = "/" | `/${string}`;

export type MaybeAbsoluteUrl = AbsoluteUrl | null;

export interface ExternalAppUrls {
  readonly pantryApp: AbsoluteUrl;
  readonly kitchenInventoryDemo: AbsoluteUrl;
  readonly bookingsWebsiteDemo: MaybeAbsoluteUrl;
  readonly operationsDashboardDemo: MaybeAbsoluteUrl;
}

export interface ContactEndpointUrls {
  readonly generalContact: MaybeAbsoluteUrl;
  readonly projectIntake: MaybeAbsoluteUrl;
  readonly bookingRequest: MaybeAbsoluteUrl;
}

export interface SiteUrlConfig {
  readonly siteUrl: AbsoluteUrl;
  readonly canonicalUrl: AbsoluteUrl;
  readonly ogImageUrl: AbsoluteUrl;
  readonly marketingRouteBase: MarketingRouteBase;
  readonly externalApps: ExternalAppUrls;
  readonly contactEndpoints: ContactEndpointUrls;
}

export interface BrandAssetPaths {
  readonly logo: AssetPath;
  readonly symbol: AssetPath;
  readonly ogImage: AssetPath;
}

export interface SiteConfig {
  readonly name: string;
  readonly titleTemplate: `%s | ${string}`;
  readonly description: string;
  readonly contactEmail: string;
  readonly deploymentStage: DeploymentStage;
  readonly allowIndexing: boolean;
  readonly brand: BrandAssetPaths;
  readonly urls: SiteUrlConfig;
}
