import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "./plugins/i18n";
import routes from "./routes";
import vuetify from "./plugins/vuetify";
import "vue-global-api/ref";
import "vue-global-api/reactive";
import "vue-global-api/computed";
import "vue-global-api/watch";
import "vue-global-api/watchEffect";
import "vue-global-api/onMounted";

const app = createApp(App);
app.use(createPinia());
app.use(routes);
app.use(i18n);
app.use(vuetify);

app.mount("#app");
