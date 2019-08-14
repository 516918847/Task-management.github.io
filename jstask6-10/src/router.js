import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/login.vue')
    },
    {
      path:'/dad',
      name:'dad',
      component: () => import('@/views/dad-module.vue'),
      children:[
          {
            path:'/mainly',
            name:'mainly',
            component: () => import('@/components/Mainly-to.vue')
          },
          {
            path:'article',
            name:'article',
            component: () => import('@/components/article.vue')
          },
          {
            path:'newly',
            name:'newly',
            component: () => import('@/components/newly-increased.vue')
          },
          
      ]
    }
  ]
})
