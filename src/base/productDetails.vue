<template>
    <div>
        <div :class="this.style == 0? 'homeTop':'homeTop see'">
            <div class="backGone" @click="back">
                <i class="fa fa-angle-left"></i>
            </div>
            <router-link class="shopCart" to="/shoppingCart"><i class="fa fa-shopping-cart"></i></router-link>
        </div>
        <van-swipe class="banner" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in details.thumbnail" :key="index">
                <img :src="base + item.picture_path" />
            </van-swipe-item>
        </van-swipe>
        <div class="prodetails">
            <div class="top">
                <h2 class="title">{{details.goods_name}}</h2>
                <div class="amount">
                    <b>&yen;{{details.now_price}}</b>
                    <s>原价：&yen;{{details.original_price}}</s>
                    <div class="num">
                        <span @click="countNum(0)">-</span>
                        <input type="number" :value="count" min="1" max="99" />
                        <span @click="countNum(1)">+</span>
                    </div>
                </div>
                <div class="describe">
                    <span>快递：免运费</span>
                    <span>月销：{{details.sales}}</span>
                    <span>库存：{{details.inventory_total}}</span>
                </div>
            </div>
            <div class="e-line"></div>
            <ul class="genre">
                <li><b>类别：</b>{{details.cat_id}}</li>
                <li><b>服务：</b><span><i></i>包邮</span><span><i></i>爱车屋自营</span></li>
            </ul>
            <div class="e-line"></div>
            <router-link to="/comment" class="comment">
                用户评论（0）
                <span>{{details.Rating}}好评<i class="fa fa-angle-right"></i></span>
            </router-link>
            <div class="e-line"></div>
            <div class="imgList">
                <h2 class="title">商品详情</h2>
                <div v-html="details.content"></div>
            </div>
            <div style="height:50px;"></div>
            <van-goods-action>
                <van-goods-action-mini-btn icon="chat" text="客服" />
                <van-goods-action-mini-btn icon="like-o" text="收藏"  v-if="!details.is_collection" @click="Condition(true)"/>
                <van-goods-action-mini-btn icon="like" style="color:#f58125" text="收藏"  v-if="details.is_collection" @click="Condition(false)"/>
                <van-goods-action-big-btn text="加入购物车" @click="addShoppingCart(details.goods_id)" />
                <van-goods-action-big-btn text="立即购买" primary />
            </van-goods-action>
        </div>
    </div>
