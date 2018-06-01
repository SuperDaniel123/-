import * as types from "./mutation-types"

const mutations = {
    //MID
    [types.SET_MID](state,setMID){
        state.MID = setMID
    },

    //登录验证带参数
    [types.VERIFY](state,obj){
        state.verify = {
            actionType:'verify',
            session_id:obj.session_id,
            user_id:obj.user_id
        }
    },

    //确认订单
    [types.COFORDER](state,arr){
        state.ComfirmOrders = arr
    },

    //登录状态
    [types.IS_LOGIN](state,login){
        state.isLogin = login
    },

    //首页状态
    [types.INDEX_STATE](state,index){
        state.indexState = index
    },

    //编辑地址
    [types.ADDRESSEDIT](state,obj){
        state.addressEdit = obj
    },

    //生成订单
    [types.CREATEORDER](state,obj){
        state.createOrder = obj
    },

    //支付from
    [types.PAYFROM](state,str){
        state.payFrom = str
    },
    //跳转订单页状态
    [types.SKIP](state,skips){
        state.skip = skips
    },

    //活动广告
    [types.ACTIVITY](state,act){
        state.activity = act
    }

}

export default mutations