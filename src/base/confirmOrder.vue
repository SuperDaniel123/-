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
                <li v-for="(item,index) in orderDetail.goods_data" :key="index" @click="goneProDetails(item)">
                    <img :src="base + item.goods_thumbnail" />
                    <div class="orderText">
                        <h3 v-text="item.goods_name"></h3>
                        <span>数量：{{item.goods_quantity}}</span>
                        <big>&yen;{{+item.now_price * +item.goods_quantity}}</big>
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
            <div class="o-price">
                <div class="btn" v-if="orderDetail.orders_status > 1 &&orderDetail.orders_status < 7 " @click="goneRefund">退款</div>
                <div class="btn" v-if="orderDetail.orders_status == 7 ">退款中</div>
                <div class="btn" v-if="orderDetail.orders_status ==8 ">已退款</div>
            </div>
            <van-button v-if="orderDetail.orders_status == 0" type="primary" size="large" class="bottonBtn" @click="show = true">立即付款</van-button>
            <!--支付弹窗-->
            <van-popup v-model="show" position="bottom" >
                <pay-popup :sum="sum" :orderNum="orderNum"></pay-popup>
            </van-popup>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import {mapGetters,mapMutations} from 'vuex'
import payPopup from '../components/payPopup'
export default {
    components:{
        iHeader,
        payPopup
    },
    computed:{
        ...mapGetters(['createOrder','verify']),
        //支付金额
        sum(){
            return +this.orderDetail.total_money + +this.orderDetail.deliver_money
        },
        orderNum(){
            return this.orderDetail.orders_number
        }
    },
    data(){
        return {
            //域名
            base:this.$base,
            headline:'订单详情',
            show:false,
            orderDetail:''
        }
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
                console.log(this.orderDetail)
            })
        },
        goneRefund(){
            this.$router.push({
                name:'refund',
                params:{
                    order:this.orderDetail.orders_number
                }
            })
        },
        goneProDetails(item){
            this.$router.push({
                name:'productDetails',
                query:{goods_id:item.goods_id}
            })
        }
        
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';


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
    .btn{
        float: right;
        border:1px solid @org;
        width:5rem;
        line-height: 2rem;
        border-radius: 5px;
        text-align: center;
        color:@org;
        
    }
}
.bottonBtn{
    position: fixed;
    left: 0;
    bottom:0;
}
</style>
