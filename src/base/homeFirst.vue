<template>
    <div>
        <van-swipe class="banner" :autoplay="3000">
            <van-swipe-item></van-swipe-item>
            <van-swipe-item></van-swipe-item>
            <van-swipe-item></van-swipe-item>
            <van-swipe-item></van-swipe-item>
        </van-swipe>
        <div class="recBox">
            <div class="titled bottomRim"><b>NO1</b>每日推荐<div class="more" @click="gone">更多</div></div>
            <ul class="otherList">
                <li>
                    <router-link to="/productDetails">
                        <img src="../common/images/banner.jpg" />
                        <div class="text">
                            <p>产品名称</p>
                            <span>&yen; 39.00</span>
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div>
            <van-tabs sticky>
                <van-tab v-for="index in 8"  :key="index.index">
                    <div slot="title">
                        <span>精选产品<br>8:00</span>
                    </div>
                    <ul class="otherList">
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>

                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                        <li>
                            <img src="../common/images/banner.jpg" />
                            <div class="text">
                                <p>产品名称</p>
                                <span>&yen; 39.00</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        gone(){
            this.$router.push('/proList')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.banner{
    height:300px;
    .van-swipe-item:nth-of-type(1){
        background: @org;
    }
    .van-swipe-item:nth-of-type(2){
        background: @roseRed;
    }
    .van-swipe-item:nth-of-type(3){
        background: @blue;
    }
    .van-swipe-item:nth-of-type(4){
        background: @font-Lgray;
    }
}
.recBox{
    width:100%;
}
</style>