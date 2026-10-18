import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, AtSign, Check, Copy, Play } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "calez — Music Videos & Visuals" },
      { name: "description", content: "Music videos, lyric visuals and short-form edits for artists and labels. Selected work by calez." },
      { property: "og:title", content: "calez — Music Videos & Visuals" },
      { property: "og:description", content: "Music videos, lyric visuals and short-form edits for artists and labels." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const asset = (path: string) => encodeURI(path);

const videos = [
  { src: asset("/music videos/1.mp4"), poster: asset("/thumbs/thumb-15.jpg"), duration: "0:12" },
  { src: asset("/music videos/2.mp4"), poster: asset("/thumbs/thumb-16.jpg"), duration: "0:17" },
  { src: asset("/music videos/3.mp4"), poster: asset("/thumbs/thumb-17.jpg"), duration: "0:23" },
  { src: asset("/music videos/4.mp4"), poster: asset("/thumbs/thumb-18.jpg"), duration: "0:26" },
  { src: asset("/music videos/5.mp4"), poster: asset("/thumbs/thumb-19.jpg"), duration: "0:18" },
  { src: asset("/music videos/7.mp4"), poster: asset("/thumbs/thumb-21.jpg"), duration: "0:13" },
  { src: asset("/motion graphics/0-web.mp4"), poster: asset("/thumbs/thumb-20.jpg"), duration: "1:01" },
  {
    src: asset("/3d/video-pfp.mp4"),
    poster: asset("/thumbs/thumb-01.jpg"),
    duration: "0:10",
    overlay: asset("/pfp.png"),
  },
  {
    src: asset("/music videos/6.webm"),
    poster: asset("/thumbs/thumb-09.jpg"),
    duration: "1:08",
  },
];

const shorts = [
  { src: asset("/shorts/1.mp4"), poster: asset("/thumbs/thumb-14.jpg"), letterboxed: true },
  { src: asset("/shorts/football-web.mp4"), poster: asset("/thumbs/thumb-11.jpg") },
  { src: asset("/shorts/short1.webm"), poster: asset("/thumbs/thumb-12.jpg") },
];

function Index() {
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const shortPlayingIndex = playingKey?.startsWith("short-") ? Number(playingKey.slice(6)) : null;

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 md:px-6">
          <a href="#top" className="font-display text-lg font-extrabold">
            calez<span className="text-primary">.</span>
          </a>
          <div className="flex items-center gap-5">
            <a
              href="#contact"
              className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground sm:block"
            >
              Contact
            </a>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Available for work
            </div>
          </div>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-[1500px] px-4 pb-10 pt-14 md:px-6 md:pb-14 md:pt-20">
        <h1 className="max-w-5xl font-display text-[2.65rem] font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Visuals that <span className="text-primary">move</span> music.
        </h1>
        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Music videos, lyric visuals and short-form edits for artists and labels. Built to match your sound,
            frame by frame.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.98] md:self-auto"
          >
            Contact me
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1500px] px-4 pb-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {videos.map((video, i) => (
            <VideoTile
              key={video.src}
              video={video}
              index={i + 1}
              zoom={i === 0}
              playing={playingKey === `film-${i}`}
              onPlay={() => setPlayingKey(`film-${i}`)}
            />
          ))}
        </div>
      </section>

      <section id="shorts" className="mx-auto mt-14 max-w-[1500px] px-4 pb-20 md:mt-20 md:px-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">Shorts</h2>
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        </div>
        <ShortsFeed
          shorts={shorts}
          playingIndex={shortPlayingIndex}
          onPlayingChange={(index) => setPlayingKey(index === null ? null : `short-${index}`)}
        />
      </section>

      <footer id="contact" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-12 md:flex-row md:items-end md:justify-between md:px-6 md:py-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Find me on Discord<span className="text-primary">.</span>
            </h2>
          </div>
          <DiscordHandle />
        </div>
      </footer>
    </main>
  );
}

