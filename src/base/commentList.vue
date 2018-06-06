<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="filtrate clearfix">
                <li :class="val == 'good'? 'on':''" @click="val = 'good'">好评</li>
                <li :class="val == 'poor'? 'on':''" @click="val = 'poor'">差评</li>
                <li :class="val == 'belt'? 'on':''" @click="val = 'belt'">带图</li>
            </ul>
            
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <ul class="discuss">
                    <li v-for="(item,index) in list" :key="index">
                        <div class="datum">
                            <span class="nameid">{{item.user_name}}</span><time>{{timer(item.addtime)}}</time>
                            <van-rate class="star" v-model="item.star_level" :size="15" :count="5" disabled-color="#ffd21e" disabled/>
                        </div>
                        <p>{{item.content}}</p>
                        <ul class="imgList clearfix">
                            <li v-for="(items,i) in item.picture" :key="i" @click="open(items)">
                                <img :src="base + items" />
                            </li>
                        </ul>
                    </li>
                    </ul>
                </van-list>
            
            <van-popup v-model="show">
                <img :src="base + imgURL" />
            </van-popup>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import {timestamp} from '../common/js/common.js'
export default {
    components:{
        iHeader,
    },
    created(){
        this.getComment(this.val)
    },
    watch:{
        val(val,old){
            this.page = 1
            this.list = [],
            this.finished = false
            this.getComment(val)
        }
    },
    data(){
        return{
            //域名
            base:this.$base,
            headline:'评论',
            list:[],
            page:1,
            val:"",
            show:false,
            imgURL:'',


            loading: false,
            finished: false
        }
    },
    methods:{
        getComment(val){
            this.val = val
            let opt = {
                Paging:{
                    Page:this.page,
                    Limit:15
                },
                Filter:{
                    goods_id:this.$route.params.goods_id,
                    Value:val
                }
            }
            this.$ajax('/index/Goods_Comments/CommentsList','post',this.$sess('Condition',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    data.Data.forEach(element => {
                        this.list.push(element)
                    });
                    return
                }
                if(data.ResultCD == 4003){
                    this.finished = true
                    return
                }
                this.$toast(data.ErrorMsg);
                return;
            })
        },
        timer(time){
            return timestamp(time)
        },
        open(url){
            this.imgURL = url;
            this.show = true
        },
        onLoad() {
            this.page += 1;
            setTimeout(() => {
                this.getComment(this.val);
                this.loading = false;
            }, 500);
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.filtrate{
    padding:0.5rem 1rem;
    .bottomRim;
    li{
        float: left;
        margin-right:1rem;
        padding:0.1rem 0.5rem;
        border:1px solid @org;
        color:@org;
        border-radius: 2rem;
    }
    li.on{
        background: @org;
        color:#fff;
    }
}
.discuss{
    padding:1rem 0 1rem 1rem;
    >li{
        margin-bottom: 1rem;
        padding-right:1rem;
        .datum{
            line-height: 2rem;
            height:2rem;
            span.nameid{
                font-size:1.2rem;
                float: left;
            }
            time{
                color:@font-Sgray;
                float: left;
                margin-left:1rem;
            }
            .star{
                float: left;
                margin-left:1rem;
            }
        }
        .bottomRim;
        p{
            line-height: 1.5rem;
            padding:0.5rem 0;
        }
        .imgList{
            margin:0.5rem auto;
            li{
                float: left;
                margin-right:0.5rem;
                width:6rem;
                height:6rem;
                img {
                    width:100%;
                    height:100%;
                    object-fit: cover;
                }
            }
        }
    }
    
}
</style>
