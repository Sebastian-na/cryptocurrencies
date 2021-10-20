import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import VueChartkick from "vue-chartkick"
import "chartkick/chart.js"
import "./index.css"
import directive from "tooltip-directive"
const app = createApp(App)
  .use(router)
  .use(VueChartkick)
console.log(directive)
app.directive("tooltip", directive)

app.mount("#app")
