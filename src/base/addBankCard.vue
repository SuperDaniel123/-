<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-cell-group>
                <van-field v-model="username" label="持卡人" icon="clear" placeholder="请输入用户名"   @click-icon="username = ''"/>
                <van-field v-model="telPhone" label="手机号" icon="clear" type="number"  placeholder="请输入手机号码"  @click-icon="telPhone = ''"/>
                <van-field v-model="bankCard" label="银行卡号" icon="clear" type="number"  placeholder="请输入银行卡号"  @click-icon="bankCard = ''"/>
                <van-cell title="银行" is-link :value="value" @click="show=true" />
            </van-cell-group>
        </div>
        <div class="btn">
            <van-button size="large" type="primary" @click="addCard">立即绑定</van-button>
        </div>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker show-toolbar title="选择银行" :columns="bankList" @cancel="onCancel"  @confirm="onConfirm" />
        </van-popup>
    </div>
</template>

<script>
import iHeader from '@/components/i-header'
import data from '@/common/js/bank.json'
import {mapGetters} from 'vuex'
export default {
    components:{
        iHeader
    },

    computed:{
        ...mapGetters(['setMID','verify']),
        bankList(){
            return data.list
        },
    },
    data(){
        return{
            headline:'添加银行卡',
            //银行卡信息
            username:'',
            telPhone:'',
            bankCard:'',
            show:false,
            value:''

        }
    },
    methods:{
        onCancel(){
            this.show = false
        },
        onConfirm(val){
            this.value = val;
            this.show = false
        },
        addCard(){
            if(this.username == '' || this.telPhone == '' || this.bankCard == '' || this.value == ''){
                this.$toast('请填写资料')
                return
            }
            let opt = {
                actionType:'addCard',
                user_id:this.setMID.user_id,
                bank_name:this.value,
                card_number:this.bankCard,
                bank_user_name:this.username,
                phone_number:this.telPhone
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/account/addCard','post',obj).then(res=>{
                if(res.data.ResultCD == 200){
                    this.$toast('添加成功')
                    setTimeout(() => {
                        this.$router.goBack();
                    }, 1000);
                    return
                }
                this.$toast(res.data.ErrorMsg)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.btn{
    width:80%;
    margin:2rem auto 0 auto;
}
.van-button--primary{
    background-color:@org;
    border: 1px solid @org;
}
</style>
