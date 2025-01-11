import { defineConfig } from "@solidjs/start/config";
import { configFlessner } from "@flessner/unocss-preset";
import UnoCSS from "unocss/vite";

export default defineConfig({
  vite: {
    plugins: [UnoCSS(
      configFlessner({
        loadHSL: ['background', 'foreground', 'primary']
      })
    )]
  }
});
