<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <div class="countTop">
                <img src="../common/images/userTop.jpg" />
                <h2>总人数：{{count}}</h2>
            </div>
            <van-cell-group>
                <van-cell :value="item.create_time" v-for="(item,index) in custList" :key="index">
                    <template slot="title">
                        <img class="heads" v-if="item.portrait == null" src="../common/images/user.png" />
                        <img class="heads" v-if="item.portrait != null" :src="base + item.portrait" />
                        <span v-text="item.name"></span>
                    </template>
                </van-cell>
            </van-cell-group>
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
        ...mapGetters(['setMID','verify'])
    },
    data(){
        return {
            //域名
            base:this.$base,
            headline:'我的客户',
            //个数
            count:0,
            custList:[]
        }
    },
    created(){
        this.getClientList()
    },
    methods:{
        getClientList(){
            let opt ={
                actionType:'higherUp',
                user_id:this.setMID.user_id,
                limit:30,
                page:1
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/user/superior','post',obj).then(res=>{
                let data = res.data;
                if(data.ResultCD == 200){
                    this.count = data.Count;
                    this.custList = data.Data;
                    return
                }
                this.$toast(data.ErrorMsg)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.countTop{
    position: relative;
    img {
        width:100%;
        height:auto;
        vertical-align: middle;
    }
    h2{
        position: absolute;
        top:50%;
        left: 0;
        width:100%;
        line-height: 3rem;
        text-align: center;
        margin-top:-1.5rem;
        color:#fff;
        font-size:1.5rem;
    }

}
.heads{
    width:2rem;
    height:2rem;
    border-radius: 50%;
    object-fit: cover;
}
</style>
