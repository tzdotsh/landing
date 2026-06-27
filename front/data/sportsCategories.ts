export type SportsCategoryTile = {
  /** i18n key under sports.categories.items.{id} — label here is the EN default for editors. */
  id: string;
  label: string;
  image: string;
};

/** Sport category tiles — edit labels/images here; swap files in public/sports/. */
export const SPORTS_CATEGORY_TILES: SportsCategoryTile[] = [
  { id: "football", label: "Football", image: "/sports/football.jpg" },
  {
    id: "formula_1",
    label: "Formula 1 & Motorsport",
    image: "/sports/formula-1.jpg",
  },
  { id: "boxing_ufc", label: "Boxing & UFC", image: "/sports/boxing-ufc.jpg" },
  { id: "cricket", label: "Cricket", image: "/sports/cricket.jpg" },
  { id: "rugby", label: "Rugby", image: "/sports/rugby.jpg" },
  { id: "basketball", label: "Basketball", image: "/sports/basketball.jpg" },
  { id: "tennis", label: "Tennis", image: "/sports/tennis.jpg" },
  { id: "golf", label: "Golf", image: "/sports/golf.jpg" },
  { id: "darts", label: "Darts", image: "/sports/darts.jpg" },
  {
    id: "combat_ppv",
    label: "Combat Sports / PPV",
    image: "/sports/combat-ppv.jpg",
  },
];

export const SPORTS_HERO_IMAGE = "/sports/hero.jpg";
export const SPORTS_OG_IMAGE = "/sports/og.jpg";
