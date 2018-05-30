<template>
    <div class="login">
            <div class="loginTest">
                <img class="logo" src="@/common/images/logoindex.png" alt="logo" />
                <div class="input" v-if="state==0">
                    <input type="number" name="userPhone" placeholder="请输入手机" v-model="userPhone" />
                    <input type="password" name="password" placeholder="请输入密码" v-model="password" />
                    <div class="otherOper clearfix"><span @click ="getToken(1)">忘记密码</span><span @click ="getToken(2)">注册账号</span></div>
                    <input type="button" name="Submit" value="登录" @click="getLogin" />
                </div>
                <!--忘记密码-->
                <div class="input" v-if="state==1">
                    <input type="number" placeholder="请输入手机" v-model="forgetUser"/>
                    <div class="aCode">
                        <input type="number" placeholder="请输入验证码" v-model="authCode"/>
                        <input type="button" :class="disabled == false? 'btnCode blue':'btnCode gray'" :disabled = disabled @click="getCode(forgetUser)" v-model="sdCode" />
                    </div>
                    <input type="password" name="password" placeholder="请输入新密码" v-model="newPwd" />
                    <div class="otherOper clearfix"><span @click ="state = 0">登录</span></div>
                    <input type="button" @click="forget_pwd()" name="Submit" value="完成" />
                </div>
                <!--注册-->
                <div class="input" v-if="state==2">
                    <input type="text" placeholder="推荐人，如果没有可不填" v-model="referrer" disabled v-if="!disableds"/>
                    <input type="text" placeholder="推荐人，如果没有可不填" v-model="referrer" v-if="disableds"/>
                    <input type="number"  placeholder="请输入手机" v-model="registerPhone" />
                    <input type="password" placeholder="请输入密码" v-model="enrollPwd" />
                    <div class="aCode">
                        <input type="number" placeholder="请输入验证码" v-model="authCode"/>
                        <input type="button" :class="disabled == false? 'btnCode blue':'btnCode gray'" :disabled = disabled @click="getCode(registerPhone)" v-model="sdCode" />
                    </div>
                    <div class="otherOper clearfix"><span @click ="state = 0">登录</span></div>
                    <input type="button" @click="reg()" name="Submit" value="注册" />
                </div>


                <!--填写资料-->
                <van-popup class="popupBox" v-model="show" position="right" >
                    <div @click="show=false" class="icons"><i class="fa fa-angle-left fa-2x"></i></div>
                    <van-uploader :after-read="onRead">
                        <img class="portrait" v-if="portrait!=''" :src="portrait" alt="logo" style="margin-top:5rem;" />
                        <img class="portrait" v-if="portrait==''" src="@/common/images/user.png" alt="logo" style="margin-top:5rem;" />
                    </van-uploader>
                    <div class="input" v-if="state!=1">
                        <input type="type" name="nickname" placeholder="请输入昵称" v-model="nickname" />
                        <input type="type" name="address" placeholder="请输入地址" v-model="address" />
                        <div @click="sexShow = true"><input type="text" disabled="disabled" placeholder="请选择性别" v-model="gender" /></div>
                        <input type="button" name="Submit" value="提交" @click="submitData" />
                    </div>
                </van-popup>
                <van-popup position="bottom"  v-model="sexShow">
                    <van-picker show-toolbar  title="标题" :columns="columns" @cancel="sexShow = false" @confirm="onConfirm" />
                </van-popup>
                
            </div>
            
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { setInterval, clearInterval } from 'timers';
import md5 from 'js-md5';
export default {
    name:'login',
    components:{
        md5
    },
    beforeCreate(){
        localStorage.removeItem('time')
    },
    computed:{
        disableds(){
            return this.referrer == ''? true:false
        }
    },
    data(){
        return{ 
            token:'',
            //用户id
            userID:'',
            userPhone:localStorage.getItem('userName') || '',
            password:'',
            //0 是登录，1是忘记密码, 2是注册
            state:0,
            
            //验证码按钮 
            sdCode:'获取验证码',
            //禁用状态
            disabled:false,
            //验证码
            authCode:'',
            //忘记密码
            forgetUser:'',
            newPwd:'',
            //注册
            referrer:sessionStorage.getItem('referrer')||"",
            registerPhone:'',
            enrollPwd:'',

            //验证码token
            messageToken:'',

            //资料开关
            show:false,
            //完善资料
            nickname:'',
            address:'',
            gender:'',


            //选择性别
            sexShow:false,
            columns: ['男', '女'],

            portrait:''
            
        }
    },
    methods:{
        ...mapMutations({
            setMID:'SET_MID',
            verify:'VERIFY',
            isLogin:'IS_LOGIN'
        }),
        //上传头像
        onRead(file) {
            console.log(file)
            this.portrait = file.content
        },
        //提交个人资料
        submitData(){
            
            if(this.nickname =="" || this.address =="" || this.gender == ""){
                alert('资料不能为空')
                return
            }
            let accounts = this.state == 0? this.userPhone : this.registerPhone
            let passwords = this.state == 0? this.password : this.enrollPwd
            let opt = {
                user_id:this.userID,
                account:accounts,
                name:this.nickname,
                gender:this.gender == '女'? 0:1,
                password:passwords,
                address:this.address,
                OperationType:100,
                portrait:this.portrait
            }
            this.$ajax('/index/Profile/profile','post',this.$sess('UserInfo',opt)).then(res=>{
                if(res.data.ResultCD == 200){
                    this.$toast('提交成功')
                    this.state = 0
                    this.show = false;
                    this.registerPhone = this.password = this.enrollPwd = ""
                    sessionStorage.removeItem('referrer')
                    this.referrer = ""
                    return
                }
                this.$toast(res.data.ResultCD)
            })

        },
        //选择性别函数
        onConfirm(value){
            this.gender = value
            this.sexShow = false
        },

        //登录函数
        getLogin(){
            let opt = {
                account:this.userPhone,
                password:md5(this.password)
            }
            this.$ajax('/index/Login/login','post',this.$sess('UserInfo',opt)).then(res=>{
                let data = res.data;
                if(this.userPhone == ''){
                    this.$toast('请输入用户名')
                    return;
                }else if(this.password == ''){
                    this.$toast('密码不能为空')
                    return;
                }
                switch(data.ResultCD){
                    case 200 :{
                        this.$toast('登录成功')
                        localStorage.setItem('MID',JSON.stringify(data.Data))
                        localStorage.setItem('userName',this.userPhone)
                        this.verify(JSON.parse(localStorage.getItem('MID')))
                        this.setMID(JSON.parse(localStorage.getItem('MID')))
                        localStorage.setItem('time',Date.parse(new Date()) + (45*60*1000))
                        setTimeout(()=>{
                            this.$router.push({
                                path:'/'
                            })
                        },1000)
                        break;
                    }

                    case 4005 :{
                        this.$toast(data.ErrorMsg)
                        this.userID = data.Data.user_id;
                        setTimeout(res=>{
                            this.show = true;
                        },1000)
                        break;
                    }
                    default:{
                        this.$toast(data.ErrorMsg)
                        break;
                    }
                }
            })

        },
        getToken(id){
            this.state = id
        },
        //计时器
        countDown(){
            var i = 60
            let times = setInterval(()=>{
                this.sdCode = --i + '秒重新获取'
                if(i<0){
                    clearInterval(times)
                    this.disabled = false;
                    this.sdCode = '获取验证码'
                }
            },1000)
        },
        //获取验证码
        getCode(code){
            if(code == '' && code.length != 11){
                this.$toast('请输入正确手机号')
                return;
            }
            let opt ={
                actionType:'getMessageCode',
                phone_number:code
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/message/sendMessage','post',obj).then(res=>{
                if(res.data.ResultCD != 200){
                    this.$toast.fail(res.data.ErrorMsg);
                    return
                }
                this.$toast('验证码已发送到手机上')
                this.messageToken = res.data.Data.message_token
                this.countDown()
                this.disabled = true
                return;
            })
        },
        
        forget_pwd(){
            let opt={
                actionType:'forgetPw',
                account:this.forgetUser,
                NewsPwd:md5(this.newPwd),
                message_token:this.messageToken,
                message_code:this.authCode
            }
            if(!opt.NewsPwd){
                this.$toast('密码不能为空')
                return;
            }
            let obj = Object.assign(this.$sess('info',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/user/forget_pwd','post',obj).then(res=>{
                if(res.data.ResultCD =! 200 || !res.data.ResultCD){
                    this.$toast.fail(data.ErrorMsg);
                    return
                }
                this.$toast.success('操作成功')
                this.state = 0;
                this.authCode = this.forgetUser = this.newPwd = ''
            })
        },
        reg(){
            let opt = {
                actionType:'regUser',
                account:this.registerPhone,
                password:md5(this.enrollPwd),
                p_account:this.referrer,
                message_token:this.messageToken,
                message_code:this.authCode
            }
            if(!opt.account){
                this.$toast('请输入手机')
                return;
            }
            if(!opt.password){
                this.$toast('密码或确认密码不能为空')
                return;
            }
            let obj = Object.assign(this.$sess('UserInfo',opt),this.$sess('verify',this.verify))
            this.$ajax('/index/user/reg','post',obj).then(res=>{
                let data = res.data;
                if(data.ResultCD == 200){
                    this.$toast.success('注册成功,进一步完善资料')
                    this.authCode = ''
                    let opt1 = {
                        account:opt.account,
                        password:opt.password
                    }
                    this.$ajax('/index/Login/login','post',this.$sess('UserInfo',opt)).then(res=>{
                        if(res.data.ResultCD == 4005){
                            this.userID = res.data.Data.user_id
                        }else{
                            this.state = 0;
                            this.$toast.success('请重新登录完善资料')
                            return;
                        }
                    })
                    setTimeout(()=>{
                        this.show = true
                    },500)
                    return
                }
                this.$toast.fail(data.ErrorMsg);
            })
        }
    }
  
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.loginTest{
    text-align: center;
    position: absolute;
    top:10%;
    width:100%;
    .logo{
        width:200px;
        vertical-align: middle;
    }
    div.input{
        margin: 2rem auto 0 auto;
        width:65%;
        input{
            font-family: '微软雅黑';
            width:100%;
            background:@bgGray;
            line-height: 3rem;
            text-indent: 1rem;
            font-size:@font1;
            border:none;
            color:@font-Lgray;
            border-radius: 0.5rem;
            margin-bottom: @font1;
        }
    }
    .otherOper{
        color:@font-Sgray;
        margin-bottom: @font1;
        span:nth-of-type(1){
            float: left;
        }
        span:nth-of-type(2){
            float: right;
        }
    }
    input[name="Submit"]{
        width:12rem;
        height:3rem;
        border-radius: 0.5rem;
        background: @yellow !important;
        color:@white !important;
        text-indent: 0 !important;
    }
}
.aCode{
    position: relative;
    input[type="button"].btnCode{
        width:auto !important;
        text-indent: 0 ;
        padding:0 0.5rem !important;
        line-height: 2rem;
        position: absolute ;
        right:0.5rem ;
        top:0.5rem 
    }
    input[type="button"].btnCode.blue{
        border:1px solid @yellow;
        background: @yellow;
        color:@white;
    }
    input[type="button"].btnCode.gray{
        background: @white;
        color:#666666;
        border:1px solid #cacaca;
    }
}

.popupBox{
    width:100%;
    height:100%;
    .icons{
        width:3rem;
        height:3rem;
        text-align: center;
        line-height: 3rem;
        i{
            vertical-align: middle;
        }
    }
}
.portrait{
    width:10rem;
    height:10rem;
    object-fit: cover;
}
</style>
