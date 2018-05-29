<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="200">
                <ul class="otherList">
                    <li v-for="(item,index) in ddlist" :key="index">
                        <router-link :to="{path:'/productDetails',query:{goods_id:item.goods_id,special:'1'}}">
                            <img :src="base + item.rectangle_thumbnail" />
                            <div class="text">
                                <p v-text="item.goods_name"></p>
                                <span>&yen;{{item.now_price}}</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </router-link>
                    </li>
                </ul>
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
                actionType:'goodsSpecial',
                page:this.page,
                limit:8,
            }
            this.$ajax('/index/goods/specialGoods','post',this.$sess('info',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD != 200){
                    if(data.ResultCD == 4003){
                        this.finished = true;
                        return
                    }
                    this.$toast(data.ErrorMsg)
                    return
                }
                data.Data.forEach(element => {
                    this.ddlist.push(element)
                });
                this.finished = true;
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
}

</style>
