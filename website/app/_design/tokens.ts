export const tokens = {
  light: {
    bg: "#f8f7f2",
    fg: "#1a1a1a",
    accent: "#777",
    dim: "#999",
    rule: "#c4c0b3",
  },
  dark: {
    bg: "#17181b",
    fg: "#e2dfd5",
    accent: "#9a948a",
    dim: "#787470",
    rule: "#5a5a5a",
  },
} as const;

export type Palette = (typeof tokens)["light"];
