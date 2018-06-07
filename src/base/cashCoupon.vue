<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="couponList">
                <li v-if="list.length == 0" style="text-align: center">目前没有代金券</li>
                <li v-for="(item,index) in list" :key="index">
                    <img src="../common/images/coupon.png"/>
                    <div class="text">
                        <h2 v-text="item.coupon_description"></h2>
                        <time>有效期：{{item.overdue_time == null ? '永久':'至'+item.overdue_time}}</time>
                    </div>
                    <div class="cash">&yen;{{item.coupon_money}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import { mapGetters} from 'vuex'
export default {
    components:{
        iHeader
    },
    data(){
        return{
            headline:'代金券',
            list:[]
        }
    },
    computed:{
        ...mapGetters(['setMID','verify'])
    },
    created(){
        this.getCashList()
    },
    methods:{
        getCashList(){
            let opt ={
                actionType:'userCouponInfo',
                user_id:this.setMID.user_id
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/coupon/couponInfo','post',obj).then(res=>{
                let data = res.data
                if(data.ResultCD != 200){
                    this.$toast(data.ErrorMsg)
                    return;
                }
                this.list = data.Data
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.couponList{
    padding:1rem;
    li{
        position: relative;
        margin-bottom: 1rem;
        div.text{
            position: absolute;
            color:#fff;
            top:20%;
            left:25%;
            width:70%;
            line-height: 1.5rem;
            h2{
                font-size:1rem;
                font-weight:700;
            }
            time{
                font-size:12px;
            }
        }
        
        div.cash{
            position: absolute;
            bottom:1.2rem;
            right:1.2rem;
            font-size:1.8rem;
            color:#fff;
        }
    }
}
</style>
