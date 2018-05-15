<template>
  <div class="footer">
      <ul class="nav">
          <li :class="[item.state == '1'? 'fontBlue' : '']" v-for="(item,index) in this.navList" :key="index" @click="switchItem(index)"><i :class="'fa '+ item.icon"></i><span v-text="item.name"></span></li>
      </ul>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
export default {
  name:'ifooter',
    watch:{
        'indexStateS'(val,old){
            this.switchItem(val)
        }
    },
    computed:{
        ...mapGetters(['indexStateS'])
    },
    mounted(){
        this.switchItem(this.indexStateS)
    },
    data(){
        return{
            navList:[
                {
                    name:'首页',
                    icon:'fa-home',
                    state:'1'
                },
                {
                    name:'弹个车',
                    icon:'fa-car',
                    state:'0'
                },
                {
                    name:'新闻',
                    icon:'fa-newspaper-o',
                    state:'0'
                },
                {
                    name:'我的',
                    icon:'fa-user',
                    state:'0'
                }
            ]
        }
    },
    methods:{
        ...mapMutations({
            indexState:"INDEX_STATE"
        }),
        switchItem(e){
            let item = this.navList;
            for(let i = 0 ; i < item.length ; i++){
                item[i].state = '0';
            }
            item[e].state = '1';
            this.navList = item;
            this.indexState(e)

        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
    .footer{
        position: fixed;
        bottom:0;
        left: 0;
        background: #fff;
        z-index: 1111;
        border-top:1px solid @bgGray;
        width:100%;
        height:50px;
        ul.nav{
            display: flex;
            li{
                transition: all 0.2s;
                height:50px;
                box-sizing: border-box;
                padding:5px 0;
                flex: 1;
                text-align: center;
                color:#cecece;
                span{
                    display: inline-block;
                    width:100%;
                }
                i{
                    font-size:20px;     
                }
            }
            .fontBlue{
                transition: all 0.2s;
                color:@org
            }
        }
    }
</style>
