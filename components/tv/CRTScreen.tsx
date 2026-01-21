"use client";

import { useEffect, useMemo, useState } from "react";

type ImageContent = {
  id: number;
  name: string;
  url: string;
  signal: string;
};

type VideoContent = {
  id: number;
  name: string;
  videoId: string;
  signal: string;
};

type CRTScreenProps = {
  content: ImageContent | VideoContent;
  mode: "image" | "video";
};

function isVideo(content: any): content is VideoContent {
  return typeof content?.videoId === "string";
}

export function CRTScreen({ content, mode }: CRTScreenProps) {
  // ✅ numeric opacity for smoother & more controlled fading
  const [noiseOpacity, setNoiseOpacity] = useState(0);

  useEffect(() => {
    // ✅ Step 1: full static burst
    setNoiseOpacity(1);

    // ✅ Step 2: start fading to a lighter static
    const t1 = setTimeout(() => {
      setNoiseOpacity(0.35);
    }, 140);

    // ✅ Step 3: fade out completely
    const t2 = setTimeout(() => {
      setNoiseOpacity(0);
    }, 270);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [mode, (content as any)?.id]);

  const label = content?.name || "UNKNOWN";

  const imageUrl = useMemo(() => {
    if (mode !== "image") return "";
    if (isVideo(content)) return "";
    return content.url;
  }, [content, mode]);

  return (
    <div
      style={{
        width: "640px",
        height: "500px",
        borderRadius: "32px",
        background: "radial-gradient(circle at 30% 20%, #222, #050505 70%)",
        border: "6px solid rgba(0,0,0,0.7)",
        boxShadow:
          "inset 0 0 30px rgba(0,0,0,0.9), 0 12px 28px rgba(0,0,0,0.7)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ✅ Media Layer */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {mode === "video" && isVideo(content) ? (
          <iframe
            key={content.videoId}
            src={`https://www.youtube.com/embed/${content.videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
            title={label}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              filter: "brightness(0.95) contrast(1.1) saturate(1.05)",
            }}
          />
        ) : imageUrl ? (
          <img
            key={imageUrl}
            src={imageUrl}
            alt={label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "brightness(0.95) contrast(1.12) saturate(1.12)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "black",
              display: "grid",
              placeItems: "center",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "monospace",
              letterSpacing: "0.2em",
            }}
          >
            NO SIGNAL
          </div>
        )}
      </div>

      {/* ✅ Noise overlay (single burst look) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          opacity: noiseOpacity,
          transition: "opacity 120ms ease-out",
          pointerEvents: "none",
          backgroundImage: "url('/images/gallery/tv-noise.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
          filter: "contrast(1.25) brightness(1.15)",
        }}
      />

      {/* ✅ Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
          background:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.16), rgba(0,0,0,0.16) 1px, rgba(0,0,0,0) 3px)",
          opacity: 0.35,
        }}
      />

      {/* ✅ Glass reflection */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 11,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 40%)",
          opacity: 0.35,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
