<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="orderList" v-for="(item,index) in orderList" :key="index">
                <h3 class="clearfix"><img src="../common/images/userhead.png" />爱车汇<span v-text="item.is_pay == 0? '未付款':'已付款'"></span></h3>
                <li v-for="(items,indexs) in item.goods_data" :key="indexs">
                    <div @click="pushDetails(item)">
                        <van-card :title="items.goods_name" desc="衣服" :num="items.goods_quantity" :price="items.goods_money" :thumb="base + items.goods_thumbnail"  >
                        <div slot="footer">
                            <div class="sxs" v-text="orderStatus(item.orders_status)"></div>
                        </div>
                        </van-card>
                    </div>
                </li>
                <div class="button" v-if="item.is_pay != 0">
                    <span>查看物流</span>
                    <span>确认收货</span>
                </div>
                <div class="button" v-if="item.is_pay == 0">
                    <span @click="delOrder(item.orders_id)">取消订单</span>
                    <span @click="goneToPay(item.total_money,item.orders_number)">在线支付</span>
                </div>
            </ul>
        </div>
        <van-popup v-model="show" position="bottom" >
            <pay-popup :sum="payObj.sum" :orderNum="payObj.orderNum"></pay-popup>
        </van-popup>
    </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {mapGetters,mapMutations} from 'vuex'
import payPopup from '../components/payPopup'
export default {
    components:{
        iHeader,
        payPopup
    },
    computed:{
        ...mapGetters(['setMID','verify'])
    },
    created(){
        this.getOrderList()
    },
    data(){
        return{
            //域名
            base:this.$base,
            //弹窗显示
            show:false,
            headline:'我的订单',
            orderList:[],

            //支付对象
            payObj:{
                sum:0,
                orderNum:0
            }
        }
    },
    methods:{
        ...mapMutations({
            orderS:'CREATEORDER'
        }),
        getOrderList(){
            let opt = {
                Where:{
                    user_id:this.setMID.user_id
                }
            }
            let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/Goods_Orders/OrdersList','post',obj).then(res=>{
                let data = res.data
                if(data.ResultCD != 200){
                    this.$toast(data.ErrorMsg)
                    return;
                }
                this.orderList = data.Data
            })
        },
        delOrder(id){
            let r = confirm("确定删除订单?")
            if(r){
                let opt = {
                    orders_id:id
                }
                let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
                this.$ajax('/index/Goods_Orders/OrdersDel','post',obj).then(res=>{
                    let data = res.data
                    if(data.ResultCD == 200){
                        this.$toast('删除成功')
                        this.getOrderList()
                        return;
                    }
                    this.$toast(data.ResultCD)
                })
            }
        },
        orderStatus(status){
            switch(status){
                case 0 :{
                    return '未付款'
                    break;
                }
                case 1 :{
                    return '用户取消订单'
                    break;
                }
                case 2 :{
                    return '待发货'
                    break;
                }
                case 3 :{
                    return '已发货'
                    break;
                }
                case 4 :{
                    return '已收货'
                    break;
                }
                case 5:{
                    return '已评价'
                    break;
                }
            }
        },
        pushDetails(obj){
            this.orderS(obj);
            this.$router.push({
                name:'confirmOrder',
                params:{
                    first:0
                }
            })
        },
        goneToPay(sum,num){
            this.show = true;
            this.payObj.sum = sum;
            this.payObj.orderNum = num;
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.orderList{
    margin:1rem auto;
    h3{
    padding:0 1rem;
    line-height: 1.5rem;
    font-size:1.2rem;
    img{
        width:1.5rem;
        height:1.5rem;
        object-fit: cover;
        vertical-align: middle;
        margin-right:0.5rem;
    }
    span{
        color:@org;
        float:right;
        font-size:1rem;
    }
}
    li{
        padding:1rem 0;
        .bottomRim;

        .sxs{
            font-size:1rem;
            color:@org
        }
        
    }
    .button{
        text-align: right;
        margin:0.5rem 1rem 0 0;
        span{
            display: inline-block;
            margin-left: 0.5rem;
            font-size:12px;
            border:1px solid #c0c0c0;
            color:@font-Sgray;
            padding:1px 5px;
            border-radius: 5px;
        }
        span:nth-of-type(2){
            color:@org;
            border-color:@org
        }
    }
}
</style>
