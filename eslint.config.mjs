import pluginJs from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  { languageOptions: { globals: globals.browser } },
  { ignores: ["node_modules/*", "dist/*", "**/.*"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { rules: { "@typescript-eslint/no-explicit-any": "warn" } },
]