function DiscordHandle() {
  const [copied, setCopied] = useState(false);

  async function copyHandle() {
    try {
      await navigator.clipboard.writeText("calez");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyHandle}
      aria-label="Copy Discord handle calez"
      className="inline-flex items-center gap-3 self-start rounded-full border border-border bg-card py-2.5 pl-2.5 pr-5 text-left transition hover:border-primary/60 active:scale-[0.98] md:self-auto"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <AtSign className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Discord</span>
        <span className="block text-lg font-semibold leading-tight">calez</span>
      </span>
      <span className="ml-1 text-muted-foreground">
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
      </span>
    </button>
  );
}

function VideoTile({
  video,
  index,
  zoom,
  playing,
  onPlay,
}: {
  video: { src: string; poster: string; duration: string; overlay?: string };
  index: number;
  zoom?: boolean;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card">
      {playing ? (
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          loop
          playsInline
          className={`aspect-video w-full bg-black object-cover ${zoom ? "scale-[1.15]" : ""}`}
        />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play film ${index}`}
          className="relative block aspect-video w-full overflow-hidden text-left"
        >
          <img
            src={video.poster}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
              zoom ? "scale-[1.15] group-hover:scale-[1.2]" : "group-hover:scale-105"
            }`}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
          <span className="absolute left-4 top-3.5 text-xs font-medium tabular-nums text-white/70">
            {String(index).padStart(2, "0")}
          </span>
          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white/80 backdrop-blur">
            {video.duration}
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </span>
        </button>
      )}
      {!playing && video.overlay && (
        <img
          src={video.overlay}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-2 z-10 h-11 w-11 rounded-full border-2 border-black/70 object-cover shadow-lg"
        />
      )}
    </article>
  );
}

type Short = { src: string; poster: string; letterboxed?: boolean };

function ShortsFeed({
  shorts,
  playingIndex,
  onPlayingChange,
}: {
  shorts: Short[];
  playingIndex: number | null;
  onPlayingChange: (index: number | null) => void;
}) {
  const feedRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const feed = feedRef.current;
    if (!feed) return;
    const next = Math.round(feed.scrollTop / feed.clientHeight);
    if (playingIndex !== null && playingIndex !== next) onPlayingChange(null);
  }

  return (
    <div
      ref={feedRef}
      onScroll={handleScroll}
      className="no-scrollbar mx-auto aspect-[9/16] snap-y snap-mandatory overflow-y-auto overscroll-contain rounded-2xl border border-border bg-black"
      style={{ width: "min(400px, calc(80svh * 9 / 16), calc(100vw - 2rem))" }}
    >
      {shorts.map((short, i) => (
        <ShortTile
          key={short.src}
          short={short}
          playing={playingIndex === i}
          onToggle={() => onPlayingChange(playingIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

function ShortTile({
  short,
  playing,
  onToggle,
}: {
  short: Short;
  playing: boolean;
  onToggle: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      const attempt = video.play();
      if (attempt) attempt.catch(() => setPaused(true));
    } else {
      video.pause();
    }
  }, [playing]);

  const video = (
    <video
      ref={videoRef}
      src={short.src}
      poster={short.poster}
      loop
      playsInline
      preload="metadata"
      onClick={onToggle}
      onPlay={() => setPaused(false)}
      onPause={() => setPaused(true)}
      className={
        short.letterboxed
          ? "absolute left-0 top-1/2 w-full -translate-y-1/2 cursor-pointer object-cover"
          : "h-full w-full cursor-pointer object-cover"
      }
      style={short.letterboxed ? { height: "227%" } : undefined}
    />
  );

  return (
    <div className="relative h-full snap-start overflow-hidden bg-black">
      {short.letterboxed && (
        <img
          src={short.poster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
        />
      )}
      {short.letterboxed ? (
        <div className="absolute inset-x-0 top-1/2 aspect-[720/564] -translate-y-1/2 overflow-hidden">
          {video}
        </div>
      ) : (
        video
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
      {paused && (
        <button
          type="button"
          onClick={onToggle}
          aria-label="Play short"
          className="absolute inset-0 flex items-center justify-center bg-black/25"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
