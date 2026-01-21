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
    <button
      onClick={onClick}
      type="button"
      style={{
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        outline: "none",
      }}
    >
      <img
        src="/images/gallery/goldenknob.svg"
        alt="Knob"
        draggable={false}
        style={{
          width: "86px",
          height: "86px",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 160ms ease-out",
          filter: active
            ? "drop-shadow(0 0 14px rgba(255, 210, 90, 0.45))"
            : "drop-shadow(0 0 8px rgba(0,0,0,0.35))",
        }}
      />
    </button>
  );
}
