import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default {
  tabWidth: 2,
  useTabs: false,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindAttributes: ["class", "className", "/.*Class$/", "/.*-class$/"],
};
