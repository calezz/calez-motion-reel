import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";

export const Route = createFileRoute("/3d")({
  head: () => ({
    meta: [
      { title: "calez — 3D" },
      { name: "description", content: "3D renders, product visuals and experimental loops by calez." },
      { property: "og:title", content: "calez — 3D" },
      { property: "og:description", content: "3D renders, product visuals and experimental loops by calez." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThreeDPage,
});

const asset = (path: string) => encodeURI(path);

const clips = [
  { src: asset("/3d/video (1).mp4"), poster: asset("/thumbs/3d-02.jpg") },
  { src: asset("/3d/video (2).mp4"), poster: asset("/thumbs/3d-03.jpg") },
  { src: asset("/3d/video (3).mp4"), poster: asset("/thumbs/3d-04.jpg") },
  { src: asset("/3d/video (4).mp4"), poster: asset("/thumbs/3d-05.jpg") },
  { src: asset("/3d/video (5).mp4"), poster: asset("/thumbs/3d-06.jpg") },
  { src: asset("/3d/video (6).mp4"), poster: asset("/thumbs/3d-07.jpg") },
  { src: asset("/3d/video (7).mp4"), poster: asset("/thumbs/3d-08.jpg") },
  { src: asset("/3d/video (8).mp4"), poster: asset("/thumbs/3d-09.jpg") },
  { src: asset("/3d/video (9).mp4"), poster: asset("/thumbs/3d-10.jpg") },
  { src: asset("/3d/video (10).mp4"), poster: asset("/thumbs/3d-11.jpg") },
  { src: asset("/3d/video (11).mp4"), poster: asset("/thumbs/3d-12.jpg") },
];

function ThreeDPage() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" className="font-display text-lg font-extrabold">
            calez<span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              to="/thumbnails"
              className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground sm:block"
            >
              Thumbnails
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-4 pb-10 pt-14 md:px-6 md:pb-14 md:pt-20">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">3D / Motion</p>
        <h1 className="mt-4 max-w-4xl font-display text-[2.65rem] font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Made in three <span className="text-primary">dimensions</span>.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Product renders, experimental loops and studies in light, texture and motion.
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 pb-24 md:px-6">
        <div className="columns-1 gap-3 sm:columns-2 md:gap-4 lg:columns-3 xl:columns-4">
          {clips.map((clip, i) => (
            <ThreeDCard
              key={clip.src}
              clip={clip}
              index={i + 1}
              playing={playingIndex === i}
              onPlay={() => setPlayingIndex(i)}
            />
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">calez — 3D</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/thumbnails" className="text-muted-foreground transition hover:text-foreground">
              Thumbnails →
            </Link>
            <Link to="/" className="text-primary transition hover:underline">
              See the motion work →
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ThreeDCard({
  clip,
  index,
  playing,
  onPlay,
}: {
  clip: { src: string; poster: string };
  index: number;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <article className="group mb-3 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card md:mb-4">
      {playing ? (
        <video
          src={clip.src}
          poster={clip.poster}
          controls
          autoPlay
          loop
          playsInline
          className="w-full bg-black"
        />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play 3D clip ${index}`}
          className="relative block w-full overflow-hidden text-left"
        >
          <img
            src={clip.poster}
            alt=""
            loading="lazy"
            className="w-full transition duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <span className="absolute left-3 top-3 text-xs font-medium tabular-nums text-white/70">
            {String(index).padStart(2, "0")}
          </span>
          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white/80 backdrop-blur">
            0:10
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            </span>
          </span>
        </button>
      )}
    </article>
  );
}
