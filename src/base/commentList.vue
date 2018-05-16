<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="discuss">
                <li>
                    <span class="nameid">用户名</span><time>2018-5-15</time>
                    <p>评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论</p>
                </li>
                <li>
                    <span class="nameid">用户名</span><time>2018-5-15</time>
                    <p>评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
export default {
    components:{
        iHeader
    },
    data(){
        return{
            headline:'评论'
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.discuss{
    padding:1rem 0 1rem 1rem;
    li{
        margin-bottom: 1rem;
        padding-right:1rem;
        .bottomRim;
        span.nameid{
            font-size:1.2rem;
        }
        time{
            color:@font-Sgray;
            margin-left:1rem;
        }
        p{
            line-height: 1.5rem;
            padding:0.5rem 0;
        }
    }
}
</style>
