<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <div class="headpint">
                <img :src="base + portrait" v-if="!flag" />
                <img :src="thenImg" v-if="flag" />
                <div class="fileBox">
                    点击上传
                    <input name="file"  type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
                </div>
                
            </div>
            <van-cell-group>
                <van-field v-model="user" label="昵称:" placeholder="请输入昵称" />
                <van-field v-model="address" label="地址:" placeholder="请填写地址" />
                <van-field v-model="phone" label="手机号:" placeholder="请输入手机号" />
            </van-cell-group>
            <div class="btn"><van-button type="primary" size="large" @click="submit">保存</van-button></div>
        </div>
        
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import iHeader from '@/components/i-header'
export default {
    components:{
        iHeader
    },
    computed:{
        ...mapGetters(['setMID']),
    },
    data(){
        return {
            //域名
            base:this.$base,


            headline:'个人信息',
            user:'',
            address:'',
            phone:'',
            portrait:'',
            //头像开关
            flag:false,
            //更换头像图片
            thenImg:'',

            file:'',
            
        }
    },
    created(){
        this.getMaterial()
    },
    methods:{
        getMaterial(){
            let opt = {
                user_id:this.setMID.user_id,
                account:this.setMID.account,
                OperationType:1000
            }
            this.$ajax('/index/Profile/profile','post',this.$sess('UserInfo',opt)).then(res=>{
                let data = res.data
                if(data.ResultCD == 200){
                    this.user = data.Data.name
                    this.address = data.Data.address
                    this.phone = data.Data.phone
                    this.portrait = data.Data.portrait
                    return;
                }
                this.$toast(data.ResultCD)
            })
        },

        update(event){
            this.file = event.target.files[0];//获取文件
            this.flag = true;
            var windowURL = window.URL || window.webkitURL;
            //创建图片文件的url
            this.thenImg = windowURL.createObjectURL(event.target.files[0]);
        },
        submit(){
            var formdata = new FormData();
            let opt = {
                user_id:this.setMID.user_id,
                account:this.setMID.account,
                OperationType:100,
                address:this.address,
                phone:this.phone,
                name:this.user,
            }
            formdata.append('portrait',this.file);
            formdata.append('UserInfo',JSON.stringify(opt))
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                }
            };
            this.axios.post('http://api.zymc.cakcc.cn:88/index/Profile/profile', formdata, config).then( (res) => {
                let data = res.data
                if(data.ResultCD == 200){
                    this.$toast('保存成功')
                    setTimeout(()=>{
                        this.$router.goBack()
                    },1000)
                    return;
                }
                this.$toast(data.ResultCD)

                }).catch((error) =>{
                    this.$toast(error)
                });
            }

        }
    }
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.headpint{
    padding:1rem;
    line-height:5rem;
    img{
        border-radius: 50%;
        width:5rem;
        height:5rem;
        vertical-align: middle;
        margin-right:1rem;
    }
    span{
        padding-left:1rem;
    }
}
.btn{
    margin-top:1rem;
    padding:1rem;
}
.van-button--primary{
    background-color:@org;
    border-color:@org
}
.fileBox{
    display: inline-block;
    position: relative;
    input{
        position: absolute;
        left: 0;
        top:0;
        opacity: 0;
    }
}
</style>
