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
        //登录
        {
          path:'/login',
          name:'login',
          component:resolve => require(['@/base/login'],resolve)
        },
        //产品列表
        {
          path:'/proList/:cat?/:keyword?',
          name:'proList',
          component:resolve => require(['@/base/proList'],resolve)
        },
        //商品详情
        {
          path:'/productDetails/:goods_id',
          name:'productDetails',
          component:resolve => require(['@/base/productDetails'],resolve)
        },
        //评论
        {
          path:'/comment',
          name:'commentList',
          component:resolve => require(['@/base/commentList'],resolve)
        },
        //购物车
        {
          path:'/shoppingCart',
          name:'shoppingCart',
          component:resolve => require(['@/base/shoppingCart'],resolve)
        },
        //结算
        {
          path:'/payment',
          name:'payment',
          component:resolve => require(['@/base/payment'],resolve)
        },
        //地址管理 
        {
          path:'/address',
          name:'address',
          component:resolve => require(['@/base/address'],resolve)
        },
        //添加地址 
        {
          path:'/addressEdit',
          name:'addressEdit',
          component:resolve => require(['@/base/addressEdit'],resolve)
        },
        //订单 
        {
          path:'/orderform',
          name:'orderform',
          component:resolve => require(['@/base/orderform'],resolve)
        },
      ]
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
