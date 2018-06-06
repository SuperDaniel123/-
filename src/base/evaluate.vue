<template>
    <div>
        <i-header :headline = headline></i-header>
        <div class="content">
            <ul class="evaluateList">
                <li v-for="(item,index) in list" :key="index">
                    <div class="topSeal">
                        <img :src="base + item.goods_thumbnail" />
                        <van-rate v-model="star[index]" />
                        <span v-text="starText(star[index])"></span>
                    </div>
                    <van-cell-group>
                        <van-field v-model="commentList[index]" type="textarea" placeholder="请输入评论" rows="2" autosize />
                    </van-cell-group>
                    <div class="imagesBox">
                        <ul class="clearfix">
                            <li v-for="(item,i) in imagesList[index]" :key="i">
                                <img :src="item" />
                            </li>
                            <li class="fileBox" @click="id = index">
                                <i class="fa fa-plus fa-2x"></i>
                                <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update" multiple/>
                            </li>
                        </ul>
                        <button class="btn" @click="submitEva(index)">提交</button>
                    </div>
                    
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {mapGetters,mapMutations} from 'vuex'
export default {
    components:{
        iHeader
    },
    computed:{
        ...mapGetters(['setMID','verify','discuss']),
        list(){
            return this.discuss.goodsList
        }
    },
    created(){
        if(this.discuss == "" || !this.discuss){
            this.$toast('参数错误');
            this.$router.goBack();
        }

        this.starCreat()
        console.log(this.discuss)
    },
    data(){

        return {
            //域名
            base:this.$base,
            headline:'商品评价',

            //星星
            star:[],
            commentList:[],
            //照片
            imagesList:[],
            thenImgUrl:[],

            //索引
            id:''

        }
    },
    methods:{
        ...mapMutations({
            dis:'DISCUSS',
            skips:'SKIP'
        }),
        //创建评分
        starCreat(){
            for(let i = 0; i< this.discuss.goodsList.length; i++){
                this.star.push(4)
                this.commentList.push('')
                this.imagesList.push([])
                this.thenImgUrl.push([])
            }
        },
        starText(num){
            switch(num){
                case 1 :{
                    return '差评'
                    break;
                }
                case 2 :{
                    return '一般'
                    break;
                }
                case 3 :{
                    return '还不错'
                    break;
                }
                case 4 :{
                    return '很好'
                    break;
                }
                case 5 :{
                    return '非常好'
                    break;
                }
            }
        },
        update(event){
            let id = this.id
            let file = event.target.files;//获取文件
            console.log(file)
            for(let i = 0; i<file.length;i++){
                let fileSize = file[i].size;
                let size = fileSize / 1024 / 1024;
                if(size > 1){
                    alert('图片不能大于1M')
                    return;
                }
                this.thenImgUrl[id].push(file[i])
                let reader = new FileReader();
                reader.readAsDataURL(file[i]);
                reader.onload = (e)=>{
                    this.imagesList[id].push(e.srcElement.result)
                }
            }
        },
        submitEva(index){
            var formdata = new FormData();
            let opt = {
                user_id:this.setMID.user_id,
                goods_id:this.discuss.goodsList[index].goods_id,
                star_level:this.star[index],
                content:this.commentList[index],
                orders_id:this.discuss.orders_id
            }
            formdata.append('picture',this.thenImgUrl[index]);
            formdata.append('Condition',JSON.stringify(opt));
            formdata.append('verify',JSON.stringify(this.verify));
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                }
            };
            this.axios.post('http://api.zymc.cakcc.cn:88/index/Goods_Comments/CommentsAdd', formdata, config).then( (res) => {
                let data = res.data
                if(data.ResultCD == 200){
                    this.$toast('保存成功')
                    setTimeout(()=>{
                        this.skips(1)
                        this.$router.push('/')
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
.evaluateList{
    li{
        padding:1rem 0;
        .topSeal{
            padding:0 1rem;
            line-height: 30px;
            height:30px;
            img{
                width:30px;
                height:30px;
                object-fit: cover;
                float: left;
                vertical-align: initial
            }
            .van-rate{
                float: left;
                margin-left:20px;
                height:30px;
                padding-top:5px;
                box-sizing: border-box;
            }
            span{
                float: right;
                font-size:1.1rem;

            }
        }
    }
    .imagesBox{
        margin:1rem;
        text-align: center;
        ul{
            li{
                float:left;
                margin-right:1rem;
                padding:0;
                width:5rem;
                height:5rem;
                img {
                    width:5rem;
                    height:5rem;
                    object-fit: cover;
                    vertical-align: middle;
                    border-radius: 10px;
                }
            }
            li.fileBox{
                text-align: center;
                position: relative;
                line-height: calc(5rem - 8px);
                border:4px dotted #999;
                box-sizing: border-box;
                border-radius: 10px;
                i{
                    vertical-align: middle;
                }
                input[type="file"]{
                    width:100%;
                    height:100%;
                    position: absolute;
                    top:0;
                    left: 0;
                    opacity: 0;
                }
            }
        }
        .btn{
            width:100px;
            color:@white;
            background: @org;
            height:25px;
            margin-top:1rem;
            border-radius: 10px;
            font-size:14px;
        }

    }
}

</style>

