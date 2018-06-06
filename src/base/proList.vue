<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="200">
                <div class="alone" v-for="(item,index) in ddlist" :key="index">
                    <router-link :to="{name:'productDetails',query:{goods_id:item.goods_id}}">
                    <img :src="base + item.thumbnail" />
                    <div class="text">
                       <h2>{{item.goods_name}}</h2>
                       <p>{{item.summary}}</p>
                       <div class="pay"><span >&yen;{{item.now_price}}</span><i v-if="item.is_push == 0">爆卖款</i></div>
                    </div>
                    </router-link>
                </div>
                <div v-if="finished" class="finished" >没有更多了..</div>
            </van-list>
        </div>

    </div>
</template>

<script>
import iHeader from '../components/i-header'
export default {
    components:{
        iHeader
    },
    data() {
        return {
            //域名
            base:this.$base,
            headline:'商品列表',
            ddlist: [],
            loading: false,
            finished: false,
            //当前页数
            page:1
        };
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            let opt = {
                Paging:{
                    Page:this.page,
                    Limit:8,
                },
                LikeWhere:{
                    goods_name:this.$route.params.keyword || "",
                    cat_id:this.$route.params.cat || ""
                }
            }
            this.$ajax('index/Goods/GoodsList','post',this.$sess('Condition',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD != 200){
                    if(data.ResultCD == 4003){
                        this.finished = true;
                        return
                    }
                    this.$toast(data.ErrorMsg)
                    return
                }
                if(data.Data.length == 0){
                    this.finished = true;
                    return;
                }
                data.Data.forEach(element => {
                    this.ddlist.push(element)
                });
                
                
            })
        },
        onLoad() {
            this.page += 1;
            setTimeout(() => {
                this.getList();
                this.loading = false;
            }, 500);
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.van-list{
    .finished{
        width:100%;
        text-align: center;
        line-height: 3rem;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around; 
    .alone{
        width:45%;
        border:1px @bgGray solid;
        margin-top:1rem;
        img{
            width:100%;
            vertical-align:middle;
        }
        .text{
            padding:0 0.5rem;
            line-height: 1.5rem;
            
            h2{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height:1.5rem;
            }
            p{
                max-width: 100%;
                height:1.5rem;
                overflow: hidden;
                color:@font-Sgray;
            }
            .pay{
                span{
                    color:@red;
                    font-size:@font1-25
                }
                i{
                    color:@org;
                    font-size:12px;
                    float: right;
                    border:1px @org solid;
                    line-height: 12px;
                    padding:1px;
                    border-radius: 3px;

                }
                
            }
            
        }

    }
}

</style>
