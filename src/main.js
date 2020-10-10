import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

const whiteList = ['/login']
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(store.getters.token){
    if(to.path == '/login'){
      next({path:'/'})
    }else{
      if(store.getters. permission_routes.length==0){
      // if(store.getters.roles.length==0){
      // if(!store.getters.roles){//判断当前用户是否已经拉取完user_info信息
        store.dispatch('user/getInfo').then(res=>{//拉取info
          store.dispatch('generateRoutes',res.roles).then((res)=>{//生成可访问的路由表
            router.addRoutes(store.getters.addRoutes)
            // next({...to,replace:true})//hack方法  确保addRoutes已完成，set the replace:true so the navigation will not leave a history record
            next()
          })
        }).catch(err=>{
          console.log(err)
        });
      }else{
        next()//当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的页面会自动进入404页面
      }
    }
  }else{
    if(whiteList.indexOf(to.path) !== -1){//不在免登录白名单
      next()
    }else{
      next('/login');//否则全部重定向到登录页
    }
  }
})




new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
