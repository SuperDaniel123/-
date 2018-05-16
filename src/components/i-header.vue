<template>
  <div class="back-header">
      <i class="fa fa-angle-left" @click="getBack"></i>
      <h1>{{headline}}</h1>
      <span v-if="other" @click="pushMore">{{other.name||null}}</span>
  </div>
</template>

<script>
export default {
    name:'back-header',
    props:['headline','other'],
    data(){
        return {
        }
    }, 
    methods:{
        getBack(){
            this.$router.goBack();
        },
        pushMore(){
            this.$router.push(this.other.url)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.back-header{
    position: fixed;
    top:0;
    left: 0;
    width:100%;
    height:44px;
    background: #fff;
    text-align:center;
    line-height: 44px;
    font-size:18px;
    z-index: 99;
    .bottomRim;
    i.fa{
        position: absolute;
        font-size:24px;
        width:44px;
        height:44px;
        line-height: 44px;
        top:0;
        left: 0;
    }
    span{
        position: absolute;
        top:0;
        right:1rem;
        font-size:1rem;
    }
}
</style>