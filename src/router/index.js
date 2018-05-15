import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component:resolve => require(['@/base/rootLayer'],resolve),
      children:[
        {
          path:'/',
          name:'index',
          component:resolve => require(['@/base/index'],resolve)
        },
        {
          path:'/proList',
          name:'proList',
          component:resolve => require(['@/base/proList'],resolve)
        },
        {
          path:'/productDetails',
          name:'productDetails',
          component:resolve => require(['@/base/productDetails'],resolve)
        },
      ]
    }
  ]
})
