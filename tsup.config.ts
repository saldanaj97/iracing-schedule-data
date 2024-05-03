import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/auth/auth.ts",
    "src/car/car.ts",
    "src/constants/constants.ts",
    "src/hosted/hosted.ts",
    "src/league/league.ts",
    "src/lookup/lookup.ts",
    "src/member/member.ts",
    "src/results/results.ts",
    "src/season/season.ts",
    "src/series/series.ts",
    "src/time_attack/timeAttack.ts",
    "src/track/track.ts",
    "src/utils/*.ts",
  ],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
})
