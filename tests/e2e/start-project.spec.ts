import { expect, test } from "@playwright/test";

test("start project chooser links to both subflows", async ({ page }) => {
  await page.goto("/start-a-project");

  await expect(
    page.getByRole("heading", { name: "Start your project here." }),
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
  await expect(page.getByRole("link", { name: "Explore Our Work" })).toHaveAttribute(
    "href",
    "/demos",
  );
  await expect(page.getByRole("link", { name: "View Services" })).toHaveAttribute(
    "href",
    "/#services",
  );
});

test("concept demo cards pre-fill the intake project type", async ({ page }) => {
  await page.goto("/start-a-project/intake?interest=operations-dashboard");
  await expect(page.getByLabel("What kind of project is this?")).toHaveValue(
    "operations-dashboard",
  );
});

test("api routes reject bot-fast submissions and never 500 without keys", async ({ request }) => {
  const tooFast = await request.post("/api/contact", {
    data: {
      name: "Dana",
      email: "dana@example.com",
      subject: "Hi",
      message: "Hello",
      company_website: "",
      startedAt: Date.now(),
      turnstileToken: null,
    },
  });
  expect(tooFast.status()).toBe(400);

  const honeypot = await request.post("/api/intake", {
    data: {
      name: "Bot",
      email: "bot@example.com",
      business: "Spam",
      projectNeeds: "Buy now",
      company_website: "http://spam.example",
      startedAt: Date.now() - 10_000,
      turnstileToken: null,
    },
  });
  // Honeypot trips return a quiet 200 so bots don't learn what failed.
  expect(honeypot.status()).toBe(200);

  const invalid = await request.post("/api/contact", {
    data: {
      name: "",
      email: "not-an-email",
      subject: "Hi",
      message: "Hello",
      company_website: "",
      startedAt: Date.now() - 10_000,
      turnstileToken: null,
    },
  });
  expect(invalid.status()).toBe(422);
  const body = await invalid.json();
  expect(body.fieldErrors).toMatchObject({ name: expect.any(String), email: expect.any(String) });

  const unconfigured = await request.post("/api/contact", {
    data: {
      name: "Dana",
      email: "dana@example.com",
      subject: "Hi",
      message: "Hello there",
      company_website: "",
      startedAt: Date.now() - 10_000,
      turnstileToken: null,
    },
  });
  // No RESEND_API_KEY in CI → explicit 503 with a mailto fallback, not a crash.
  expect([200, 503]).toContain(unconfigured.status());
});
