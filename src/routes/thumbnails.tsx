import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, X } from "lucide-react";

export const Route = createFileRoute("/thumbnails")({
  head: () => ({
    meta: [
      { title: "calez — Thumbnails" },
      { name: "description", content: "Custom thumbnail design by calez, built to stop the scroll." },
      { property: "og:title", content: "calez — Thumbnails" },
      { property: "og:description", content: "Custom thumbnail design by calez." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Thumbnails,
});

const thumbnails = [
  "krafty_01.jpg",
  "krafty_02.jpg",
  "krafty_03.jpg",
  "mind_01.jpg",
  "mind_02.jpg",
  "mind_03.jpg",
  "trending_01.jpg",
  "trending_02.jpg",
  "trending_03.jpg",
];

function Thumbnails() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" className="font-display text-lg font-extrabold">
            calez<span className="text-primary">.</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to work
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-4 pb-10 pt-14 md:px-6 md:pb-14 md:pt-20">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Thumbnail design</p>
        <h1 className="mt-4 max-w-4xl font-display text-[2.65rem] font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Thumbnails that <span className="text-primary">stop the scroll</span>.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Custom thumbnails built for the click. High contrast, readable at feed size, made for creators and
          brands.
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 pb-24 md:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {thumbnails.map((name, i) => (
            <button
              key={name}
              type="button"
              onClick={() => setActive(`/thumbnails/${name}`)}
              aria-label={`View thumbnail ${i + 1}`}
              className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-card text-left"
            >
              <img
                src={`/thumbnails/${name}`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">calez — Thumbnails</p>
          <Link to="/" className="text-sm text-primary transition hover:underline">
            See the motion work →
          </Link>
        </div>
      </footer>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Thumbnail preview"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close preview"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={active}
            alt="Thumbnail preview"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}
