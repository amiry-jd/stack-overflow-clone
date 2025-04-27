import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
   // Extending the Next.js Core Web Vitals and TypeScript configurations
   ...compat.extends("next/core-web-vitals", "next/typescript"),

   // Adding plugins and custom rules
   {
    plugins: ["prettier"], // Adding Prettier as a plugin
    rules: {
      "prettier/prettier": "warn", // Custom Prettier rule
    },
  },

];

export default eslintConfig;
