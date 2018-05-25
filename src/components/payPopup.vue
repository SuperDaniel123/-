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
import {mapMutations} from 'vuex'
export default {
    props:['sum','orderNum'],
    watch:{
        "radio"(val){
            console.log(typeof val)
        }
    },
    data(){
        return{
            radio:'1'
        }
    },
    created(){

    },
    methods:{
        ...mapMutations({
            payfrom:'PAYFROM',
            verify:'VERIFY'
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
                        alert(data.Data.mweb_url)
                        window.location.href = data.Data.mweb_url
                        this.verify(JSON.parse(localStorage.getItem('MID')))
                        this.$router.push('/orderform')
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
                default:{
                    this.$toast('参数错误')
                    break;
                }
            }
        }
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
