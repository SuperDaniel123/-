<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-cell-group>
                <van-cell :title="typeDec" value="0.00" />
            </van-cell-group>
            <div class="e-line"></div>
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
            return this.$route.params.type == 0? '提成流水':'提现记录'
        },
        typeDec(){
            return this.$route.params.type == 0? '累计收入':'提现总额'
        },
        ...mapGetters(['setMID'])
    },
    created(){
        this.getterList()
    },
    data(){
        return{
            list:[]
        }
    },
    methods:{
        //提现记录
        getterList(){
            let opt = {
                actionType:'higherUp',
                user_id:this.setMID.user_id,
                limit:30,
                page:1
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax("/index/user/superior",'post',obj).then(res=>{
                if(res.data.ResultCD ==200){
                    this.list = res.data.Data;
                    return
                }
                this.$toast(res.data.ErrorMsg);
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';

</style>
