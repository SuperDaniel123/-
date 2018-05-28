<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <div class="textRect">
                <div class="sumPro">
                    <div class="sumt">
                        <input type="number" placeholder="请输入金额" v-model="sum" />
                        <span @click="sum=inAll">全部提现</span>
                    </div>
                    <p>可提现金额：{{inAll}}元</p>
                </div>
                <van-cell-group>
                    <van-cell title="开户行" is-link :value="cardData.bank_name || ''" @click="show = true" />
                    <van-field :value="cardData.card_number || ''" label="银行卡号:" disabled />
                    <van-field :value="cardData.bank_user_name || ''" label="持卡人:" disabled />
                    <van-field :value="cardData.phone_number || ''" label="电话号码:" disabled />
                    <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''">
                        <van-button slot="button" size="small" type="primary" :disabled="disabled" @click="getCode">{{sdCode}}</van-button>
                    </van-field>
                </van-cell-group>
            </div>

            <div class="btn"><van-button size="large"  type="primary" @click="withdrawPort">立即提现</van-button></div>
            <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker
                show-toolbar
                title="银行卡"
                :columns="bankList"
                @cancel="onCancel"
                @confirm="onConfirm"
            />
            </van-popup>
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
    watch:{
        'sum'(val,old){
            if(val > this.inAll){
                this.sum = this.inAll
            }
        }
    },
    computed:{
        ...mapGetters(['setMID','verify'])
    },
    created(){
        this.getList()
    },
    data(){
        return{
            headline:'提现',
            sum:'',
            inAll:7788.00,
            sms:'',
            //银行卡列表
            bankList:[],

            sdCode:'获取验证码',
            //验证码token
            CodeToken:'',
            //按钮状态
            disabled:false,

            

            //银行卡显示
            show:false,

            //银行卡资料
            cardData:{}
        }
    },
    methods:{
        onCancel(){
            this.show = false;
        },
        onConfirm(val){
            this.show = false;
            this.cardData = val
        },

        //计时器
        countDown(){
            var i = 60
            this.disabled = true;
            let times = setInterval(()=>{
                this.sdCode = --i + '秒重新获取'
                if(i<0){
                    clearInterval(times)
                    this.disabled = false;
                    this.sdCode = '获取验证码'
                    this.disabled = false
                }
            },1000)
        },

        getList(){
            let opt = {
                actionType:'accountList',
                user_id:this.setMID.user_id,
                limit:10,
                page:1
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/account/accountList','post',obj).then(res=>{
                let data = res.data
                if(data.ResultCD != '200'){
                    this.$toast(data.ErrorMsg)
                    return
                }
                for(let i = 0; i < data.Data.length; i++){
                    let temp = data.Data[i];
                    temp['text'] = temp.bank_name
                    this.bankList.push(temp)
                }
            })
        },
        getCode(){
            if(!this.cardData.hasOwnProperty("phone_number")){
                this.$toast('请填选择银行')
                return;
            }
            let opt = {
                actionType:'getMessageCode',
                phone_number:this.cardData.phone_number
            }
            this.$ajax('/index/message/sendMessage','post',this.$sess('info',opt)).then(res=>{
                if(res.data.ResultCD == 200){
                    this.$toast('验证码已发送到手机上')
                    this.CodeToken = res.data.Data.message_token
                    this.countDown()
                    return
                }
                this.$toast(res.data.ErrorMsg)
            })
        },
        
        withdrawPort(){
            let opt = {
                actionType:'addApply',
                user_id:this.setMID.user_id,
                account_id:this.cardData.account_id,
                withdraw_money:this.sum,
                card_number:this.cardData.card_number,
                phone_number:this.cardData.phone_number,
                message_token:this.CodeToken,
                message_code:this.sms
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/message/sendMessage','post',this.$sess('info',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    this.$toast('提现成功')
                    return;
                }
                this.$toast(data.ErrorMsg)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.textRect{
    width:90%;
    margin:1rem auto;
    border-radius: 8px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    .sumPro{
        padding:1rem;
        .sumt{
            line-height: 3rem;
            display: flex;
            input[type="number"]{
                flex: 1;
                font-size:1.5rem;
                line-height: 3rem;
            }
            input::placeholder{
                font-size:1rem;
            }
            span{
                display: inline-block;
                width:auto;
                color:@org;
            }
        }
        p{
            color:@font-Sgray;
        }
    }
}
.btn{
    width:90%;
    margin:1rem auto;
}
.van-button--primary{
    background-color:@org;
    border-color:@org;
}
.van-button--disabled{
    color:rgb(209, 209, 209);
}
</style>
