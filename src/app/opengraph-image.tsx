import { ImageResponse } from "next/og";

// Social preview card shown when wyibe.com is shared on LinkedIn, WhatsApp, X, Slack.
export const alt = "Wyibe: Full-Stack Engineering & Agentic AI for B2B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 75% 20%, #6d28d9 0%, #2e1065 35%, #06000e 75%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, opacity: 0.85, marginBottom: 28 }}>
          Wyibe
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          Engineering Intelligence
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            backgroundImage: "linear-gradient(90deg, #a855f7, #3b82f6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          For Global Business
        </div>
        <div style={{ fontSize: 30, marginTop: 36, color: "#c4b5fd" }}>
          Full-stack web platforms and Agentic AI systems · wyibe.com
        </div>
      </div>
    ),
    size,
  );
}
