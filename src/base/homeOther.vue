<template>
    <div>
        
        <div class="focusBox">
            <van-swipe class="banner" :autoplay="3000">
                <van-swipe-item v-if="bannerList.length == 0">
                    <div>暂无数据</div>
                </van-swipe-item>
                <van-swipe-item v-for="(item,index) in bannerList" :key="index">
                    <router-link :to="{name:'productDetails',params:{goods_id:item.goods_id}}">
                        <img :src="base + item.img_path" />
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
        <loading v-if="loaded"></loading>
        <div class="recBox">
            <div class="titled bottomRim"><b>NO1</b>每日推荐</div>
              <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    
                <swiper-slide v-for="(item,index) in recommend" :key="index" >
                    <div class="box" @click="pushDetails(item.goods_id)">
                        <img :src="base + item.thumbnail" />
                        <div class="text">
                            <p v-text="item.goods_name"></p>
                            <span>&yen;{{item.now_price}}</span>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="recBox">
            <div class="titled bottomRim"><b>NO1</b>精选好货</div>
                <ul class="otherList">
                    <li v-for="(item,index) in goodsList" :key="index" @click="pushDetails(item.goods_id)">
                        <img :src="base + item.thumbnail" />
                        <div class="text">
                            <p v-text="item.goods_name"></p>
                            <span>&yen; {{item.now_price}}</span>
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
import loading from '@/components/loading'
export default {
    components:{
        swiper, 
        swiperSlide,
        loading
    },
    props:['cat'],
    watch:{
        'cat'(val,old){
            this.emptyData()
            
        }
    },
    created(){
        this.emptyData()
    },
    data(){
        return{
            //域名
            base:this.$base,
            //banner图
            bannerList:[],
            //每日推荐
            recommend:[],

            //每日推荐滚动
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            },
            //精选好货
            goodsList:[],
            loaded:false
        }
    },
    methods:{
        //banner图
        focusMap(){
            let opt = {
                user_id:'',
                limit:4,
                page:1,
                classify:this.cat
            }
            this.$ajax('/index/Goods_Advertising/AdvertisingList','post',this.$sess('Condition',opt)).then(res=>{
                let data = res.data.Data
                this.bannerList = data;
                
            })
        },
        //每日推荐
        getRecommend(){
            let opt = {
                actionType:'special',
                limit:10,
                page:1,
                cat_id:this.cat
            }
            this.$ajax('/index/daily_special/special','post',this.$sess('info',opt)).then(res=>{
                let data = res.data.Data
                this.recommend = data
            })
        },
        getGoodsList(){
            let opt = {
                Paging:{
                    Page:1,
                    Limit:10
                },
                LikeWhere:{
                    cat_id:this.cat
                }
            }
            this.$ajax('/index/Goods/GoodsList','post',this.$sess('Condition',opt)).then(res=>{
                let data = res.data.Data
                this.goodsList = data
                this.loaded = false;
            })
        },
        //清空
        emptyData(){
            this.loaded = true;
            this.bannerList = this.recommend = this.goodsList = []
            this.focusMap()
            this.getRecommend()
            this.getGoodsList()
        },
        pushDetails(id){
            this.$router.push({
                name:'productDetails',
                params:{
                    goods_id:id
                }
            })
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
    .van-swipe-item{
        background: @org;
        div{
            text-align: center;
            color:#fff;
            line-height: 150px;
        }
    }
    img{
        width:100%;
        height:100%;
        object-fit: cover;
        vertical-align: middle;
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
      /* Center slide text vertically */
      /* Center slide text vertically */
      display: flex;
      .box{
          width:100px;
          img {
              width:100px;
              height:100px;
              object-fit: cover;
              vertical-align: middle;
          }
          .text{
                p{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    font-size:12px;
                    line-height: 18px;
                    height:36px;
                }
                span{
                    color:@red;
                    font-size:@font1;
                }
          }
      }
    }
.recBox{
    width:100%;
}

</style>