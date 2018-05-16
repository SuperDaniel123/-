<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <div class="textAdd">
                <div class="line clearfix"><span>收货人</span><input type="text" placeholder="请输入收货人名字"></div>
                <div class="line clearfix"><span>联系电话</span><input type="number" placeholder="请输入联系电话"></div>
                <div class="line clearfix" @click="ishow = true"><span>所在地区</span><input type="text" v-model="city" disabled="disabled" placeholder="请选择所在地区"></div>
                <div class="line clearfix"><span>详细地址</span><textarea placeholder="请输入详细地址，如街道、小区等" ></textarea></div>
            </div>
            <div class="button"><button @click="goback">确定</button></div>
        </div>
        <van-popup v-model="ishow" position="bottom" :overlay="true" >
            <van-area :area-list="areaList" @confirm="getAdd" @cancel="closeCity"/>
        </van-popup>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import data from '@/common/js/data.json'
export default {
    components:{
        iHeader
    },
    computed:{
        areaList(){
            return data
        }
    },
    data(){
        return{
            headline:'编辑地址',
            city:'',
            //地址
            ishow:false,
        }
    },
    methods:{
        closeCity(){
            this.ishow = false
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
            this.$toast('编辑成功')
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
