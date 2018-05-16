<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-checkbox-group v-model="result" @change="geta">
                <van-checkbox label-disabled v-for="(item,index) in list" :key="index" :name="item"  >
                    <div class="textBox clearfix">
                        <img src="@/common/images/banner.jpg" />
                        <div class="datum">
                            <h3>卡通车用腰靠毛绒抱枕空调被两用抱枕午睡毯</h3>
                            <span class="classify">汽车内饰</span>
                            <div class="price">
                                <span>&yen;59.90</span>
                                <div class="num"><i>-</i><input type="number" value="1" /><i>+</i></div>
                            </div>
                        </div>
                    </div>
                </van-checkbox>
            </van-checkbox-group>
        </div>
        <div class="bottom">
            <van-checkbox v-model="checked" @change="checkAll">全选</van-checkbox>
            <input type="button" value="结算"  @click="gonePay"/>
            <p class="sum">合计:<span>&yen;0元</span></p>
        </div>
        
        
    </div>
</template>

<script>
import iHeader from '../components/i-header'
export default {
    components:{
        iHeader
    },
    watch:{
        'result':{
            handler(val,old){
                this.checked = this.result.length == this.list.length? true: false
            },
            deep:true
        }
    },
    data(){
        return{
            headline:'购物车',
            //列表
            list: [{a:'a'}, 'b', 'c'],
            //选择好的列表
            result: [],
            //全选反选
            checked:false
        }
    },
    methods:{
        geta(a){
            // console.log(a)
        },
        checkAll(a){
            a == true ? this.result = this.list : this.result.length == this.list.length? this.result = [] : this.result
        },
        gonePay(){
            if(this.result.length<=0){
                this.$toast('最少选择一件商品')
                return;
            }
            this.$router.push('/payment')

        }
    }
}
</script>

<style lang="less">
@import '../common/css/common.less';
.van-checkbox-group{
    padding-left:1rem;
    .van-checkbox{
        position: relative;
        padding:1rem 0;
        .bottomRim;
        .van-checkbox__icon{
            position: absolute;
            top:50%;
            margin-top:-10px;
        }
        .van-checkbox__label{
            width:calc(100% - 40px);
            margin-left:30px;
            overflow: hidden;
        }
    }
    
    .textBox{
        img{
            float: left;
            width:9rem;
            height:9rem;
            vertical-align: middle;
            object-fit: cover;
        }
        .datum{
            line-height: 1.5rem;
            width:100%;
            height:9rem;
            padding-left:10rem;
            box-sizing: border-box;
            position: relative;
            h3{
                font-size:1.1rem;
            }
            span.classify{
                font-size:12px;
                color:@font-Sgray;
            }
            .price{
                position: absolute;
                bottom:0;
                line-height: 2rem;
                >span{
                    font-size:@font1;
                    color:@org
                }
                .num{
                    margin-left: 1.5rem;
                    float: right;
                    text-align: center;
                    input{
                        float: left;
                        width:3rem;
                        height:2rem;
                        font-size:1.2rem;
                        text-align: center;
                    }
                    i{
                        float: left;
                        font-size:1.5rem;
                        width:2rem;
                        display: inline-block;
                        
                    }
                }
                
            }
            
        }
    }
}
.bottom{
    border-top:1px solid @borderColor;
    position: fixed;
    bottom: 0;
    left: 0;
    width:100%;
    line-height: 40px;
    height:40px;
    padding-left:1rem;
    box-sizing: border-box;
    font-size:@font1;
    .van-checkbox{
        display: inline-block;
    }
    input[type='button']{
        float: right;
        width:100px;
        background: @org;
        color:@white;
        text-align: center;
    }
    .sum{
        font-size:@font1-25;
        float: right;
        margin-right:@font1-5;
        span{
            color:@red;
            padding-left:0.5rem;
        }
    }
    
}
</style>
