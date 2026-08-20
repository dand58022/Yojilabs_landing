import { expect, test } from "@playwright/test";

test("homepage renders key sections and hero demo switching works", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Software built around your business." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Systems that power your business." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Small team. Big focus." }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Client Scheduling" }).click();
  await expect(
    page.getByText(
      "Keep bookings, confirmations, availability, and client context inside one scheduling workflow.",
    ),
  ).toBeVisible();

  await page.getByRole("button", { name: "Operations Dashboard" }).click();
  await expect(
    page.getByText(
      "Surface the KPIs, operational bottlenecks, and team updates that help owners make decisions without digging.",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Start a Project" }).first(),
  ).toHaveAttribute("href", "/start-a-project");
  await expect(
    page.getByRole("link", { name: "Explore Demos" }).first(),
  ).toHaveAttribute("href", "/#demos");
});

test("general contact form reaches mocked success state", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Name").last().fill("Dana");
  await page.getByLabel("Email").last().fill("dana@example.com");
  await page.getByLabel("Subject").fill("New workflow request");
  await page.getByLabel("Message").fill("We need help tightening our inventory and reporting flow.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Message received")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send another message" })).toBeVisible();
  await expect(
    page.getByText(
      "Your message was received in localhost mode. We typically reply within 1–2 business days.",
    ),
  ).toBeVisible();
});
