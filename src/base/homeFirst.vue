<template>
    <div>
        <loading v-if="loaded"></loading>
        <van-swipe class="banner" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in bannerList" :key="index">
                <div @click="goneURL(item)">
                    <img :src="base + item.img_path" />
                </div>
            </van-swipe-item>
        </van-swipe>
        <div class="recBox">
            <div class="titled bottomRim"><b>NO1</b>每日推荐<div class="more" @click="gone">更多</div></div>
            <ul class="otherList">
                <li v-for="(item,index) in recommend" :key="index">
                    <router-link :to="{path:'/productDetails',query:{goods_id:item.goods_id}}">
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
                            <router-link :to="{path:'/productDetails',query:{goods_id:item.goods_id}}">
                            <img :src="imgOptimize(item.thumbnail,item.rectangle_thumbnail)" />
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
        this.rushTime()
        
    },
    watch:{
        'rushActivate':{
            handler(val,old){
                this.getRushList(this.rushNav[val])
            },
            deep:true
        }
    },
    data(){
        return {

            //域名
            base:this.$base,
            //抢购nav
            rushNav:[{name:'昨天',stated:'抢购中',timer:'',date:'yesterday'}],
            
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
        //抢购时间
        rushTime(){
            let opt = {
                actionType:'flashSaleTime'
            }
            this.$ajax('/index/flash_sale/flashTime','post',this.$sess('info',opt)).then(res=>{
                let data = res.data.Data
                let arr = []
                for(let i = 0; i < data.length; i++){
                    let temp = data[i]
                    let obj = {}
                    obj['name'] = temp;
                    obj['stated'] = this.contrastTime(temp)
                    obj['timer'] = temp;
                    obj['date'] = 'today';
                    arr.push(obj)
                }
                arr.unshift({name:'昨天',stated:'抢购中',timer:'',date:'yesterday'})
                arr.push({name:'明天',stated:'即将开始',timer:'',date:'tomorrow'})
                this.rushNav = JSON.parse(JSON.stringify(arr))
            })
        },
        //字符串时间转换对比
        contrastTime(str){
            var myDate = new Date();
            let h = myDate.getHours()
            let m = myDate.getMinutes()
            //当前时间转分钟
            let sum = h * 60 + m
            //导入时间
            let timeArr = str.split(":")
            let arrSum = +timeArr[0] * 60 + +timeArr[1] 
            if(arrSum <= sum){
                return '抢购中'
            }
            else{
                return '即将开始'
            }


        },



        imgOptimize(small,big){
            if(big == '' || !big){
                return this.base + small
            }
            return this.base + big
        },
        gone(){
            this.$router.push({
                name:'proList',
                params:{
                    cat:this.cat
                }
            })
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
            this.$ajax('/index/flash_sale/flashSaleTime','post',this.$sess('info',opt)).then(res=>{
                let data = res.data.Data
                this.rushlist = data
            })
        },
        goneURL(item){
            console.log(item)
            if(item.activity_url == ""){
                this.$router.push({
                    path:'/productDetails',
                    query:{goods_id:item.goods_id}
                })
                return;
            }
            window.open(item.activity_url)
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

.empty{
    line-height: 10rem;
    text-align: center;
}
</style>