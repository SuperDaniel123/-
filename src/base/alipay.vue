<template>
    <div>
        <div @click="back" style="line-height:40px;margin-left:20px;">返回上一页</div>
        <div v-html="this.payFrom"></div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
    created(){
      
    },
    data(){
        return {
        }
    },
    mounted(){
        let fo = document.getElementById('alipaysubmit')
        fo.target = '_blank';
        document.forms['alipaysubmit'].submit();

    },
    methods:{
        back(){
            this.$router.goBack()
        }
        
    },
    computed:{
        ...mapGetters(['payFrom'])
    }
}
</script>

<style lang="less" scoped>
</style>
