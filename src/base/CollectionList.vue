<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="clist">
                <li v-for="(item,index) in collectList" :key="index">
                    <router-link :to="{name:'productDetails',query:{goods_id:item.goods_id}}">
                        <img :src="base + item.goods_info.thumbnail" />
                        <div class="text">
                            <h3 v-text="item.goods_info.goods_name"></h3>
                            <p>&yen;{{item.goods_info.now_price}}</p>
                        </div>
                    </router-link>
                    <span class="del" @click="delCollect(item.collection_id,index)">删除收藏</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import {mapGetters} from 'vuex'
export default {
    components:{
        iHeader
    },
    computed:{
        ...mapGetters(['setMID','verify']),
    },
    created(){
        this.getCollectList()
    },
    data(){
        return{
            //域名
            base:this.$base,
            headline:'收藏夹',
            collectList:[]
        }
    },
    methods:{
        getCollectList(){
            let opt = {
                Where:{
                    user_id:this.setMID.user_id
                }
            }
            let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/Goods_Collection/CollectionList','post',obj).then(res=>{
                let data = res.data
                this.collectList = data.Data
            })
        },
        delCollect(id,index){
            let opt = {
                collection_id:id
            }
            let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/Goods_Collection/CollectionCancel','post',obj).then(res=>{
                if(res.data.ResultCD != 200){
                    this.$toast(res.data.ErrorMsg);
                    return;
                }
                this.$toast('删除成功');
                this.collectList.splice(index,1)
                
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.clist{
    padding:0 1rem;
    li{
        position: relative;
        padding:1rem 0;
        height:9rem;

        .bottomRim;
        img{
            width:9rem;
            height:9rem;
            object-fit: cover;
            border:1px solid #f0f0f0;
            border-radius: 5px;
            position: absolute;
            top:1rem;
            left: 0;
        }
        .text{
            margin-left: 10rem;
            padding:0.5rem 0;
            h3{
                overflow : hidden;
                font-size:@font1;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            p{
                color:@red;
                font-size:@font1-25;
                margin-top:1rem;
            }
        }
        .del{
            position: absolute;
            color:@font-Sgray;
            right:0.5rem;
            bottom:1rem;
        }
    }
}
</style>
