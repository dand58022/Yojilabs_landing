import { expect, test } from "@playwright/test";

test("start project chooser links to both subflows", async ({ page }) => {
  await page.goto("/start-a-project");

  await expect(
    page.getByRole("heading", { name: "Start your project on-site." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Book a Call" }),
  ).toHaveAttribute("href", "/start-a-project/book");
  await expect(
    page.getByRole("link", { name: "Send Project Details" }),
  ).toHaveAttribute("href", "/start-a-project/intake");
});

test("mock booking flow reaches success state", async ({ page }) => {
  await page.goto("/start-a-project/book");

  await page.getByRole("button", { name: "9:30 AM" }).click();
  await page.getByLabel("Name").fill("Dana");
  await page.getByLabel("Email").fill("dana@example.com");
  await page.getByLabel("Business").fill("Yoji Bistro");
  await page.getByRole("button", { name: "Confirm mock booking" }).click();

  await expect(page.getByText("Call booked")).toBeVisible();
  await expect(
    page.getByText("This is a local placeholder for the real scheduling integration."),
  ).toBeVisible();
});

test("project intake form reaches success state and exposes the follow-up actions", async ({
  page,
}) => {
  await page.goto("/start-a-project/intake");

  await page.getByLabel("Name").fill("Dana");
  await page.getByLabel("Email").fill("dana@example.com");
  await page.getByLabel("Business").fill("Yoji Bistro");
  await page
    .getByLabel("What do you need built?")
    .fill("A better start-project funnel plus internal reporting cleanup.");
  await page.getByRole("button", { name: "Send project details" }).click();

  await expect(page.getByText("Details received")).toBeVisible();
  await expect(page.getByRole("link", { name: "Book a Call" })).toHaveAttribute(
    "href",
    "/start-a-project/book",
  );
  await expect(page.getByRole("link", { name: "Explore Demos" })).toHaveAttribute(
    "href",
    "/demos",
  );
  await expect(page.getByRole("link", { name: "View Services" })).toHaveAttribute(
    "href",
    "/#services",
  );
});
