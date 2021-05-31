import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// import store from '../store/index';
import List from '../components/ProductList.vue';

Vue.use(VueRouter);
// const asyncRouterMap = [
//   {
//     path: '/product',
//     name: 'Product',
//     component: Home,
//     meta: {
//       title: '商品',
//       icon: 'inbox',
//       hidden: false,
//     },
//     children: [{
//       path: '/list',
//       name: 'list',
//       meta: {
//         titile: '商品',
//         icon: 'file-add',
//         hidden: false,
//       },
//       component: () => import('../components/ProductList.vue'),
//     },
//     {
//       path: '/add',
//       name: 'ProductAdd',
//       meta: {
//         title: '添加商品',
//         icon: 'file-add',
//         hidden: false,
//       },
//       component: () => import('../components/ProductAdd.vue'),
//     },
//     {
//       path: '/edit/:id',
//       name: 'ProductEdit',
//       meta: {
//         title: '编辑商品',
//         icon: 'file-add',
//         hidden: true,
//       },
//       component: () => import('../components/ProductEdit.vue'),
//     },
//     {
//       path: 'category',
//       name: 'Category',
//       meta: {
//         titile: '类目管理',
//         icon: 'project',
//         hidden: false,
//       },
//       component: () => import('../components/ProductCategory.vue'),
//     },
//     ],
//   },
// ];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../components/Index.vue'),
      },
      {
        path: '/list',
        name: 'list',
        component: List,
      },
      {
        path: '/add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          icon: 'file-add',
        },
        component: () => import('../components/ProductAdd.vue'),
      },
      {
        path: '/edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          icon: 'file-add',
          hidden: true,
        },
        component: () => import('../components/ProductAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          titile: '类目管理',
          icon: 'project',
          hidden: false,
        },
        component: () => import('../components/ProductCategory.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    if (sessionStorage.username) {
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
