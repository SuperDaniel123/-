<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="orderList">
                <li>
                    <img src="../common/images/banner.jpg" />
                    <div class="orderText">
                        <h3>座式香水汽车香膏车内持久淡香创意香薰座式摆件除异味</h3>
                        <span>种类：汽车香水</span>
                        <span>数量：1</span>
                        <big>&yen;68.00</big>
                    </div>
                </li>
            </ul>
            <div class="rests">
                <div>配送方式：<span>快递 包邮</span></div>
                <div class="msg"><h4>买家留言：</h4><textarea placeholder="输入你的留言"></textarea></div>
            </div>
            <div class="e-line"></div>
            <div class="ass" @click="goneAdd">
                <p>地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址</p>
                <div class="text"><span>收件人：李某某</span><span>电话:13579246810</span></div>
                <i class="fa fa-angle-right"></i>
            </div>
            <div class="bottom">
                <input type="button" value="提交订单" />
                <p class="sum">合计:<span>&yen;0元</span></p>
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
    data(){
        return{
            headline:'确认订单'
        }
    },
    methods:{
        goneAdd(){
            this.$router.push('/address')
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
