<template>
    <div>
        <i-header :headline = headline :other="other"></i-header>
        <div class="content">
            <ul class="addList">
                <li>
                    <p>李某某<span>13690222222</span></p>
                    <div class="ds">地址地址地址地址地址地址地址地址</div>
                    <div class="fx">
                        <van-switch v-model="checked" />
                        <span><i class="fa fa-trash-o"></i>删除</span><span><i class="fa fa-pencil"></i>编辑</span>
                    </div>
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
            headline:'地址管理',
            other:{name:'添加',url:'/addressEdit'},
            checked:false
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.addList{
    padding:0 1rem;
    li{
        padding:1rem 0 0.5rem 0;
        .bottomRim;
        p{
            font-size:@font1;
            line-height: 1.5rem;
            span{
                float: right;
            }
        }
        .ds{
            font-size:12px;
            color:@font-Sgray;
        }
        .fx{
            margin-top:1rem;
            line-height: 2rem;
            span{
                float: right;
                font-size:12px;
                color:@font-Sgray;
                margin-left: 2rem;
                i{
                    padding-right:0.2rem;
                }
            }
        }
    }
}
</style>
