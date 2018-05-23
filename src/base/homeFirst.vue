<template>
    <div>
        <loading v-if="loaded"></loading>
        <van-swipe class="banner" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in bannerList" :key="index">
                <router-link :to="{name:'productDetails',params:{goods_id:item.goods_id}}">
                    <img :src="base + item.img_path" />
                </router-link>
            </van-swipe-item>
        </van-swipe>
        <div class="recBox">
            <div class="titled bottomRim"><b>NO1</b>每日推荐<div class="more" @click="gone">更多</div></div>
            <ul class="otherList">
                <li v-for="(item,index) in recommend" :key="index">
                    <router-link :to="{name:'productDetails',params:{goods_id:item.goods_id}}">
                        <img :src="base + item.rectangle_thumbnail" />
                        <div class="text">
                            <p v-text="item.goods_name"></p>
                            <span>&yen;{{item.now_price}}</span>
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div>
            <van-tabs sticky v-model="rushActivate" :line-width="30">
                <van-tab v-for="(item,index) in rushNav"  :key="index">
                    <div slot="title">
                        <span>{{item.name}}<br>{{item.stated}}</span>
                    </div>
                    <div v-if="rushlist.length == 0" class="empty">暂无抢购商品</div>
                    <ul v-if="rushlist.length != 0" class="otherList">
                        <li v-for="(item,index) in rushlist" :key="index">
                            <router-link :to="{name:'productDetails',params:{goods_id:item.goods_id}}">
                            <img :src="base + item.thumbnail" />
                            <div class="text">
                                <p v-text="item.goods_name"></p>
                                <span>&yen; {{item.now_price}}</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                            </router-link>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </div>
        <div class="recBox">
            <div class="titled bottomRim"><b>公司简介</b></div>
            <p class="otherText"><b>弹个车& 泽银汽车</b></p>
            <p class="otherText pdc">
                全国特约一级经销商 2013年至今，弹个车获得了蚂蚁金 服、神州租车、美国华平投资集团、 阿里巴巴、春华资本、招银国际、 红杉资本、晨兴资本、源渡创投等 多个实力雄厚的资方融资。 泽银汽车携手背靠阿里集团蚂蚁金服的弹个车，共同在汽车金融场景内探索新的可能性。
            </p>
            <p class="otherText pdc">
                泽银汽车在取得初步成功后，已完成汽车产业鍊的整合，将持续在汽车后市场中发力，透过集团跨部门整合，开展汽车保险，二手车买卖，汽车配件商城等相关业务。
            </p>
            <p class="otherText pdc">公司地址：广东省佛山市顺德区乐从镇乐从社区居民委员会佛山新城裕和路142号金海文化创意中心1702号<br/>联系热线：0757-29381825</p>
        </div>
        <div class="footerText">佛山泽银汽车销售服务有限公司  版权所有</div>
    </div>
</template>

<script>
import loading from '@/components/loading'
export default {
    components:{
        loading
    },
    props:['cat'],
    created(){
        this.focusMap()
    },
    watch:{
        'rushActivate':{
            handler(val,old){
                this.getRushList(this.rushNav[val])
            },
            deep:true
        }
    },
    computed:{

    },
    data(){
        return {

            //域名
            base:this.$base,
            //抢购nav
            rushNav:[
                {name:'昨天',stated:'抢购中',timer:'',date:'yesterday'},
                {name:'8:00',stated:this.timedOut(8),timer:'08',date:'today'},
                {name:'12:00',stated:this.timedOut(12),timer:'12',date:'today'},
                {name:'20:00',stated:this.timedOut(20),timer:'20',date:'today'},
                {name:'明天',stated:'即将开始',timer:'',date:'tomorrow'}
            ],
            
            //当前激活
            rushActivate:null,
            //抢购列表
            rushlist:[],
            //banner图
            bannerList:[],
            //接口域名
            base:this.$base,
            //每日推荐
            recommend:[],
            loaded:false
        }
    },
    methods:{
        gone(){
            this.$router.push({
                name:'proList',
                params:{
                    cat:this.cat
                }
            })
        },
        //判读抢购状态
        timedOut(num){
            let md = new Date();
            if(md.getHours()>num){
                return '抢购中'
            }else{
                return '即将开始'
            }
        },
        //banner图
        focusMap(){
            this.loaded = true
            let opt = {
                user_id:'',
                limit:4,
                page:1,
                classify:0
            }
            
            this.$ajax('/index/Goods_Advertising/AdvertisingList','post',this.$sess('Condition',opt)).then(res=>{
                let data = res.data.Data
                this.bannerList = data;
                console.log(this.bannerList)
                this.getRecommend()
            })
        },
        //每日推荐
        getRecommend(){
            let opt = {
                actionType:'special',
                limit:1,
                page:1,
                cat_id:this.cat
            }
            this.$ajax('/index/daily_special/special','post',this.$sess('info',opt)).then(res=>{
                let data = res.data.Data
                this.recommend = data
                this.loaded = false
            })
        },
        //抢购接口
        getRushList(obj){
            let opt = {
                actionType:'saleList',
                limit:10,
                sale_day:obj.date,
                sale_hour:obj.timer,
                page:1,
                cat_id:this.cat
            }
            this.$ajax('/index/flash_sale/dataList','post',this.$sess('info',opt)).then(res=>{
                let data = res.data.Data
                this.rushlist = data
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.banner{
    // height:300px;
    .van-swipe-item{
        background: @org;
    }
    img{
        width:100%;
        height:100%;
        object-fit: cover;
        vertical-align: middle;
    }
}
.recBox{
    width:100%;
    .otherText{
        padding:0 1rem;
        font-size:12px;
        line-height: 1.8rem;
        b{
            font-size:@font1;
        }
    }
    .otherText.pdc{
        text-indent: 2rem;
    }
}
.footerText{
    background: @bgGray;
    text-align: center;
    padding:2rem 0;
}
.empty{
    line-height: 10rem;
    text-align: center;
}
</style>