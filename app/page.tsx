export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 sm:px-10">
      <div className="max-w-3xl space-y-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          YojiLabs
        </p>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Landing page scaffold ready for implementation.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-text-muted">
            This Next.js App Router shell is in place so the landing experience,
            mocked routes, and brand system can be built in the next tasks
            without losing the repo&apos;s planning documents or reference assets.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold">Preserved workspace context</h2>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Planning docs remain under <code>docs/</code> and brand references
              remain under <code>YojiLabs/</code>.
            </p>
          </section>
          <section className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold">Next implementation target</h2>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Replace this placeholder with the production homepage sections,
              conversion routes, and content-driven UI described in the approved
              plan and spec.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
