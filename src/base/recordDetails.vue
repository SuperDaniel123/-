<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-cell-group>
                <van-cell :title="typeDec">
                    <span class="pay">&yen;{{rental.toFixed(2)}}</span>
                </van-cell>
            </van-cell-group>
            <div class="e-line"></div>
            <van-cell-group v-if="routrType == 1">
                <van-cell :title="item.create_time" v-for="(item,index) in list" :key="index">
                    <span class="pay">&yen;{{item.withdraw_money}}</span>
                </van-cell>
            </van-cell-group>

            <ul class="deduct" v-if="routrType == 0">
                <li v-for="(item,index) in list" :key="index">
                    <span v-text="item.income_source_user_name"></span>
                    <p v-text="item.create_time"></p>
                    <div class="pay">&yen;{{item.money}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import iHeader from '@/components/i-header'
import { mapGetters } from 'vuex'
export default {
    components:{
        iHeader
    },

    computed:{
        headline(){
            return this.routrType == 0? '提成流水':'提现记录'
        },
        typeDec(){
            return this.routrType == 0? '累计收入':'提现总额'
        },
        ...mapGetters(['setMID','verify']),
        routrType(){
            return this.$route.params.type;
        }
    },
    created(){
        this.getterList()
    },
    data(){
        return{
            list:[],
            page:1,
            //总额
            rental:0
        }
    },
    methods:{
        getterList(){
            let types = this.routrType == 0? 'inOutList' : 'applyList'
            let urls = this.routrType == 0? '/index/income_expenses/infoList' : '/index/withdraw/applyList'
            let opt = {
                actionType:types,
                user_id:this.setMID.user_id,
                limit:20,
                page:this.page
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax(urls,'post',obj).then(res=>{
                let data = res.data
                if(data.ResultCD ==200){
                    switch (this.routrType){
                        case 0 :{
                            this.rental = data.Amount;
                            break;
                        }
                        case 1 :{
                            this.rental = data.Amount0 + data.Amount1
                            break
                        }
                    }
                    this.list = data.Data;
                    return;
                }
                this.$toast(res.data.ErrorMsg);
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.pay{
    color:@red;
    font-size:1rem;
}
.deduct{
    li{
        width:100%;
        border-bottom:1px solid @bgGray;
        position: relative;
        padding:0.5rem 1rem;
        line-height: 1.5rem;
        box-sizing: border-box;
        span{
            font-size:1.2rem;
        }
        p{
            font-size:12px;
        }
        .pay{
            position: absolute;
            right:1rem;
            top:50%;
            margin-top:-0.5rem;
        }
    }
}
</style>
