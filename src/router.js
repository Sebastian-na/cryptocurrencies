import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home"
import About from "@/views/About"
import Coin from "@/views/Coin"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/coin/:id",
    name: "Coin",
    component: Coin,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
