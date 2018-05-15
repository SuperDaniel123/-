<template>
    <div>
        <div :class="bannerClass()">
            <div class="searchGone">
                <div class="circle"><i class="fa fa-search "></i>输入你想搜索的...</div>
                <div class="shopCart"><i class="fa fa-shopping-cart"></i></div>
            </div>
            <ul class="i-nav">
                <li v-for="(item,index) in navList" :key="index" @click="cutPage(index)">
                    <span v-text="item.name"></span>
                    <i :class="item.stated == 1? 'line' : '' "></i>
                </li>
            </ul>
        </div>
        <home-first v-if="index == 0"></home-first>
        <home-other v-if="index != 0"></home-other>
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
            if(val >= 200){
                this.style = 1;
            }
            if(val < 200){
                this.style = 0;
            }
        },
    },
    data(){
        return{
            navList:[
                {
                    name:'首页',
                    stated:1
                },
                {
                    name:'汽车香水',
                    stated:0
                },
                {
                    name:'底装装甲',
                    stated:0
                },
                {
                    name:'汽车外饰',
                    stated:0
                },
                {
                    name:'车载电器',
                    stated:0
                },
                {
                    name:'汽车内饰',
                    stated:0
                }
            ],
            index:0,
            scroll:'',
            //头部样式变化
            style:0
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
        li{
            text-align: center;
            flex: 1;
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
