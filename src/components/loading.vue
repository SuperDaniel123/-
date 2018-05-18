<template>
    <div>
        <div class="loading" ><van-loading color="white" /></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.loading{
    position: fixed;
    top:50%;
    left: 50%;
    margin:-25px 0 0 -25px;
    width:50px;
    height:50px;
    background: rgba(0, 0, 0, 0.5);
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    .van-loading{
        display: inline-block;
    }
}
</style>
