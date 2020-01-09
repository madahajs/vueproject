import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [

  //重定向
  {
    path: '/',
    redirect: '/login',
  },

  {
    path: '/login',
    component: Login
  },

  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) =>{
  //to 将要访问的路径

  //from 代表从哪个路径来的

  //next是一个函数，标识放行  next()放行  next(’/login‘)强制跳转

  if(to.path === '/login'){
      return next();
  }

  const tokenStr = window.sessionStorage.getItem('token');

  if(!tokenStr){
      return next('/login');
  }

  next();
})

export default router
