<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="orderList">
                <li v-for="(item,index) in applyList" :key="index">
                    <img :src="base + item.thumbnail" />
                    <div class="orderText">
                        <h3 v-text="item.goods_name"></h3>
                        <span>种类：{{item.cat_id}}</span>
                        <span>数量：{{item.goods_quantity}}</span>
                        <big>&yen;{{+item.now_price * item.goods_quantity}}</big>
                    </div>
                </li>
            </ul>
            <div class="rests">
                <div>配送方式：<span>{{express == 0? '快递 包邮':'快递 自提'}}</span></div>
                <div class="msg"><h4>买家留言：</h4><textarea v-model="msg" placeholder="输入你的留言"></textarea></div>
            </div>
            <div class="e-line"></div>
            <div class="ass" @click="goneAdd" v-if="address != ''">
                <p>{{address.province+" "+address.city+" "+address.district+" "+ address.address}}</p>
                <div class="text"><span>收件人：{{address.shipping_name}}</span><span>电话:{{address.shipping_phone}}</span></div>
                <i class="fa fa-angle-right"></i>
            </div>
            <div class="ass"  v-if="address == ''" @click="goneAdd">请添加地址<i class="fa fa-angle-right"></i></div>
            <div class="bottom">
                <input type="button" value="生成订单" @click="confirmOrder"/>
                <p class="sum">合计:<span>&yen;{{this.allPay}}</span></p>
            </div>
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
        ...mapGetters(['setMID','verify','ComfirmOrders']),
        applyList(){
            return this.ComfirmOrders
        },
        allPay(){
            let ax = this.ComfirmOrders.map((element)=>{
                return +element.now_price * element.goods_quantity
            })
            let sum = 0;
            for(let i = 0; i <ax.length; i++){
                sum += +ax[i]
            }
            return sum;
        }
    },
    created(){
        if(this.ComfirmOrders.length == 0){
            this.$router.push('/')
        }
        this.artAdd()
    },
    data(){
        return{
            //域名
            base:this.$base,
            headline:'确认订单',
            //快递
            express:0,
            //留言
            msg:'',
            address:'',
            rightShow:true,
            //支付方式
            radio:'1',
            //订单数据
            OrderData:''
        }
    },
    methods:{
        ...mapMutations({
            create:'CREATEORDER'
        }),
        goneAdd(){
            this.$router.push('/address')
        },
        artAdd(){
            let opt = {
                actionType:'addressList',
                user_id:this.setMID.user_id
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/shopping_address/addressList','post',obj).then(res=>{
                let data = res.data;
                for(let i = 0; i<data.Data.length; i++){
                    let temp = data.Data[i]
                    if(temp.defaultAddress == 1){  
                        this.address = temp
                        return;
                    }
                }
                
            })
        },
        confirmOrder(){
            this.rightShow = true
            if(this.OrderData != ''){
                return;
            }
            if(this.address == ''){
                this.$toast('请填写地址')
                return
            }
            let goodsData = []
            for(let i = 0; i < this.ComfirmOrders.length; i++){
                let temp = this.ComfirmOrders[i]
                let objs = {}
                objs.goods_id = temp.goods_id
                objs.goods_name = temp.goods_name
                objs.goods_quantity = temp.goods_quantity
                objs.goods_money = +temp.now_price * +temp.goods_quantity
                objs.goods_thumbnail = temp.thumbnail
                objs.cat_id = temp.cat_id
                objs.now_price = temp.now_price
                goodsData.push(objs)
            }
            
            let opt = {
                user_id:this.setMID.user_id,
                order_note:this.msg,
                shipping_name:this.address.shipping_name,
                shipping_phone:this.address.shipping_phone,
                shipping_address:this.address.province+" "+this.address.city+" "+this.address.district+" "+ this.address.address,
                total_money:this.allPay,
                is_pay:0,
                goods_data:goodsData
            }
            this.create(opt)
            this.$router.push({
                name:'confirmOrder',
                params:{
                    status:0,
                    first:1
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.content{
    padding-bottom:50px;
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
.rests{
    margin:0.5rem 1rem;
    line-height: 3rem;
    span{
        float: right;
    }
    div.msg{
        display: flex;
        line-height: 1.5rem;
    }
    textarea{
        flex: 1;
        line-height:1.5rem;
        border:none;
        padding:0;
    }
    textarea::placeholder{
        color:@font-Sgray;
    }
    h4{
        width:auto;
    }
}


.van-popup--right{
    width:100%;
    height:100%;
    .rightBox{
        padding:1rem;
        .top{
            width:3rem;
            height:3rem;
            line-height: 3rem;
            text-align: center;
            i.fa{
                font-size:1.5rem;
            }
        }
    }
}
</style>
