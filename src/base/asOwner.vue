<template>
    <div>
        <div class="OwnerTop">
            <div class="information">
                <router-link v-if="setMID==''||!setMID" to="/login">点击登录</router-link>
                <div>
                    <span>{{setMID.name}}</span>
                </div>
            </div>
            <div class="home" @click="goneHome"><i class="fa fa-home"></i></div>
        </div>
        <div style="padding-bottom:50px" v-html="contentIMG.content"></div>
        <router-link class="btn" to="/specialPro"><van-button type="primary" size="large" >立即购买</van-button></router-link>
    </div>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'
export default {
    created(){
        this.shopkeeper()
        if(this.$route.query.user_id){
            sessionStorage.setItem('referrer',this.$route.query.user_id)
        }
        
    },
    computed:{
        ...mapGetters(['setMID']),
    },
    data(){
        return {
            contentIMG:""
        }
    },
    methods:{
        ...mapMutations({
            stated:'INDEX_STATE'
        }),
        shopkeeper(){
            let opt = {
                actionType:'shopkeeperContent'
            }
            this.$ajax('/index/goods/shopkeeper','post',this.$sess('info',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    this.contentIMG = data.Data;
                    return
                }
                this.$toast(data.ErrorMsg)
            })
        },
        goneHome(){
            this.stated(0)
            this.$router.push('/index')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.OwnerTop{
    height:40px;
    line-height: 40px;
    position: fixed;
    width:100%;
    box-sizing: border-box;
    top:0;
    left:0;
    background:rgba(0, 0, 0, 0.3);
    padding:0 1rem;
    .information{
        float: left;
        font-size:14px;
        color:#fff;
        a{
            color:#fff;
        }
    }
    .home{
        float: right;
        color:#fff;
        i{
            font-size:20px;
        }
    }
}
.btn{
    position:fixed;
    width:100%;
    bottom:0;
    left: 0;

}
.van-button--primary{
    background-color:@org;
    border-color:@org
}
</style>
