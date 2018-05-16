<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="orderList">
                <li>
                    <h3 class="clearfix"><img src="../common/images/userhead.jpg" />泽银名车<span>卖家待发货</span></h3>
                    <van-card title="薛之谦 T恤短袖衣服" desc="衣服" num="2" price="20000.00" :thumb="imageURL" >
                    <div slot="footer">
                        <div class="sxs">待收货</div>
                    </div>
                    </van-card>
                    <div class="button">
                        <span>查看物流</span>
                        <span>确认收货</span>
                    </div>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script>
import iHeader from '@/components/i-header'
export default {
    components:{
        iHeader
    },
    data(){
        return{
            headline:'我的订单',
            imageURL:'http://img0.imgtn.bdimg.com/it/u=2118357487,3225831999&fm=27&gp=0.jpg'
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.orderList{
    li{
        padding:1rem 0;
        .bottomRim;
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
        .sxs{
            font-size:1rem;
            color:@org
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
}
</style>
