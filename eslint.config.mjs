// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import tailwindCanonicalClasses from "eslint-plugin-tailwind-canonical-classes";

export default withNuxt([
  ...tailwindCanonicalClasses.configs["flat/recommended"],
  {
    rules: {
      "tailwind-canonical-classes/tailwind-canonical-classes": [
        "warn",
        {
          cssPath: "./front/assets/css/tailwind.css",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "vue/prop-name-casing": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
]);
