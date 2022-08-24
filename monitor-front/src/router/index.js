import Vue from 'vue'
import VueRouter from 'vue-router'
const Main=()=>import('../views/Main.vue')
const Home=()=>import('../views/home.vue')
const Js_error=()=>import('../views/abnormalMonitor/js_error.vue')
const Blank=()=>import('../views/abnormalMonitor/blank_error.vue')
const Api=()=>import('../views/abnormalMonitor/api_error.vue')
const Sour_error=()=>import('../views/abnormalMonitor/source_error.vue')
const Page_perf=()=>import('../views/performanceMonitor/page_performance.vue')
const Pvuv=()=>import('../views/behaviorMonitor/pvuv_behavior.vue')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/js_error',
        name: 'js_error',
        component: Js_error
      },
      {
        path: '/blank',
        name: 'blank',
        component: Blank
      },
      {
        path: '/api',
        name: 'api',
        component: Api
      },
      {
        path: '/sour_error',
        name: 'sour_error',
        component: Sour_error
      }, 
      {
        path: '/page_perf',
        name: 'page_perf',
        component: Page_perf
      },
      {
        path: '/pvuv',
        name: 'pvuv',
        component: Pvuv
      }
    ]
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  //to将要访问的路径
  //from代表从哪一个路径跳转而来
  //next放行
  // if(to.path=='/home')
  // {
    
  //   return next();
  // }
  next();
})

export default router
