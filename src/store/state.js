const state = {
    //MID
    MID:JSON.parse(sessionStorage.getItem('MID'))||'',
    //登录验证带参数
    verify:sessionStorage.getItem('MID') == undefined? {} : {
        actionType:'verify',
        session_id:JSON.parse(sessionStorage.getItem('MID')).session_id,
        user_id:JSON.parse(sessionStorage.getItem('MID')).user_id
    },

    //登录状态
    isLogin:false,
    //首页状态
    indexState:0,
}

export default state