import { expect, test } from "@playwright/test";

test("demos route renders all three demo directions", async ({ page }) => {
  await page.goto("/demos");

  await expect(
    page.getByRole("heading", {
      name: "See the systems we build, at the fidelity they exist.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Kitchen Inventory" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Client Scheduling" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Operations Dashboard" })).toBeVisible();

  // Tiering: one interactive preview, two concepts; no dead-end copy.
  await expect(page.locator('[data-tier="interactive-preview"]')).toHaveCount(1);
  await expect(page.locator('[data-tier="concept"]')).toHaveCount(2);
  await expect(page.getByText(/coming next|being prepared|localhost/i)).toHaveCount(0);
});

test("demo cards never link to the Pantry login wall", async ({ page }) => {
  await page.goto("/demos");
  await expect(page.locator('a[href*="pantry.yojilabs.com"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Walk through the live app/ })).toHaveAttribute(
    "href",
    "/demos/kitchen-inventory",
  );
});

test("kitchen inventory demo route renders the in-page fallback without a tour URL", async ({
  page,
}) => {
  await page.goto("/demos/kitchen-inventory");
  await expect(
    page.getByRole("heading", { name: "Kitchen Inventory, as the kitchen sees it." }),
  ).toBeVisible();
  await expect(page.getByTestId("demo-tour-fallback")).toBeVisible();
  await expect(page.getByRole("link", { name: "Book a walkthrough" })).toHaveAttribute(
    "href",
    "/start-a-project/book",
  );
});

test("concept demo slugs redirect to the demos index", async ({ page }) => {
  const response = await page.request.get("/demos/operations-dashboard", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/demos");
});

test("robots and sitemap are production-aware", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  // Local/preview builds must not be indexable.
  expect(robots).toContain("Disallow: /");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/demos/kitchen-inventory");
  expect(sitemap).not.toContain("/privacy");
  expect(sitemap).not.toContain("/terms");
});

test("structured data is emitted on the home page", async ({ page }) => {
  await page.goto("/");
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = scripts.map((json) => JSON.parse(json)["@type"]);
  expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "ItemList"]));
});

test("privacy and terms placeholder routes render", async ({ page }) => {
  await page.goto("/privacy");
  await expect(
    page.getByRole("heading", { name: "Privacy details are being finalized." }),
  ).toBeVisible();

  await page.goto("/terms");
  await expect(
    page.getByRole("heading", { name: "Terms are being prepared." }),
  ).toBeVisible();
});
