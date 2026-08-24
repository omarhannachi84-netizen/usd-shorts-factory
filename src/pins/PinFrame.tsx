import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { theme } from "../theme";
import { BOTTOM_RESERVED } from "./schema";

const MARGIN = 80;

export const PinFrame: React.FC<{
  eyebrow: string;
  photo?: string;
  heavyVeil?: boolean;
  children: React.ReactNode;
}> = ({ eyebrow, photo, heavyVeil = false, children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.background }}>
      {photo ? (
        <>
          <Img
            src={staticFile(`images/${photo}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <AbsoluteFill
            style={{
              background: heavyVeil
                ? `linear-gradient(180deg, ${theme.color.background}F2 0%, ${theme.color.background}E6 55%, ${theme.color.background}FA 100%)`
                : `linear-gradient(180deg, ${theme.color.background}E6 0%, ${theme.color.background}59 45%, ${theme.color.background}F2 100%)`,
            }}
          />
        </>
      ) : (
        <AbsoluteFill
          style={{
            background: `radial-gradient(120% 80% at 50% 0%, ${theme.color.surface} 0%, ${theme.color.background} 70%)`,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: MARGIN,
          left: MARGIN,
          width: 6,
          height: 64,
          backgroundColor: theme.color.ember,
          borderRadius: 3,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: MARGIN + 14,
          left: MARGIN + 28,
          fontFamily: theme.font.display,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 3,
          color: theme.color.textMuted,
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </div>

      <AbsoluteFill
        style={{
          paddingLeft: MARGIN,
          paddingRight: MARGIN,
          paddingTop: MARGIN + 130,
          paddingBottom: BOTTOM_RESERVED + 110,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: BOTTOM_RESERVED + 34,
          left: MARGIN,
          right: MARGIN,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 34,
            height: 4,
            backgroundColor: theme.color.ember,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontFamily: theme.font.body,
            fontSize: 24,
            letterSpacing: 1.5,
            color: theme.color.textMuted,
          }}
        >
          Urban Survival District
        </div>
      </div>
    </AbsoluteFill>
  );
};
