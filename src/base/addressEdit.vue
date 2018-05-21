<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <div class="textAdd">
                <div class="line clearfix"><span>收货人</span><input v-model="consignee" type="text" placeholder="请输入收货人名字"></div>
                <div class="line clearfix"><span>联系电话</span><input v-model="phone" type="number" placeholder="请输入联系电话"></div>
                <div class="line clearfix" @click="ishow = true"><span>所在地区</span><input type="text" v-model="city" disabled="disabled" placeholder="请选择所在地区"></div>
                <div class="line clearfix"><span>详细地址</span><textarea v-model="address" placeholder="请输入详细地址，如街道、小区等" ></textarea></div>
            </div>
            <div class="button"><button @click="goback">确定</button></div>
        </div>
        <van-popup v-model="ishow" position="bottom" :overlay="true" >
            <van-area :area-list="areaList" @confirm="getAdd" @cancel="closeCity"/>
        </van-popup>
    </div>
</template>

<script>
import iHeader from '@/components/i-header'
import data from '@/common/js/data.json'
import {mapGetters} from 'vuex'
export default {
    components:{
        iHeader
    },
    computed:{
        ...mapGetters(['setMID','verify','addressEdit']),
        areaList(){
            return data
        }
    },
    created(){
        if(this.$route.params.id == 1){
            this.datum()
        }
    },
    data(){
        return{
            headline:'编辑地址',
            //收货人
            consignee:'',
            //电话
            phone:'',
            //地址
            address:'',
            city:'',
            //地址
            ishow:false,
        }
    },
    methods:{
        closeCity(){
            this.ishow = false
        },
        datum(){
            this.consignee = this.addressEdit.shipping_name;
            this.phone = this.addressEdit.shipping_phone;
            this.address = this.addressEdit.address;
            this.city = this.addressEdit.province + " " +this.addressEdit.city+ " " +this.addressEdit.district;
        },
        getAdd(arr){
            let str = ''
            for(let i = 0; i < arr.length; i++){
                let temp = arr[i];
                str += temp['name']+' ';
            }
            this.city = str
            this.ishow = false
        },
        goback(){
            if(this.city == '' || this.consignee == '' || this.phone =='' || this.address == ''){
                this.$toast('请补全资料后再提交');
                return
            }
            var c = this.city.split(' ')
            let opt = {
                actionType:'addAddress',
                user_id:this.setMID.user_id,
                country:'中国',
                province:c[0],
                city:c[1],
                district:c[2],
                address:this.address,
                shipping_name:this.consignee,
                shipping_phone:this.phone,
                defaultAddress:0
            }
            if(this.$route.params.id == 1){
                opt['address_id'] = this.addressEdit.address_id
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/shopping_address/addAddress','post',obj).then(res=>{
                if(res.data.ResultCD != 200){
                    this.$toast(res.data.ErrorMsg);
                    return;
                }
                this.$toast('保存成功');
            })
            
            setTimeout(()=>{    
                this.$router.goBack()
            },2000)
        }
    }
    
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.textAdd{
    padding-left:1rem;
    div.line{
        line-height: 3rem;
        .bottomRim;
        span{
            font-size:1rem;
            display: inline-block;
            width:5rem;
        }
        span,input{
            float: left;
        }
        input,textarea{
            width:calc(100% - 6rem);
            border:none
        }
        textarea{
            margin-top:0.5rem;
            line-height: 1.5rem
        }
        input:disabled{
            background: @white;
        }
        textarea::placeholder{
            color:#d4d4d4
        }
    }
}
.button{
    margin:1rem;
    button{
        width:100%;
        line-height: 3rem;
        height: 3rem;
        border-radius: 5px;
        font-size:@font1;
        color:@white;
        background: @org;
    }
}
</style>
