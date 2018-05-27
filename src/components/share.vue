<template>
    <div class="share">
        <div @click="childClick" class="close"><i class="fa fa-close"></i></div>
        <h3 v-text="titles"></h3>
        <p v-text="describe||''"></p>
        <ul class="shareMode">
            <li class="tag-read" @click="copy" :data-clipboard-text="shareLink"><i class="fa fa-link"></i><span>链接分享</span></li>
            <li @click="qrcode"><i class="fa fa-qrcode"></i><span>二维码分享</span></li>
        </ul>
        <van-popup v-model="show"><div ref="qrcode" id="qrcode"><span class="text">复制图片分享</span></div></van-popup>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Clipboard from 'clipboard';  
import QRCode from 'qrcodejs2'  
export default {
    components:{
        Clipboard,
        QRCode
    },
    watch:{
        "show"(val,old){
            if(val == false){
                this.$refs.qrcode.innerHTML = ""
            }
        }
    },
    /*
      titles:标题
      describe:描述
    */
    data(){
        return {
            show:false
        }
    },
    props:['titles','describe'],
    computed:{
        ...mapGetters(['setMID']),
        shareLink(){
            return window.location.href + "&user_id=" + this.setMID.account
        }
    },
    mounted(){
        console.log(this.setMID)
    },
    methods:{
        //复制链接
        copy() {  
            var clipboard = new Clipboard('.tag-read')  
            clipboard.on('success', e => {  
                this.$toast('成功复制到剪切板')
                clipboard.destroy()  
            })  
            clipboard.on('error', e => {  
                this.$toast('该浏览器不支持自动复制')
                clipboard.destroy()  
            })  
        },  

        //二维码
        qrcode () {
            this.show = true
            let _this = this;
            let qrcode = new QRCode('qrcode', {  
                width: 100,  
                height: 100, // 高度  
                text: _this.shareLink, // 二维码内容  
                render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                background:'#fff' ,
                foreground: '#ff0'  
            })  
        },  
        
        //关闭
        childClick(){
            this.$emit('childByValue', false)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.share{
    .close{
        text-align: right;
        i.fa{
            font-size:1.5rem;
        }
    }
    position: fixed;
    bottom:0;
    background: #fff;
    padding:1rem;
    text-align: center;
    h3{
        font-size:1.2rem;
        color:@red;
        margin-bottom:1rem;
    }
    p{
        font-size:1rem;
        padding:0 3rem;
    }
    .shareMode{
        margin-top:1rem;
        display: flex;
        li{
            width:6rem;
            margin-right:1rem;
            i{
                font-size:2.5rem;
            }
            span{
                display: block;
                font-size:1rem;
            }
        }
    }
}

#qrcode{
    width:10rem;
    margin:0 auto;
    .text{
        line-height: 2rem;
    }
}
</style>
