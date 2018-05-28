<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-cell-group>
                <van-cell title="我的店铺" is-link value="分享我的店铺" />
            </van-cell-group>
            <ul class="storeFigure">
                <li>可提取金额：<span>7856.00元</span></li>
                <li>总额：<span>7856.00元</span></li>
            </ul>
            <div class="e-line"></div>
            <van-cell-group>
                <van-cell title="提现" is-link :to="{name:'withdrawDeposit'}"/>
                <!--type:0为提成明细，1为提现记录-->
                <van-cell title="提成明细" is-link :to="{name:'recordDetails',params:{type:0}}"/>
                <van-cell title="提现记录" is-link :to="{name:'recordDetails',params:{type:1}}"/>
                <van-cell title="我的银行卡" is-link :to="{name:'bankCard'}"/>
            </van-cell-group>
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
        return {
            headline:'我的店铺'
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.storeFigure{
    padding:1rem;
    display: flex;
    li{
        flex:1;
        text-align: center;
        font-size:12px;
        line-height: 2rem;
        color:#666;
        span{
            font-size:1.1rem;
            font-size:#333;

        }
    }
    li:nth-of-type(1){
        border-right: 1px solid @bgGray;
    }
}
</style>
