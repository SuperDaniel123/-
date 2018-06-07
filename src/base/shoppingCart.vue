<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content" style="padding-bottom:3rem;">
            <van-checkbox-group v-model="result" @change="geta">
                <van-checkbox label-disabled v-for="(item,index) in list" :key="index" :name="item"  >
                    <van-cell-swipe :right-width="65" >
                        <div class="textBox clearfix">
                            <img :src="base + item.thumbnail" />
                            <div class="datum">
                                <h3 v-text="item.goods_name"></h3>
                                <span class="classify" v-text="item.cat_id"></span>
                                <div class="price">
                                    <span>&yen;{{item.now_price}}</span>
                                    <div class="num"><i @click="quantity(0,item.goods_id)">-</i><input  disabled="disabled" type="number" :value="item.goods_quantity" /><i @click="quantity(1,item.goods_id)">+</i></div>
                                </div>
                            </div>
                        </div>
                        <span slot="right" class="rightBtn" @click="getID(item.shopping_id)">删除</span>
                    </van-cell-swipe>
                </van-checkbox>
            </van-checkbox-group>
        </div>
        <div class="bottom">
            <van-checkbox v-model="checked" @change="checkAll">全选</van-checkbox>
            <div class="button" @click="gonePay">结算</div>
            <p class="sum">合计:<span>&yen;{{sumPri}}</span></p>
        </div>
        
        
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import { mapGetters,mapMutations } from 'vuex'
export default {
    components:{
        iHeader
    },
    created(){
        this.getCartList()
        // console.log(this.$datas)
    },
    computed:{
        ...mapGetters(['setMID','verify'])
    },
    watch:{
        'result':{
            handler(val,old){
                this.priceOr()
                this.checked = this.result.length == this.list.length? true: false;

                val.forEach(element=>{
                    if(element.is_flash_sale == 1){
                        let startTime = element.flash_sale_time.replace(/-/g,'/')
                        let timestamp = parseInt(new Date(startTime) / 1000) 
                        let nowTime = parseInt(new Date() / 1000)
                        if(nowTime < timestamp){
                            this.flag = false;
                        }
                    }else{
                        this.flag = true
                    }
                })
            },
            deep:true
        },
    },
    data(){
        return{
            //域名
            base:this.$base,
            headline:'购物车',
            //列表
            list: [],
            //记录旧列表
            // oldList:[],
            //选择好的列表
            result: [],
            //全选反选
            checked:false,
            //总价
            sumPri:0,
            flag:true
        }
    },
    methods:{
        ...mapMutations({
            order:'COFORDER'
        }),
        geta(){
            this.priceOr()
        },
        checkAll(a){
            a == true ? this.result = this.list : this.result.length == this.list.length? this.result = [] : this.result
        },
        gonePay(){
            if(this.result.length<=0){
                this.$toast('最少选择一件商品')
                return;
            }
            if(this.flag == false){
                this.$toast('商品抢购还没开始哦')
                return
            }
            this.order(this.result)
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
                    if(data.ErrorMsg == "无数据"){
                        this.list = []
                        return
                    }
                    this.$toast(data.ErrorMsg)
                    return;
                }
                this.list = data.Data
            })
        },
        priceOr(){
            let ax = this.result.map((element)=>{
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
                        this.ShoppingCartOperating(type,id)
                    }
                }
            }
            if(type == 1){
                for(let i = 0; i < this.list.length; i++){
                    let temp = this.list[i]
                    if(temp['goods_id'] == id){
                        temp['goods_quantity'] += 1
                        this.ShoppingCartOperating(type,id)
                    }
                }
            }
        },
        //操作购物车
        ShoppingCartOperating(types,goodsId){
            let opt ={
                user_id:this.setMID.user_id,
                goods_id:goodsId,
                goods_quantity:1
            }
            if(types == 0){
                opt['OperationType'] = 'setDec'
            }
            let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/Shopping_Cart/ShoppingCartOperating','post',obj).then(res=>{
                // console.log(res)
            })
            
        },
        getID(id){
            let opt = {
                shopping_id:id
            }
            let obj = Object.assign(this.$sess('Condition',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/Shopping_Cart/ShoppingCartDel','post',obj).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    this.$toast('删除成功')
                    this.getCartList()
                    return;
                }
                this.$toast(data.ResultCD)
            })
        },

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
    background: #fff;
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
    .button{
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
.rightBtn{
    line-height: 9rem;
    display: block;
    width:65px;
    text-align: center;
    background: @red;
    color:#fff;
}
</style>
