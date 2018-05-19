<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <van-checkbox-group v-model="result" @change="geta">
                <van-checkbox label-disabled v-for="(item,index) in list" :key="index" :name="item"  >
                    <div class="textBox clearfix">
                        <img :src="base + item.thumbnail" />
                        <div class="datum">
                            <h3 v-text="item.goods_name"></h3>
                            <span class="classify" v-text="item.cat_id"></span>
                            <div class="price">
                                <span>&yen;{{item.now_price}}</span>
                                <div class="num"><i @click="quantity(0,item.goods_id)">-</i><input type="number" :value="item.goods_quantity" /><i @click="quantity(1,item.goods_id)">+</i></div>
                            </div>
                        </div>
                    </div>
                </van-checkbox>
            </van-checkbox-group>
        </div>
        <div class="bottom">
            <van-checkbox v-model="checked" @change="checkAll">全选</van-checkbox>
            <input type="button" value="结算"  @click="gonePay"/>
            <p class="sum">合计:<span>&yen;{{sumPri}}</span></p>
        </div>
        
        
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import { mapGetters } from 'vuex'
export default {
    components:{
        iHeader
    },
    created(){
        this.getCartList()
    },
    computed:{
        ...mapGetters(['setMID','verify'])
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
            //域名
            base:this.$base,

            headline:'购物车',
            //列表
            list: [],
            //选择好的列表
            result: [],
            //全选反选
            checked:false,
            //总价
            sumPri:0
        }
    },
    methods:{
        geta(a){
            this.priceOr(a)
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

        },
        getCartList(){
            let opt = {
                Where:{
                    user_id:this.setMID.user_id
                }
            }
            let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/Shopping_Cart/ShoppingCartList','post',obj).then(res=>{
                let data = res.data;
                if(data.ResultCD != 200){
                    this.$toast(data.ErrorMsg)
                    return;
                }
                this.list = data.Data
            })
        },
        priceOr(a){
            let ax = a.map((element)=>{
                return +element.now_price * element.goods_quantity
            })
            let sum = 0;
            for(let i = 0; i <ax.length; i++){
                sum += +ax[i]
            }
            this.sumPri = sum
        },
        quantity(type,id){
            
            if(type == 0){
                for(let i = 0; i < this.list.length; i++){
                    let temp = this.list[i]
                    if(temp['goods_id'] == id){
                        if(temp['goods_quantity'] == 1){
                            return
                        }
                        temp['goods_quantity'] -= 1
                    }
                }
            }
            if(type == 1){
                for(let i = 0; i < this.list.length; i++){
                    let temp = this.list[i]
                    if(temp['goods_id'] == id){
                        temp['goods_quantity'] += 1
                    }
                }
            }
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
