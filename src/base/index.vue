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
            'indexStateS'
        ])
    }
}
</script>

<style lang="less" scoped>

.i-content{
    padding-bottom:50px;
    box-sizing: border-box;
}
</style>
