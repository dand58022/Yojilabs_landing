// Ping IndexNow (Bing, and via Bing the ChatGPT/Copilot retrieval index) with
// every URL in the live sitemap. Run after a production deploy:
//   SITE_URL=https://yojilabs.com npm run indexnow
// The key file lives at public/<key>.txt and is public by design.
const key = "c2e286479615d3580ecc9fa972ec095d";
const siteUrl = (process.env.SITE_URL ?? "https://yojilabs.com").replace(/\/$/, "");

const sitemap = await fetch(`${siteUrl}/sitemap.xml`).then((r) => r.text());
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("No URLs found in sitemap; aborting.");
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList,
  }),
});

console.log(`IndexNow ${response.status} for ${urlList.length} URLs`);
process.exit(response.ok ? 0 : 1);
