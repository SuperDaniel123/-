<template>
    <div>
        <form action="/">
            <van-search
                v-model="value"
                placeholder="请输入商品名称"
                show-action
                @search="onSearch"
                @cancel="onCancel"
            />
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value:''
        }
    },
    methods:{
        onSearch(){
            if(this.value == ''){
                this.$toast('请输入要搜索的关键词')
                return
            }
            this.$router.push({
                name:'proList',
                params:{
                    keyword:this.value
                }
            })
        },
        onCancel(){
            this.$router.goBack();
        }
    }
}
</script>

<style lang="less" scoped>

</style>
