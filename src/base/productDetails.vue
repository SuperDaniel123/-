<template>
    <div>
        <div :class="this.style == 0? 'homeTop':'homeTop see'">
            <div class="backGone" @click="back">
                <i class="fa fa-angle-left"></i>
            </div>
        </div>
        <van-swipe class="banner" :autoplay="3000">
            <van-swipe-item></van-swipe-item>
            <van-swipe-item></van-swipe-item>
            <van-swipe-item></van-swipe-item>
            <van-swipe-item></van-swipe-item>
        </van-swipe>
        <div class="prodetails">
            <div class="top">
                <h2 class="title">PLC行车记录仪新款迷你高清夜视车监控广角单镜头</h2>
                <div class="amount">
                    <b>&yen; 688.00</b>
                    <s>原价：&yen;999.00</s>
                    <div class="num">
                        <span @click="countNum(0)">-</span>
                        <input type="number" :value="count" min="1" max="99" />
                        <span @click="countNum(1)">+</span>
                    </div>
                </div>
                <div class="describe">
                    <span>快递：免运费</span>
                    <span>月销：25</span>
                    <span>库存：1000</span>
                </div>
            </div>
            <div class="e-line"></div>
            <ul class="genre">
                <li><b>类别：</b>汽车外饰</li>
                <li><b>服务：</b><span><i></i>包邮</span><span><i></i>爱车屋自营</span></li>
            </ul>
            <div class="e-line"></div>
            <router-link to="/comment" class="comment">
                用户评论（0）
                <span>0%好评<i class="fa fa-angle-right"></i></span>
            </router-link>
            <div class="e-line"></div>
            <div class="imgList">
                <h2 class="title">商品详情</h2>
                <img src="../common/images/banner.jpg" />
            </div>
            <div style="height:50px;"></div>
            <van-goods-action>
                <van-goods-action-mini-btn icon="chat" text="客服" />
                <van-goods-action-mini-btn icon="like-o" text="收藏"  />
                <van-goods-action-big-btn text="加入购物车"  />
                <van-goods-action-big-btn text="立即购买" primary />
            </van-goods-action>
        </div>
    </div>

</template>

<script>
import iHeader from '../components/i-header'
export default {
    components:{
        iHeader
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
    data(){
        return{
            scroll:'',
            style:0,
            count:1
        }
    },
    methods:{
        menu() {this.scroll = document.documentElement.scrollTop || document.body.scrollTop;},
        back(){
            this.$router.goBack()
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
    .backGone{
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
}

.homeTop.see{
    transition: all 0.3s;
    background: @white;
}
.banner{
    height:300px;
    .van-swipe-item:nth-of-type(1){
        background: @org;
    }
    .van-swipe-item:nth-of-type(2){
        background: @roseRed;
    }
    .van-swipe-item:nth-of-type(3){
        background: @blue;
    }
    .van-swipe-item:nth-of-type(4){
        background: @font-Lgray;
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
    img{
        max-width: 100%;
        vertical-align: middle;
    }
}
</style>