</template>
<script>
import iHeader from '../components/i-header'
import { mapGetters } from 'vuex'
export default {
    components:{
        iHeader
    },
    computed:{
        ...mapGetters(['setMID','verify'])
    },
    watch:{
        'scroll'(val,old){
            if(val >= 200){
                this.style = 1;
            }
            if(val < 200){
                this.style = 0;
            }
        },
    },
    created(){
        this.getDetails()
        
    },
    data(){
        return{
            //域名
            base:this.$base,
            //商品id
            goodsID:this.$route.params.goods_id,
            //滚动距离
            scroll:'',
            //滚动头部切换样式
            style:0,
            //购买数量
            count:1,

            //详情数据
            details:''
        }
    },
    methods:{
        menu() {this.scroll = document.documentElement.scrollTop || document.body.scrollTop;},
        back(){
            this.$router.goBack()
        },
        addShoppingCart(id){
            let opt ={
                user_id:this.setMID.user_id,
                goods_id:id,
                goods_quantity:this.count,
                OperationType:''
            }
            let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/Shopping_Cart/ShoppingCartOperating','post',obj).then(res=>{
                let data = res.data
                if(data.ResultCD != 200){
                    this.$toast(data.ErrorMsg)
                    return;
                }
                this.$toast('添加成功')
                
            })

        },
        countNum(id){
            //0为减，1为加
            if(!id){
                if(this.count <= 1){
                    this.$toast('最少购买1件')
                    return;
                }
                this.count -= 1
                return
            }
            this.count += 1
        },
        //获取详情
        getDetails(){
            let opt = this.setMID == "" ? {goods_id:this.goodsID} : {user_id:this.setMID.user_id, goods_id:this.goodsID}
            this.$ajax('/index/Goods/GoodsDetail','post',this.$sess('Condition',opt)).then(res=>{
                let data = res.data.Data
                this.details = data
            })
        },

        //收藏
        Condition(boolen){
            if(this.setMID == '' || !this.setMID){
                this.$toast('请先登录')
                return
            }
            if(boolen){
                let opt = {
                    user_id:this.setMID.user_id,
                    goods_id:this.goodsID
                }
                let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
                this.$ajax('/index/Goods_Collection/CollectionAdd','post',obj).then(res=>{
                    let data = res.data
                    if(data.ResultCD != 200){
                        this.$toast(data.ErrorMsg)
                        return;
                    }
                    this.$toast('收藏成功')
                    this.details.is_collection = true
                    this.details['collection_id'] = data.Data['collection_id']
                    return
                })
            }
            if(!boolen){
                let opt = {
                    collection_id:this.details.collection_id
                }
                let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
                this.$ajax('/index/Goods_Collection/CollectionCancel','post',obj).then(res=>{
                    let data = res.data
                    if(data.ResultCD != 200){
                        this.$toast(data.ErrorMsg)
                        return;
                    }
                    this.$toast('取消成功')
                    this.details.is_collection = false
                    delete this.details['collection_id']
                })
            }
        }
    },
    mounted(){
        window.addEventListener('scroll', this.menu)
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.homeTop{
    transition: all 0.3s;
    position:fixed;
    top:0;
    left: 0;
    z-index: 999;
    width:100%;
    padding:0 1rem;
    box-sizing: border-box;
    .backGone,.shopCart{
        display: block;
        background: rgba(0, 0, 0, 0.5);
        width:30px;
        height:30px;
        margin:10px 0;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        i{
            color:@white;
            font-size:16px;
        }
    }
    .shopCart{
        position: absolute;
        right: 1rem;
        top:0;
    }
    
}

.homeTop.see{
    transition: all 0.3s;
    background: @white;
}
.banner{
    .van-swipe-item{
        background: @org;
    }


}

.prodetails{
    background: @white;
    .top{
        padding:0.5rem;
        .title{
            font-size:@font1-25;
            color:@font-Lgray;
        }
        .amount{
            margin:0.5rem auto;
            line-height: 2rem;
            height:2rem;
            b{
                font-size:@font1-25;
                color:@org;
            }
            s{
                padding-left:1rem;
                font-size:12px;
                color:@font-Sgray;
            }
            .num{
                display:inline-block;
                float: right;
                color:@org;
                text-align: center;
                span{
                    float: left;
                    display:block;
                    width:2.5rem;
                    font-size:1.8rem;
                }
                input{
                    float: left;
                    font-size:1.25rem;
                    text-align: center;
                    color:@org;
                }
            }
        }
        .describe{
            display: flex;
            span{
                flex:1;
                font-size:12px;
                color:@font-Sgray;
            }
            span:nth-of-type(2){
                text-align: center;
            }
            span:nth-of-type(3){ 
                text-align: right;
            }
        }
    }
    
}
.genre{
    li{
        line-height: 3rem;
        font-size:12px;
        margin-left:0.5rem;
        .bottomRim;
        color:@font-Sgray;
        b{
            font-size:@font1;
            color:@font-Lgray;
        }
        span{
            margin-right:1rem;
            i{
                display: inline-block;
                width:4px;
                height:4px;
                background: @org;
                vertical-align: middle;
                border-radius: 50%;
                margin-right:0.2rem;
            }
        }
    }
    li:nth-last-of-type(1){
        border:none;
    }
}
.comment{
    display: block;
    line-height: 3rem;
    line-height: 3rem;
    width:100%;
    padding:0 0.5rem ;
    box-sizing: border-box;
    font-size:@font1;
    span{
        float: right;
        i{
            color:@font-Sgray;
            margin-left: 0.5rem;
        }
    }
}
.imgList{
    text-align: center;
    padding:1rem;
    .title{
        color:@org;
        font-size:@font1-25;
        margin-bottom: 1rem;
    }
    
}
</style>
