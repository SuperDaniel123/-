import * as types from "./mutation-types"

const mutations = {
    //MID
    [types.SET_MID](state,setMID){
        state.MID = setMID
    },

    //登录状态
    [types.IS_LOGIN](state,login){
        state.isLogin = login
    },

    //首页状态
    [types.INDEX_STATE](state,index){
        // let timers = Date.parse(new Date())
        // if(timers >= localStorage.getItem('time')){
        //     this._vm.$toast('登录超时')
        //     sessionStorage.removeItem('MID')
        //     setTimeout(()=>{
        //         window.location.reload();
        //         return
        //     },1000)
        // }
        state.indexState = index
    },
}

export default mutations