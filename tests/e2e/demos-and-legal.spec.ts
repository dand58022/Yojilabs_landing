import { expect, test } from "@playwright/test";

test("demos route renders all three demo directions", async ({ page }) => {
  await page.goto("/demos");

  await expect(
    page.getByRole("heading", {
      name: "Explore the product directions we are building around.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Kitchen Inventory" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bookings / Website" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Operations Dashboard" })).toBeVisible();
  await expect(page.getByText("Fuller interactive demos are being prepared.")).toBeVisible();
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
