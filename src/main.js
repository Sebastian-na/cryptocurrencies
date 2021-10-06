import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import VueChartkick from "vue-chartkick"
import "chartkick/chart.js"
import "./index.css"

createApp(App)
  .use(router)
  .use(VueChartkick)
  .mount("#app")
