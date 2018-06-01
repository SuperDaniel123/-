<template>
    <div>
        <div class="titled bottomRim" style="line-height:4rem; height:4rem;"><b>支付方式</b></div>
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell clickable @click="radio = '1'">
                    <template slot="title">
                        <img class="payicon" src="../common/images/weixin.png" />
                        <span class="van-cell-text">微信支付</span>
                    </template>
                    <van-radio name="1" />
                </van-cell>
                <van-cell clickable @click="radio = '2'">
                    <template slot="title">
                        <img class="payicon" src="../common/images/aliplay.png" />
                        <span class="van-cell-text">支付宝支付</span>
                    </template>
                    <van-radio name="2" />
                </van-cell>
                <van-cell clickable @click="radio = '3'">
                    <template slot="title">
                        <img class="payicon" src="../common/images/balance.png" />
                        <span class="van-cell-text">余额支付( {{counts.toFixed(2)}} )</span>
                    </template>
                    <van-radio name="3" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <div class="o-price">
            <p class="gray clearfix">订单号<span>{{this.orderNum}}</span></p>
            <p class="all clearfix">需付款<span>&yen;{{this.sum}}</span></p>
        </div>
        <van-button type="primary" size="large" class="payBtn" @click="PaymentChannels">支付</van-button>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    props:['sum','orderNum'],
    watch:{
        "radio"(val){
            console.log(typeof val)
        }
    },
    computed:{
        ...mapGetters(['setMID','verify']),
    },
    data(){
        return{
            radio:'1',
            //余额
            counts:0
        }
    },
    created(){
        this.getMaterial()
    },
    methods:{
        ...mapMutations({
            payfrom:'PAYFROM',
            skips:'SKIP'
        }),
        PaymentChannels(){
            let opt = {
                actionType:'H5payment',
                orders_number:this.orderNum
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            switch(+this.radio){
                case 1 :{
                    this.$ajax('/index/wx_pay/wxPayTrade','post',obj).then(res=>{
                        let data = res.data     
                        window.location.href = data.Data.mweb_url
                        this.verify(JSON.parse(localStorage.getItem('MID')))
                        this.skips(1)
                        this.$router.push('/')
                    })
                    break
                }
                case 2 :{
                    this.$ajax('/index/ali_pay/aliPayTrade','post',obj).then(res=>{
                        let data = res.data
                        if(data.ResultCD == 200){
                            this.payfrom(data.Data.aliPay)
                            this.$router.push('/alipay')
                        }
                    })
                    break;
                }
                case 3 :{
                    let opt1 = {
                        actionType:'payment',
                        orders_number:this.orderNum,
                        user_id:this.setMID.user_id
                    }
                    let obj1 = Object.assign(this.$sess('info',opt1),this.$sess('verify',this.verify))
                    if(this.counts < this.sum){
                        this.$toast('余额不足')
                        return;
                    }
                    this.$ajax('/index/operation/pay','post',obj1).then(res=>{
                        let data = res.data
                        if(data.ResultCD == 200){
                            this.$toast.success('支付成功');
                            setTimeout(()=>{
                                this.skips(1)
                                this.$router.push('/')
                            },1000)
                        }
                    })
                    break;
                }
                default:{
                    this.$toast('参数错误')
                    break;
                }
            }
        },
        //用户余额
        getMaterial(){
            let opt = {
                user_id:this.setMID.user_id,
                account:this.setMID.account,
                OperationType:1000
            }
            this.$ajax('/index/Profile/profile','post',this.$sess('UserInfo',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    this.counts = +data.Data.total_income
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
.payBtn{
    margin-top:4rem;
}
.payicon{
    width:2rem;
    height:2rem;
    vertical-align: bottom
}
.o-price{
    padding:0.5rem 1rem;
    p{
        span{
            float: right;
        }
    }
    p.gray{
        line-height: 1.5rem;
        font-size:12px;
        color:@font-Sgray;
    }
    p.all{
        margin-top:0.5rem;    
        font-size:1.2rem;
        color:@font-Lgray;
        span{
            color:@org;
        }
    }
}
</style>
