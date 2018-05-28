import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

export default new Router({
  // mode: 'history',
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
          path:'/productDetails',
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
          //id   0为添加，1为编辑
          path:'/addressEdit/:id',
          name:'addressEdit',
          component:resolve => require(['@/base/addressEdit'],resolve)
        },
        //订单 
        {
          path:'/orderform',
          name:'orderform',
          component:resolve => require(['@/base/orderform'],resolve)
        },
        //收藏
        {
          path:'/collectionList',
          name:'collectionList',
          component:resolve => require(['@/base/collectionList'],resolve)
        },
        //生成订单
        {
          path:'/confirmOrder/:status?/:first',
          name:'confirmOrder',
          component:resolve => require(['@/base/confirmOrder'],resolve)
        },
        //搜索页
        {
          path:'/search',
          name:'search',
          component:resolve => require(['@/base/searchPage'],resolve)
        },

        //付款
        {
          path:'/alipay',
          name:'alipay',
          component:resolve => require(['@/base/alipay'],resolve)
        },
        //我的店铺
        {
          path:'/storeOther',
          name:'storeOther',
          component:resolve => require(['@/base/storeOther'],resolve)
        },
        //明细or记录
        {
          path:'/recordDetails/:type',
          name:'recordDetails',
          component:resolve => require(['@/base/recordDetails'],resolve)
        },
        //提现 
        {
          path:'/withdrawDeposit',
          name:'withdrawDeposit',
          component:resolve => require(['@/base/withdrawDeposit'],resolve)
        },
        //银行卡
        {
          path:'/bankCard',
          name:'bankCard',
          component:resolve => require(['@/base/bankCard'],resolve)
        },
        //添加银行卡
        {
          path:'/addBankCard',
          name:'addBankCard',
          component:resolve => require(['@/base/addBankCard'],resolve)
        },
      ]
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
