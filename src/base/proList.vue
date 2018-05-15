<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-list v-model="loading" :finished="finished" @load="onLoad" offset="100">
                <div class="alone" v-for="(item,index) in list" :key="index">
                    <img src="../common/images/logo.png" />
                    <div class="text">
                       <h2>发送到发送到发送到发送到发斯蒂芬</h2>
                       <p>描述描述描述</p>
                       <div class="pay"><span >&yen;38.00</span><i>爆卖款</i></div>
                    </div>
                </div>
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
            headline:'商品列表',
            list: [],
            loading: false,
            finished: false
        };
    },
    methods:{
        onLoad() {
            setTimeout(() => {
                for (let i = 0; i < 8; i++) {
                this.list.push(this.list.length + 1);
                }
                this.loading = false;

                if (this.list.length >= 40) {
                this.finished = true;
                }
            }, 500);
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.van-list{
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
