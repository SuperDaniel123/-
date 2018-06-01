<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-steps icon="logistics" :title="company.courier_company+'('+company.courier_code +')'" :description="company.courier_number" >
                <div class="e-line"></div>
            </van-steps>
            <van-steps direction="vertical" :active="1" active-color="#f58125">
                <van-step v-for="(item,index) in logisticsData"  :key="index">
                    <h3 v-text="item.AcceptStation"></h3>
                    <p v-text="item.AcceptTime"></p>
                </van-step>
                <van-step v-if="logisticsData.length == 0">
                    <h3>暂无物流信息</h3>
                    <p v-text="myTime"></p>
                </van-step>
            </van-steps>
        </div>
    </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {mapGetters} from 'vuex'
export default {
    components:{
        iHeader
    },
    created(){
        this.getMsg()
    },
    computed:{
        ...mapGetters(['setMID','verify']),
        myTime(){
            var myDate = new Date();
            return myDate.toLocaleTimeString()
        },
    },
    data(){
        return{
            headline:'物流信息',
            orderID:this.$route.params.id,
            logisticsData:[],
            company:{
                courier_code:'',
                courier_company:'',
                courier_number:''
            },
        }
    },
    methods:{
        getMsg(){
            let opt ={
                user_id:this.setMID.user_id,
                orders_id:this.orderID
            }
            let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/Goods_Orders/OrdersDetails','post',obj).then(res=>{
                let data = res.data
                if(data.ResultCD != 200){
                    this.$toast(data.ErrorMsg)
                    return;
                }
                this.company.courier_code=data.Data.courier_code
                this.company.courier_company = data.Data.courier_company
                this.company.courier_number = data.Data.courier_number 
                if(data.Data.logistics.State == '3' && data.Data.logistics.Success){
                    this.logisticsData = data.Data.logistics.Traces.reverse()
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
</style>
