import tseslint from "typescript-eslint";
import solid from "eslint-plugin-solid/configs/typescript";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      ...solid.languageOptions,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    ignores: ["dist/**", ".output/**", "node_modules/**"],
  }
);
