<template>
    <div>
        <div :class="bannerClass()">
            <div class="searchGone">
                <div class="circle"><i class="fa fa-search "></i>输入你想搜索的...</div>
                <router-link class="shopCart" to="/shoppingCart"><i class="fa fa-shopping-cart"></i></router-link>
            </div>
            <ul class="i-nav">
                <li v-for="(item,index) in navList" :key="index" @click="cutPage(index)">
                    <span v-text="item.cat_name"></span>
                    <i :class="item.stated == 1? 'line' : '' "></i>
                </li>
            </ul>
        </div>
        <home-first v-if="index == 0" :cat="cat_id"></home-first>
        <home-other v-if="index != 0" :cat="cat_id"></home-other>
    </div>
</template>

<script>
import homeFirst from '@/base/homeFirst'
import homeOther from '@/base/homeOther'
export default {
    components:{
        homeFirst,
        homeOther
    },
    watch:{
        'scroll'(val,old){
            if(val >= 150){
                this.style = 1;
            }
            if(val < 150){
                this.style = 0;
            }
        },
        'index'(val,old){
            this.cat_id = this.navList[val].cat_id
        }
    },

    created(){
        this.getNav()
    },
    data(){
        return{
            
            navList:[],
            index:0,
            scroll:'',
            //头部样式变化
            style:0,
            //当前导航类型
            cat_id:''
        }
    },
    methods:{
        cutPage(index){
            for(let i = 0; i < this.navList.length; i++){
                this.navList[i].stated = 0
            }
            this.navList[index].stated = 1
            this.index = index
        },
        menu() {
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        },
        bannerClass(){
            if(this.index != 0){
                return 'homeTop see'
            }
            return this.style == 0? 'homeTop':'homeTop see'
        },

        //获取导航
        getNav(){
            this.$ajax('/index/Goods/GoodsCat','post',this.$sess('Condition', {status : 0})).then(res=>{
                let data = res.data.Data
                this.navList = data
                this.cat_id = data[0].cat_id
            })
        }
    },
    mounted(){
        window.addEventListener('scroll', this.menu)
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.homeTop{
    transition: all 0.3s;
    position:fixed;
    top:0;
    left: 0;
    z-index: 999;
    width:100%;
    padding:0 1rem 5px 1rem;
    box-sizing: border-box;
    .searchGone{
        width:100%;
        height:40px;
        .circle{
            float: left;
            width:calc(100% - 40px);
            height:30px;
            line-height: 30px;
            box-sizing: border-box;
            padding:0 15px;
            background: @white;
            margin:5px 0;
            border-radius: 15px;
            .fa{
                font-size:16px;
                margin-right:10px;
            }
        }
        .shopCart{
            display:inline-block;
            width:30px;
            margin:5px 0;
            height:30px;
            text-align: center;
            line-height: 30px;
            background: @white;
            float: right;
            border-radius: 50%;
            .fa{
                font-size:18px;
            }
        }
    }
    .i-nav{
        width:100%;
        display: flex;
        flex-wrap:wrap;
        li{
            text-align: center;
            padding:0 0.5rem;
            position:relative;
            line-height: 30px;
            color:@white;
            i{
                width:0;
                height:2px;
                position: absolute;
                bottom:0;
                background: @white;
                left:50%;
                border-radius: 2px;
            }
            .line{
                transition: all 0.2s;
                width:15px;
                margin-left:-7.5px;
            }
        }
    }
}

.homeTop.see{
    transition: all 0.3s;
    background: @white;
    .circle{
        background: @bgGray;
    }
    .shopCart{
        background: @bgGray;
    }
    .i-nav{
        li{
            color:@font-Sgray;
            i{
                background: @font-Sgray;
            }
        }
    }
}

</style>
