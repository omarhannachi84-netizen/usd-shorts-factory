import React from "react";
import { theme } from "../theme";
import { PinFrame } from "./PinFrame";
import type { Pin } from "./schema";

const HeroPin: React.FC<Extract<Pin, { type: "hero" }>> = ({ eyebrow, headline, photo }) => (
  <PinFrame eyebrow={eyebrow} photo={photo}>
    <div
      style={{
        fontFamily: theme.font.display,
        fontSize: 86,
        fontWeight: 700,
        lineHeight: 1.1,
        color: theme.color.text,
        textShadow: "0 4px 24px rgba(0,0,0,0.55)",
      }}
    >
      {headline}
    </div>
  </PinFrame>
);

const ContrePin: React.FC<Extract<Pin, { type: "contre" }>> = ({ eyebrow, punch, support }) => (
  <PinFrame eyebrow={eyebrow}>
    <div
      style={{
        fontFamily: theme.font.display,
        fontSize: 104,
        fontWeight: 700,
        lineHeight: 1.05,
        color: theme.color.ember,
      }}
    >
      {punch}
    </div>
    <div
      style={{
        marginTop: 44,
        width: 90,
        height: 5,
        backgroundColor: theme.color.text,
        borderRadius: 3,
        opacity: 0.5,
      }}
    />
    <div
      style={{
        marginTop: 44,
        fontFamily: theme.font.body,
        fontSize: 42,
        lineHeight: 1.35,
        color: theme.color.text,
      }}
    >
      {support}
    </div>
  </PinFrame>
);

const ChecklistPin: React.FC<Extract<Pin, { type: "checklist" }>> = ({
  eyebrow,
  headline,
  items,
  photo,
}) => (
  <PinFrame eyebrow={eyebrow} photo={photo} heavyVeil>
    <div
      style={{
        fontFamily: theme.font.display,
        fontSize: 72,
        fontWeight: 700,
        lineHeight: 1.12,
        color: theme.color.text,
        marginBottom: 56,
      }}
    >
      {headline}
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              minWidth: 62,
              height: 62,
              borderRadius: 31,
              backgroundColor: theme.color.ember,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: theme.font.display,
              fontSize: 34,
              fontWeight: 700,
              color: theme.color.text,
            }}
          >
            {i + 1}
          </div>
          <div
            style={{
              fontFamily: theme.font.body,
              fontSize: 40,
              lineHeight: 1.25,
              color: theme.color.text,
            }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  </PinFrame>
);

const MethodePin: React.FC<Extract<Pin, { type: "methode" }>> = ({ eyebrow, pillars }) => (
  <PinFrame eyebrow={eyebrow}>
    <div
      style={{
        fontFamily: theme.font.display,
        fontSize: 78,
        fontWeight: 700,
        lineHeight: 1.1,
        color: theme.color.text,
        marginBottom: 64,
      }}
    >
      La méthode <span style={{ color: theme.color.ember }}>LMU</span>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
      {pillars.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 24 }}>
          <div style={{ minWidth: 6, backgroundColor: theme.color.ember, borderRadius: 3 }} />
          <div>
            <div
              style={{
                fontFamily: theme.font.display,
                fontSize: 46,
                fontWeight: 700,
                color: theme.color.text,
                marginBottom: 10,
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontFamily: theme.font.body,
                fontSize: 34,
                lineHeight: 1.3,
                color: theme.color.textMuted,
              }}
            >
              {p.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  </PinFrame>
);

export const PinRenderer: React.FC<Pin> = (pin) => {
  switch (pin.type) {
    case "hero":
      return <HeroPin {...pin} />;
    case "contre":
      return <ContrePin {...pin} />;
    case "checklist":
      return <ChecklistPin {...pin} />;
    case "methode":
      return <MethodePin {...pin} />;
  }
};
