// Card backgrounds used to be built with a string like "purple-500/2033",
// which is not valid CSS, so every tinted card silently rendered transparent.
// This turns a Tailwind class such as "bg-purple-500/20" into a real gradient.
const RGB: Record<string, string> = {
  purple: "168,85,247",
  violet: "139,92,246",
  indigo: "99,102,241",
  blue: "59,130,246",
  sky: "14,165,233",
  cyan: "6,182,212",
  emerald: "16,185,129",
  amber: "245,158,11",
  rose: "244,63,94",
  red: "239,68,68",
  pink: "236,72,153",
  fuchsia: "217,70,239",
};

export function tintBg(bgClass: string, strength = 0.12): string {
  const color = bgClass.replace("bg-", "").split("-")[0];
  const rgb = RGB[color] ?? RGB.purple;
  return `linear-gradient(145deg, rgba(${rgb},${strength}) 0%, rgba(15,10,26,0.8) 100%)`;
}
