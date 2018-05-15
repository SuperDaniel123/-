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
            <div class="genre">
                
            </div>
            
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
</style>
