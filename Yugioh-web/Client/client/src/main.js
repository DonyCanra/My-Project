// import './assets/main.css'

import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from 'vue3-google-login'
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(vue3GoogleLogin, {
  clientId: '388238736274-dfnk0dalmbsj9slklphjcn56impv7btm.apps.googleusercontent.com'
})

app.use(pinia);
app.use(router);

app.mount("#app");
