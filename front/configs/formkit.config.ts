import { defineFormKitConfig } from "@formkit/vue";
import {
  createAutoAnimatePlugin,
  createAutoHeightTextareaPlugin,
} from "@formkit/addons";

import formkitTheme from "./formkit.theme";

export default defineFormKitConfig({
  plugins: [createAutoAnimatePlugin(), createAutoHeightTextareaPlugin()],

  config: {
    classes: formkitTheme,
  },
});
