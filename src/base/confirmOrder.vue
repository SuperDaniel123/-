<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <div class="ass">
                <p>{{orderDetail.shipping_address}}</p>
                <div class="text"><span>收件人：{{orderDetail.shipping_name}}</span><span>电话:{{orderDetail.shipping_phone}}</span></div>
                <i class="fa fa-angle-right"></i>
            </div>
            <div class="e-line"></div>
            <ul class="orderList">
                <li v-for="(item,index) in orderDetail.goods_data" :key="index">
                    <img :src="base + item.goods_thumbnail" />
                    <div class="orderText">
                        <h3 v-text="item.goods_name"></h3>
                        <span>数量：{{item.goods_quantity}}</span>
                        <big>&yen;{{+item.goods_money * +item.goods_quantity}}</big>
                    </div>
                </li>
            </ul>
            <div class="o-price">
                <p class="gray clearfix">商品总价<span>&yen;{{orderDetail.total_money}}</span></p>
                <p class="gray clearfix">运费（快递）<span>&yen;{{orderDetail.deliver_money}}</span></p>
                <p class="big clearfix">订单总价<span>&yen;{{+orderDetail.total_money + +orderDetail.deliver_money}}</span></p>
                <p class="all clearfix">需付款<span>&yen;{{+orderDetail.total_money + +orderDetail.deliver_money}}</span></p>
            </div>
            <div class="e-line"></div>
            <div class="o-price">
                <p class="gray">订单编号：{{orderDetail.orders_number}}</p>
                <p class="gray">创建时间：{{orderDetail.edittime}}</p>
            </div>
            <div class="e-line"></div>
            <van-button type="primary" size="large" class="bottonBtn" @click="show = true">立即付款</van-button>
            <!--支付弹窗-->
            <van-popup v-model="show" position="bottom" >
                <div class="titled bottomRim" style="line-height:4rem; height:4rem;"><b>支付方式</b></div>
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <!-- <van-cell clickable @click="radio = '1'">
                            <template slot="title">
                                <img class="payicon" src="../common/images/weixin.png" />
                                <span class="van-cell-text">微信支付</span>
                            </template>
                            <van-radio name="1" />
                        </van-cell> -->
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
                    <p class="all clearfix">需付款<span>&yen;{{+orderDetail.total_money + +orderDetail.deliver_money}}</span></p>
                </div>
                <van-button type="primary" size="large" class="payBtn" @click="PaymentChannels">支付</van-button>
            </van-popup>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import {mapGetters,mapMutations} from 'vuex'
export default {
    components:{
        iHeader
    },
    computed:{
        ...mapGetters(['createOrder','verify'])
    },
    data(){
        return {
            //域名
            base:this.$base,
            headline:'订单详情',
            show:false,
            radio:'1',
            orderDetail:''
        }
    },
    beforeDestroy(){
        this.orderS('')
    },
    created(){
        if(this.$route.params.first == 1){
            this.createOrders()
        }
        if(this.$route.params.first == 0){
            this.orderDetail = this.createOrder
        }
    },
    methods:{
        ...mapMutations({
            orderS:'CREATEORDER'
        }),
        //生成订单
        createOrders(){
            if(this.createOrder == '' ||!this.createOrder){
                this.$toast('没有此订单')
                this.$router.push('/')
                return;
            }
            let opt = JSON.parse(JSON.stringify(this.createOrder))
            opt.order_status = this.$route.params.status;
            let obj = Object.assign(this.$sess('OrdersInfo',opt),this.$sess('verify',this.verify))
            this.$ajax('index/Goods_Orders/ComfirmOrders','post',obj).then(res=>{
               let data = res.data.Data;
                this.orderDetail = data;
            })
        },
        PaymentChannels(){
            
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
.orderList{
    padding-left:1rem;
    li{
        padding:1rem 1rem 1rem 0;
        min-height:8rem;
        .bottomRim;
        img{
            width:8rem;
            height:8rem;
            float: left;
            object-fit: cover;
        }
        .orderText{
            padding-left:9rem;
            width:100%;
            min-height:100%;
            line-height: 1.5rem;
            box-sizing: border-box;
            h3{
                font-size:1.1rem;
            }
            span{
                display: inline-block;
                width:100%;
                color:@font-Sgray;
            }
            big{
                font-size:1.1rem;
                color:@org
            }
        }
    }
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
    p.big{
        margin-top:0.5rem;    
        font-size:1.1rem;
        color:#666666;
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
.bottonBtn{
    position: fixed;
    left: 0;
    bottom:0;
}
</style>
