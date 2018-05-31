<template>
    <div>
        <div class="userTop clearfix">
            <img src="@/common/images/userhead.png" />
            <div class="ninc" v-if="setMID != ''">
                <p>昵称：{{setMID.name}}</p>
                <span>{{setMID.account}}</span>
            </div>
            <div class="ninc" v-if="setMID == ''">
                <p @click="goLogin">点击登录</p>
            </div>
        </div>
        <div class="e-line"></div>
        <van-cell-group v-if="shopUrl != false">
            <van-cell title="我的店铺" is-link :to="shopUrl" />
            <!-- <van-cell title="爱车档案" is-link />-->
            
        </van-cell-group>
        <div class="e-line"></div>
        <van-cell-group>
            <van-cell title="我的订单" is-link to="/orderform"/>
            <van-cell title="个人信息" is-link to="/profile"/>
            <van-cell title="购物车" is-link to="/shoppingCart" />
            <van-cell title="收藏夹" is-link to="/collectionList"/>
        </van-cell-group>
        <div class="e-line"></div>
        <van-cell-group>
            <van-cell title="地址管理" is-link to="/address" />
            <!-- <van-cell title="修改密码" is-link /> -->
            <van-cell v-if="setMID != ''" title="退出登录" is-link @click="logout"/>
        </van-cell-group>
    </div>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'

export default {
    computed:{
        ...mapGetters(['setMID']),
        shopUrl(){
            if(!this.setMID){
                return false;
            }
            return this.setMID.user_grade == 1? '/storeOther' : '/asOwner'
        }
    },
    created(){
        this.getMaterial()
    },
    methods:{
        ...mapMutations({
            mid:'SET_MID'
        }),
        logout(){
            this.$toast('退出成功')
            setTimeout(()=>{
                localStorage.removeItem('MID');
                localStorage.removeItem('time')
                window.location.reload();
            },1000)
        },
        goLogin(){
            this.$router.push('/login')
        },
        getMaterial(){
            let opt = {
                user_id:this.setMID.user_id,
                account:this.setMID.account,
                OperationType:1000
            }
            this.$ajax('/index/Profile/profile','post',this.$sess('UserInfo',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    let MID = this.setMID
                    MID.user_grade = data.Data.user_grade
                    localStorage.setItem("MID",JSON.stringify(MID))
                    this.mid(MID)
                    return;
                }
                this.$toast(data.ResultCD)
            })
        },
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.userTop{
    padding:1rem 2rem;
    img{
        width:5rem;
        height:5rem;
        float: left;
        vertical-align: middle
    }
    .ninc{
        line-height: 1.8rem;
        float: left;
        margin:1rem 0 0 1rem;
        p{
            font-size:1.2rem;
        }
        span{
            font-size:1rem;
            color:@font-Sgray;
        }
    }
    
}
</style>
