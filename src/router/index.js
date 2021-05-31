import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect:'/classfiy',
    children:[
      {
        path:'/classfiy',
        name:'classfiy',
        component: () => import( '../views/Classfiy.vue')
       },
       {
        path:'/shopcard',
        name:'ShopCard',
        component:()=>import('../views/ShopCard.vue')
      }
    ]
  },
  
  {
    path:'/search',
    name:'Search',
    component:()=>import ('../views/Search.vue')
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
