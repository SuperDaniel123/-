<template>
    <div>
        <i-header :headline = headline :other="other"></i-header>
        <div class="content">
                <ul class="cardList">
                    <li v-for="item in this.cardList" :key="item.key">
                        <span v-text="item.bank_name"></span>
                        <img src="../common/images/vs.png" />
                        <b v-text="item.encrypt"></b>
                        <i class="fa fa-close" @click="delCard(item.account_id)"></i>
                    </li>
                </ul>
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
    computed:{
        ...mapGetters([
            'setMID',
            'verify'
        ])
    },
    mounted(){
        this.getList();
        // this.dataRes();
    },
    data(){
        return{
            headline:'我的银行卡',
            cardList:[],
            other:{
                name:'添加',
                url:'/addBankCard'
            }
        }
    },
    methods:{
        //加密号码
        /*
            mtext:要替换的字符
            place:位置
            ptext：替换值
        */
        requestText(mtext,place,ptext){
            let text = mtext.charAt(place);
            mtext = mtext.replace(text,ptext)
            return mtext;
        },
        //数据替换
        dataRes(list){
            let arr = list;
            for(let i=0; i<arr.length; i++){
                //字符串转成数组
                let tra = arr[i].card_number.split('')
                //承载字符串转成数组
                let _arr = [];
                //承载转换后的字符
                let siti;
                for(let j = 0; j< tra.length; j++){
                    let flag = true
                    if(j>tra.length - 4){
                        flag = false
                    }
                    if(flag){
                        var txt = this.requestText(tra[j],0,'*');
                        _arr.push(txt);
                    }else{
                        _arr.push(tra[j]);
                    }
                }
                siti = _arr.join('');
                //每四个字符加一个空格
                siti = siti.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
                arr[i].encrypt = siti;
            }
            this.cardList = arr;
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
                    alert(data.ErrorMsg)
                    return
                }
                for(let key in data.Data){
                    this.cardList.push(data.Data[key])
                }
                this.dataRes(this.cardList)
            })
        },
        delCard(id){
            let r = confirm("确定要删除吗?");
            if(r){
                let opt = {
                    user_id:this.setMID.user_id,
                    account_id:id
                }
                let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
                this.$ajax('/index/account/cancelCard','POST',obj).then(res=>{
                    let data = res.data
                    if(data.ResultCD != '200'){
                        this.$toast(data.ErrorMsg)
                        return
                    }
                    this.$toast('删除成功')
                    let arr = [];
                    for(let i = 0; i <this.cardList.length; i++){
                        let temp = this.cardList[i];
                        if(temp.account_id == id){
                            continue;
                        }
                        arr.push(temp)
                    }
                    this.cardList = arr
                    
                })
            }
        }
        
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.cardList{
    padding:1rem 1rem 0 1rem;
    li{
        position: relative;
        margin-bottom: @font1;
        border-radius:5px;
        overflow: hidden;
        span{
            position: absolute;
            top:2rem;
            left: 1.5rem;
            font-size:@font1-25;
            color:@white;
        }
        img{
            max-width:100%;
        }
        b{
            position: absolute;
            bottom: 1rem;
            right:1rem;
            color:@white;
            font-size:2rem;
        }
        .fa{
            color:@white;
            position: absolute;
            right:0.5rem;
            top:0.5rem;
            font-size:1.2rem;
        }
    }
}
</style>