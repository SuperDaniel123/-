<template>
  <div class="back-header">
      <i class="fa fa-angle-left" @click="getBack"></i>
      <h1>{{headline}}</h1>
  </div>
</template>

<script>
export default {
    name:'back-header',
    props:['headline'],
    data(){
        return {

        }
    },
    methods:{
        getBack(){
            this.$router.goBack();
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
}
</style>