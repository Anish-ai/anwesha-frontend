"use client";

import React from "react";

export function BrassKnob({
  rotation,
  onClick,
  active,
}: {
  rotation: number;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <div
      style={{
        border: "none",
        background: "transparent",
        padding: 0,
        margin: 0,
        outline: "none",
        display: "block",
      }}
    >
      <img
        onClick={onClick}
        src="/images/gallery/goldenknob.svg"
        alt="Knob"
        draggable={false}
        style={{
          width: "clamp(60px, 14vw, 100px)",
          height: "clamp(60px, 14vw, 100px)",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 160ms ease-out",
          cursor: "pointer",
          filter: active
            ? "drop-shadow(0 0 14px rgba(255, 210, 90, 0.45))"
            : "drop-shadow(0 0 8px rgba(0,0,0,0.35))",
        }}
      />
    </div>
  );
}
