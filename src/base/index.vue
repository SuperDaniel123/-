<template>
    <div>
        <div class="i-content">
            <home v-if="this.indexStateS == 0">1</home>
            <div v-if="this.indexStateS == 1">2</div>
            <div v-if="this.indexStateS == 2">3</div>
            <div v-if="this.indexStateS == 3">4</div>
        </div>
        <i-footer></i-footer>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import iFooter from '@/components/i-footer'
import home from '@/base/home'
export default {
    name:'index',
    components:{
      iFooter,
      home
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
