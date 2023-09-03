import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login";
import Categories from "@/views/Categories";
import Register from "@/views/Register";
import Home from "@/views/Home";
import History from "@/views/History";
import Record from "@/views/Record";
import Profile from "@/views/Profile";
import Planning from "@/views/Planning";
import Detail from "@/views/Detail";
import {auth} from "@/main";

const routes = [
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: Login
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: Home
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: Categories
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: History
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: Record
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: Profile
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: Planning
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: Detail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Перевірка на наявність авторизації
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
