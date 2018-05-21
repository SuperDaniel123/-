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
            <div class="ass" @click="goneAdd">
                <p>{{address.province+" "+address.city+" "+address.district+" "+ address.address}}</p>
                <div class="text"><span>收件人：{{address.shipping_name}}</span><span>电话:{{address.shipping_phone}}</span></div>
                <i class="fa fa-angle-right"></i>
            </div>
            <div class="bottom">
                <input type="button" value="提交订单" />
                <p class="sum">合计:<span>&yen;{{this.allPay}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import {mapGetters} from 'vuex'
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
            address:{}
        }
    },
    methods:{
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
        }

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
.ass{
    padding:1rem 2rem 1rem 1rem;
    line-height: 1.5rem;
    position: relative;
    .bottomRim;
    p{
        font-size:@font1;
        color:#555555;
    }
    .text{
        display: flex;
        span{
            flex:1;
            color:@font-Sgray;
        }
    }
    .fa{
        position: absolute;
        font-size:1.5rem;
        top:50%;
        margin-top:-0.75rem;
        right:1rem;
        color:@font-Sgray;
    }
}

</style>
