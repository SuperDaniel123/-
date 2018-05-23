<template>
    <div>
        <i-header :headline = headline :other="other"></i-header>
        <div class="content">
            <div class="xieq" v-if="addList.length == 0">还没有地址哦，添加一个吧<i class="fa fa-location-arrow"></i></div>
            <ul class="addList">
                <li v-for="(item,index) in addList" :key="index">
                    <p>{{item.shipping_name}}<span v-text="item.shipping_name"></span></p>
                    <div class="ds">{{item.province + " " + item.city + " " + item.district + " " + item.address}}</div>
                    <div class="fx">
                        <van-switch v-model="item.defaultAddress" size="20px" @change="pitchOn(index,item.defaultAddress,item)" />
                        <span @click="delAdd(index,item.address_id)"><i class="fa fa-trash-o"></i>删除</span><span><i class="fa fa-pencil" @click="goneRedact(item)"></i>编辑</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/i-header'
import {mapGetters, mapMutations} from 'vuex'
export default {
    components:{
        iHeader
    },
    computed:{
        ...mapGetters(['setMID','verify']),
    },
    created(){
        this.getList()
    },
    data(){
        return{
            headline:'地址管理',
            other:{name:'添加',url:{name:'addressEdit',params:{id:0}}},
            checked:false,
            //地址列表
            addList:[]
        }
    },
    methods:{
        ...mapMutations({
            addSed:'ADDRESSEDIT'
        }),
        //获取列表
        getList(){
            let opt = {
                actionType:'addressList',
                user_id:this.setMID.user_id
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/shopping_address/addressList','post',obj).then(res=>{
                if(res.data.ResultCD != 200){
                    this.$toast(res.data.ErrorMsg);
                    return;
                }
                for(let i = 0; i < res.data.Data.length; i++){
                    let temp = res.data.Data[i]
                    if(temp['defaultAddress'] == 1){
                        temp['defaultAddress'] = true
                    }
                    if(temp['defaultAddress'] == 0){
                        temp['defaultAddress'] = false
                    }
                }
                
                this.addList = res.data.Data
            })
        },
        //默认选中
        pitchOn(index,boon,item){
            console.log(item)
            if(!boon){
                return;
            }
            if(boon){
                for(let i = 0; i<this.addList.length; i++){
                    this.addList[i].defaultAddress = false
                }
                this.addList[index].defaultAddress = true
                let opt = {
                    actionType:'addAddress',
                    user_id:this.setMID.user_id,
                    country:'中国',
                    province:item.province,
                    city:item.city,
                    district:item.district,
                    address:item.address,
                    shipping_name:item.shipping_name,
                    shipping_phone:item.shipping_phone,
                    defaultAddress:1,
                    address_id:item.address_id
                }
                let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
                this.$ajax('/index/shopping_address/addAddress','post',obj).then(res=>{
                    if(res.data.ResultCD != 200){
                        this.$toast(res.data.ErrorMsg);
                        return;
                    }
                    this.$toast('默认地址修改成功');
                })
                
            }
        },
        delAdd(index,id){
            let opt = {
                actionType:'deleteAddress',
                user_id:this.setMID.user_id,
                address_id:id
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/shopping_address/deleteAddress','post',obj).then(res=>{
                if(res.data.ResultCD != 200){
                    this.$toast(res.data.ErrorMsg);
                    return;
                }
                this.$toast('删除成功');
                this.addList.splice(index,1)
            })
        },
        goneRedact(item){
            this.addSed(item)
            this.$router.push({
                name:'addressEdit',
                params:{
                    id:1
                }
            })
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
.xieq{
    text-align: center;
    font-size:1.1rem;
    margin-top:3rem;
    i{
        margin-left: 0.5rem;
        color:@red;
    }
}
</style>
