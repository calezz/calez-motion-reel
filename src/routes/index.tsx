import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "calez — Motion Designer | Reels & Projects" },
      { name: "description", content: "Showreel and selected motion design work by calez." },
      { property: "og:title", content: "calez — Motion Designer" },
      { property: "og:description", content: "Showreel and selected motion design work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const asset = (path: string) => encodeURI(path);

const videos = [
  {
    src: asset("/music videos/After Effects Tutorial_ Lyrics Videos For Songs _ Arsacre_ 2020_6_32.mp4"),
    poster: asset("/thumbs/thumb-05.jpg"),
  },
  {
    src: asset("/music videos/How to Make CAR MUSIC Type Audio Spectrum In After Effects_11_23.mp4"),
    poster: asset("/thumbs/thumb-06.jpg"),
  },
  {
    src: asset("/music videos/How to make Easy Professional Lyrics Video in After Effects_5_23.mp4"),
    poster: asset("/thumbs/thumb-07.jpg"),
  },
  {
    src: asset("/music videos/How to make Lyrics Video in After Effects - EASY Tutorial [STAY EDIT]_5_28.mp4"),
    poster: asset("/thumbs/thumb-08.jpg"),
  },
  { src: asset("/music videos/motion-graphic-collage.webm"), poster: asset("/thumbs/thumb-09.jpg") },
  { src: asset("/music videos/variant-a.mp4"), poster: asset("/thumbs/thumb-10.jpg") },
  { src: asset("/motion graphics/motion-gfx.mp4"), poster: asset("/thumbs/thumb-03.jpg") },
  { src: asset("/motion graphics/motion-gfx1.mp4"), poster: asset("/thumbs/thumb-04.jpg") },
];

const shorts = [
  { src: asset("/shorts/short.webm"), poster: asset("/thumbs/thumb-11.jpg") },
  { src: asset("/shorts/short1.webm"), poster: asset("/thumbs/thumb-12.jpg") },
];

const videosAfterShorts = [
  { src: asset("/3d/3d.mp4"), poster: asset("/thumbs/thumb-01.jpg") },
  { src: asset("/3d/3d1.mp4"), poster: asset("/thumbs/thumb-02.jpg") },
];

function Index() {
  return (
    <main className="min-h-screen bg-background p-4">
      <header className="mx-auto max-w-6xl px-2 pb-10 pt-12 md:pb-16 md:pt-20">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Motion designer · 3D · Type</p>
        <h1 className="mt-5 font-display text-6xl font-extrabold leading-[0.9] md:text-8xl">
          calez<span className="text-primary">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          I make things that move people. Brand films, product launches, kinetic type and social cuts — built
          frame by frame. Available for collaborations worldwide.
        </p>
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="#videos" className="text-primary hover:underline">Watch the work ↓</a>
        </nav>
      </header>

      <div id="videos" className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {videos.map((v, i) => (
          <VideoCard key={v.src} video={v} zoom={i === 0} />
        ))}
      </div>

      <section className="mx-auto my-8 max-w-[420px]">
        <div className="no-scrollbar h-[85svh] snap-y snap-mandatory overflow-y-auto overscroll-contain rounded-2xl border border-border bg-black">
          {shorts.map((v) => (
            <div key={v.src} className="flex h-full snap-start items-center justify-center bg-black">
              <video
                src={v.src}
                poster={v.poster}
                controls
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {videosAfterShorts.map((v) => (
          <VideoCard key={v.src} video={v} />
        ))}
      </div>
    </main>
  );
}

function VideoCard({ video, zoom }: { video: { src: string; poster: string }; zoom?: boolean }) {
  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-border bg-card">
      <video
        src={video.src}
        poster={video.poster}
        controls
        loop
        playsInline
        preload="metadata"
        className={`block w-full ${zoom ? "scale-110" : ""}`}
      />
    </div>
  );
}
