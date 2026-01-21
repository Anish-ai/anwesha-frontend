"use client";

import { useMemo, useState } from "react";
import { BrassKnob } from "./BrassKnob";
import { CRTScreen } from "./CRTScreen";

export type TVImageInput = {
  name?: string;
  url: string;
};

type TVImageContent = {
  id: number;
  name: string;
  url: string;
  signal: string;
};

type TVVideoContent = {
  id: number;
  name: string;
  videoId: string;
  signal: string;
};

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function extractYouTubeId(url: string) {
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) return match[1];

  const short = url.match(/youtu\.be\/([^?]+)/);
  if (short) return short[1];

  return url; // already video ID
}

export function VintageTV({
  images,
  youtubeLinks = [],
}: {
  images: TVImageInput[];
  youtubeLinks?: string[];
}) {
  const [mode, setMode] = useState<"image" | "video">("image");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // ✅ Shuffle images ONCE
  const tvImages: TVImageContent[] = useMemo(() => {
    const mapped = (images || []).map((img, idx) => ({
      id: idx + 1,
      name: img.name?.trim() || `CH ${String(idx + 1).padStart(2, "0")}`,
      url: img.url,
      signal: "Visual Feed",
    }));
    return shuffle(mapped);
  }, [images]);

  const tvVideos: TVVideoContent[] = useMemo(() => {
    return (youtubeLinks || []).map((link, idx) => ({
      id: idx + 1,
      name: `VIDEO ${idx + 1}`,
      videoId: extractYouTubeId(link),
      signal: "Audio/Video",
    }));
  }, [youtubeLinks]);

  const handleImageChange = () => {
    if (!tvImages.length) return;
    setMode("image");
    setCurrentImageIndex((prev) => (prev + 1) % tvImages.length);
  };

  const handleVideoChange = () => {
    if (!tvVideos.length) return;
    setMode("video");
    setCurrentVideoIndex((prev) => (prev + 1) % tvVideos.length);
  };

  const activeContent =
    mode === "image"
      ? tvImages[currentImageIndex]
      : tvVideos[currentVideoIndex];

  return (
    <div style={{ position: "relative" }}>
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          background:
            mode === "video"
              ? "radial-gradient(circle, rgba(255,100,200,0.25), transparent 70%)"
              : "radial-gradient(circle, rgba(0,255,140,0.25), transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      {/* TV Antennas */}
      <div
        style={{
          position: "absolute",
          top: "-140px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "80px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "140px",
            background: "linear-gradient(to top, #8b7355, #c0c0c0)",
            transform: "rotate(-22deg)",
            borderRadius: "3px",
          }}
        />
        <div
          style={{
            width: "4px",
            height: "140px",
            background: "linear-gradient(to top, #8b7355, #c0c0c0)",
            transform: "rotate(22deg)",
            borderRadius: "3px",
          }}
        />
      </div>

      {/* Main TV chassis */}
      <div
        style={{
          width: "960px",
          height: "680px",
          borderRadius: "52px",
          padding: "18px",
          background: "linear-gradient(135deg,#111,#050505,#111)",
          boxShadow:
            "0 30px 70px rgba(0,0,0,0.85), inset 0 2px 6px rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        {/* Brass border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "52px",
            border: "5px solid #d4af37",
            pointerEvents: "none",
            opacity: 0.9,
          }}
        />

        {/* Inner wood */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "48px",
            padding: "36px",
            background:
              "linear-gradient(135deg, #3e2723 0%, #5d4037 25%, #4e342e 50%, #3e2723 75%, #2c1810 100%)",
            position: "relative",
          }}
        >
          {/* Mode indicator */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 16,
              fontFamily: "Georgia, serif",
              fontSize: 12,
              color: "rgba(255,215,140,0.6)",
            }}
          >
            <span style={{ color: mode === "image" ? "#3cff9b" : "#666" }}>
              ● IMG
            </span>
            <span style={{ color: mode === "video" ? "#ff75d8" : "#666" }}>
              ● VID
            </span>
          </div>

          {/* Layout */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
              gap: 30,
            }}
          >
            {/* Screen */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <CRTScreen content={activeContent as any} mode={mode} />
            </div>

            {/* Knobs */}
            <div
              style={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "36px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <BrassKnob
                  rotation={currentImageIndex * 28}
                  onClick={handleImageChange}
                  active={mode === "image"}
                />
                <div
                  style={{
                    marginTop: 10,
                    color: "rgba(255,215,140,0.75)",
                    fontFamily: "Georgia, serif",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                  }}
                >
                  IMAGES
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <BrassKnob
                  rotation={currentVideoIndex * 28}
                  onClick={handleVideoChange}
                  active={mode === "video"}
                />
                <div
                  style={{
                    marginTop: 10,
                    color: "rgba(255,215,140,0.75)",
                    fontFamily: "Georgia, serif",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                  }}
                >
                  MUSIC
                </div>
              </div>
            </div>
          </div>

          {/* Footer badge */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,215,140,0.55)",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.25em",
              fontSize: 13,
            }}
          >
            RETROVIEW ◆ 1974
          </div>
        </div>
      </div>
    </div>
  );
}
