<template>
    <div>
        <div class="focusBox">
            <van-swipe class="banner" :autoplay="3000">
                <van-swipe-item></van-swipe-item>
                <van-swipe-item></van-swipe-item>
                <van-swipe-item></van-swipe-item>
                <van-swipe-item></van-swipe-item>
            </van-swipe>
        </div>

        <div class="recBox">
            <div class="titled bottomRim"><b>NO1</b>每日推荐</div>
              <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                <swiper-slide><div class="box"></div></swiper-slide>
                <swiper-slide><div class="box"></div></swiper-slide>
                <swiper-slide><div class="box"></div></swiper-slide>
                <swiper-slide><div class="box"></div></swiper-slide>
                <swiper-slide><div class="box"></div></swiper-slide>
                <swiper-slide><div class="box"></div></swiper-slide>
                <swiper-slide><div class="box"></div></swiper-slide>
            </swiper>
        </div>
        <div class="recBox">
            <div class="titled bottomRim"><b>NO1</b>精选好货</div>
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
            </div>
        <div>

        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components:{
        swiper, 
        swiperSlide
    },
    data(){
        return{
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.focusBox{
    width:90%;
    height:150px;
    border-radius: 5px;
    overflow:hidden;
    margin: 75px auto 10px auto;
}
.banner{
    height:150px;
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
 .swiper-container {
      width: 100%;
      padding:1rem ;
      box-sizing: border-box;
      height: 100%;
    }
    .swiper-slide {
        width:100px;
      text-align: center;
      font-size: 18px;
      background: black;
      /* Center slide text vertically */
      /* Center slide text vertically */
      display: flex;
      .box{
          width:100px;
          height:100px;
      }
    }
.recBox{
    width:100%;
}
</style>