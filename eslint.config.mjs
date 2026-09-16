import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["node_modules"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      // The exercises are deliberately imperfect. A linter that points at `any`
      // hands the candidate the first finding before they have read the code.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
