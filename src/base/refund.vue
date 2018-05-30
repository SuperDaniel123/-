<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <p class="remark">温馨提示：退款钱请务必联系客服，否则退款失败</p>
            <van-cell-group>
                <van-field :value="orderNum" label="订单编号：" disabled/>
                <van-cell title="退款原因：" is-link :value="cause" @click="show = true" />
                <van-field v-model="express" label="快递公司："  required placeholder="请输入快递公司"/>
                <van-field v-model="expressNum" label="快递单号："  required placeholder="请输入快递单号"/>
                <van-field v-model="explain" label="退款说明" type="textarea" placeholder="退款说明(选填)"  rows="1" autosize />
            </van-cell-group>
            <div class="agree"><van-checkbox v-model="checked">我已阅读并同意</van-checkbox><span @click="deal=true">《退款协议》</span></div>
            
        </div>
        <van-popup v-model="show" position="bottom" >
            <van-picker show-toolbar title="标题" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
        </van-popup>

        <!--右侧协议-->
        <van-popup v-model="deal " position="right">
            <div class="dealBox">
                <i class="fa fa-angle-left fa-2x" @click="deal=false"></i>
                <p>
                    支持7天无理甶退货的情况及要求：<br>
                    1.商品质量问题；<br>
                    2.商品溢漏损失缺发；<br>
                    3.商品完好无拆封，相关附件齐全：<br>
                     •商品外包装完整，无拆封，相关附(配)件齐全；“外包 装”是指：生产厂商原包装；<br>
                     •商品表面无划痕、无磨(破)损、无磕碰、无使用、无 拆卸等痕迹；<br>
                     •防伪标识、标签或其他防伪措施(若有)未刮开、撕 损、修改及改动、唯一三包卡(若有)不能缺失或者撕 损；<br>
                     •如有赠品，也必须将赠品一并退回；<br>
                     •请务必将商品的内带附件、保修卡、说明书、发票、检测报告(针对需出示的商品)等随同商品一起退回。<br>
                     退货退款金额说明：<br>
                     1.若订单整单使用在线现金支付，退款时将按原支付路径退回。<br>
                     2.若订单使用在线现金、代金券和余额支付(仅支持爱车汇店主)，部分退货退款时，代金券不退还。<br>
                     3.操作退款后，款项会在7天内返回原支付方式，用户可在订单明细里查询退款详情。<br>
                     4.退款完成后，商品的佣金将会对应被扣除，用户可在提成明细查询详情。<br>
                </p>
            </div>
        </van-popup>
        <div class="btn"><van-button type="primary" size="large" @click="applyRefund">提交</van-button></div>
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
        ...mapGetters(['createOrder','verify']),
    },
    data(){
        return{
            headline:'申请退款',
            orderNum:this.$route.params.order,
            show:false,
            columns: [
                '不喜欢/效果不好', 
                '商品功能缺失或者故障', 
                '质量问题', 
                '材质成分含量/面料/皮质不符', 
                '尺寸不符',
                '做工粗糙/有瑕疵',
                '颜色/款式/图案与描述不符',
                '卖家发错货',
                '假冒商品',
                '商品破损/变形/生锈/掉漆',
                '其他'
                ],
            //退货原因
            cause:'',
            
            //快递公司
            express:'',
            //快递单号
            expressNum:'',
            //退款说明
            explain:'',

            //同意按钮
            checked:true,

            //协议开关
            deal:false

        }
    },
    methods:{
        ...mapMutations({
            orderS:'CREATEORDER'
        }),
        onCancel(){this.show = false},
        onConfirm(value,index){
            this.show = false
            this.cause = value
        },
        applyRefund(){
            if(!this.checked){
                this.$toast('请阅读或同意协议')
                return
            }
            if(this.cause == "" || this.express == "" || this.expressNum == ""){
                this.$toast('资料不能为空')
                return
            }
            let opt = {
                actionType:'refundOrder',
                orders_number:this.orderNum,
                refund_reason:this.cause,
                courier_company:this.express,
                courier_number:this.expressNum
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/refund/applyRefund','post',obj).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    this.$toast('申请退款成功')
                    let des = this.createOrder
                    des.orders_status = 7;
                    this.orderS(obj)
                    this.$router.goBack()
                    return;
                }
                this.$toast(data.ResultCD)
            })

        }

    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.remark{
    color:@red;
    font-size:12px;
    text-align: center;
    line-height: 2rem;
}
.agree{
    padding:1rem;
    span{
        line-height: 20px;
        font-size:12px;
        color:@org;
    }
}
.van-checkbox{
    float: left;
}
.van-popup--right{
    width:100%;
    height:100%;
}
.dealBox{
    padding:1rem;
    p{  
        margin-top:1rem;
        line-height: 1.7rem;
        font-size:1rem;
    }
}
.btn{
    margin:1rem;
}
.van-button--primary{
    background-color: @org;
    border: 1px solid @org;
}
</style>
