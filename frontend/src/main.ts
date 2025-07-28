import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
const app = createApp(App);

loadFonts();

app.use(router).use(store).use(vuetify).mount("#app");
