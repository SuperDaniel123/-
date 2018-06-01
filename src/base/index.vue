<template>
    <div>
        <div class="i-content">
            <home v-if="this.indexStateS == 0"></home>
            <!-- <div v-if="this.indexStateS == 1">暂无内容</div>
            <div v-if="this.indexStateS == 2">暂无内容</div> -->
            <user v-if="this.indexStateS == 1"></user>
        </div>
        <i-footer></i-footer>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import iFooter from '@/components/i-footer'
import home from '@/base/home'
import user from '@/base/user'
export default {
    name:'index',
    components:{
      iFooter,
      home,
      user
    },
    computed:{
        ...mapGetters([
            'indexStateS',
            'skip',
            'setMID'
        ])
    },
    created(){
        if(this.setMID != ''){
            this.getMaterial()
        }
        if(this.skip == 1){
            this.$router.push('/orderform')
        }
    },
    methods:{
        getMaterial(){
            let opt = {
                user_id:this.setMID.user_id,
                account:this.setMID.account,
                OperationType:1000
            }
            this.$ajax('/index/Profile/profile','post',this.$sess('UserInfo',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    sessionStorage.setItem('identity',data.Data.user_grade)
                    return;
                }
                this.$toast(data.ErrorMsg)
            })
        },
    }
}
</script>

<style lang="less" scoped>

.i-content{
    padding-bottom:50px;
    box-sizing: border-box;
}
</style>
