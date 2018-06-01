<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-cell-group>
                <van-cell :title="typeDec">
                    <span class="pay">&yen;{{rental}}</span>
                </van-cell>
            </van-cell-group>
            <div class="e-line"></div>

            <van-cell-group v-if="routrType == 1">
                <van-cell :title="item.create_time" v-for="(item,index) in list" :key="index">
                    <i class="payState red" v-if="item.withdraw_status == -1">拒绝提现</i>
                    <i class="payState blue" v-if="item.withdraw_status == 0">审核中</i>
                    <i class="payState blue" v-if="item.withdraw_status == 1">已审核</i>
                    <i class="payState org" v-if="item.withdraw_status == 2">已到账</i>
                    <span class="pay">&yen;{{item.withdraw_money}}</span>
                </van-cell>
            </van-cell-group>

            
                <ul class="deduct" v-if="routrType == 0">
                    <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="100" >
                    <li v-for="(item,index) in list" :key="index">
                        <span v-text="item.income_source_user_name"></span>
                        <p v-text="item.create_time"></p>
                        <div class="pay red" v-if="item.type == 1">&yen;{{item.money}}</div>
                        <div class="pay blue" v-if="item.type == 0">-&yen;{{item.money}}</div>
                    </li>
                    </van-list>
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
            rental:0,
            loading: false,
            finished: false,
        }
    },
    methods:{
        getterList(){
            let types = this.routrType == 0? 'inOutList' : 'applyList'
            let urls = this.routrType == 0? '/index/income_expenses/infoList' : '/index/withdraw/applyList'
            let opt = {
                actionType:types,
                user_id:this.setMID.user_id,
                limit:5,
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
                    data.Data.forEach(element => {
                        this.list.push(element)
                    });
                    if(data.Data.length == 0 ){
                        this.finished = true;
                    }
                    
                    return;
                }
                this.$toast(res.data.ErrorMsg);
            })
        },
        onLoad() {
            console.log(1)
            this.page += 1;
            setTimeout(() => {
                this.getterList();
                this.loading = false;
            }, 500);
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
.pay.red{
    color:@red;
}
.pay.blue{
    color:@blue;
}
.payState{
    color:#fff;
    font-size:12px;
    margin-right: 0.5rem;
    padding:2px 4px;
    border-radius: 2px;
}
.payState.red{
    background: @red
}
.payState.blue{
    background: @blue
}
.payState.org{
    background: @org
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
