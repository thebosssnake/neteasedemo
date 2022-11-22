import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'
const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/itemMusic',
    name: 'itemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "itemMusic" */ '../views/Search.vue')
  },{
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "itemMusic" */ '../views/Login.vue')
  },
  {
    path: '/infoUser',
    name: 'infoUser',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "itemMusic" */ '../views/InfoUser.vue'),
    // beforeEnter: (to, from, next) => {
    //   if(store.state.isLogin){
    //     next()
    //   }else{next('/login')}
    // },
  },
  {
    path: '/clogin',
    name: 'Clogin',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "itemMusic" */ '../views/Clogin.vue'),
    // beforeEnter: (to, from, next) => {
    //   if(store.state.isLogin){
    //     next()
    //   }else{next('/login')}
    // },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (store.state.isLogin == false && to.path !== '/login') {
    if (to.path === '/clogin') {
      next()
    } else {
      next('/login')
    }

  } else {
    next()
  }
}, );
export default router