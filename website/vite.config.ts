import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Vercel sets `VERCEL_OBSERVABILITY_CLIENT_CONFIG` as a Node env var during
// build (a JSON string with analytics scriptSrc / event+view endpoints under
// the project's obfuscated path). The @vercel/analytics SDK reads it from
// `process.env.REACT_APP_*` guarded by `typeof process !== "undefined"`, which
// fails in Vite's browser bundle. Inject it as a build-time constant so we can
// pass it via the `configString` prop and bypass the broken internal getter.
export default defineConfig({
  define: {
    __VERCEL_OBSERVABILITY_CLIENT_CONFIG__: JSON.stringify(
      process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG ?? "",
    ),
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
