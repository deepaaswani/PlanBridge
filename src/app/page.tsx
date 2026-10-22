export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-12 sm:px-10">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-surface p-8 sm:p-14">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary">PLANBRIDGE</p>
        <div aria-hidden="true" className="mt-8 h-1 w-12 rounded-full bg-accent" />
        <h1 className="mt-6 font-heading text-4xl leading-tight text-foreground sm:text-6xl">
          A wedding to remember.
          <br />A plan to share.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          A shared space for your family to bring the wedding together, one thoughtful step at a
          time.
        </p>
        <p className="mt-10 inline-block rounded-full border border-border bg-background px-4 py-2 text-sm text-primary">
          Coming soon
        </p>
      </div>
    </main>
  );
}
