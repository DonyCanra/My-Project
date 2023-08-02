// import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";
import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '388238736274-dfnk0dalmbsj9slklphjcn56impv7btm.apps.googleusercontent.com'
})

createApp(App).mount("#app");

