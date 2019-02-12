<template>
    <div class="xfn-dish-delete">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>删除菜品</el-breadcrumb-item>
        </el-breadcrumb>  

        <br>

        <el-card>
            <div slot="header" class="clearfix">
                <span>根据编号删除菜品：</span>
            </div>
            <div>
                <el-form label-width="125px">
                    <el-form-item label="菜品编号：">
                        <el-input v-model="dishDid" placeholder="请输入菜品编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" size="small" @click="doDelete(1)">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>  

         <el-card>
            <div slot="header" class="clearfix">
                <span>根据名称删除菜品：</span>
            </div>
            <div>
                <el-form label-width="125px">
                    <el-form-item label="菜品名称：">
                        <el-input v-model="dishName" placeholder="请输入菜品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" size="small" @click="doDelete(2)">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>  

    </div>       
</template>

<script>
export default {
    data(){
        return {
            dishDid:'',
            dishName:''
        }
    },

    methods:{
        doDelete(index){
            var did=this.dishDid;
            var title=this.dishName;

            if(index==1){
                 var url=this.$store.state.globalSettings.apiUrl+'/admin/dish/id/'+did;
                 console.log
            }else if(index==2){
                var url=this.$store.state.globalSettings.apiUrl+'/admin/dish/dishName/'+title;
            }
            this.$axios.delete(url).then((res)=>{
                if(res.data.code==200){
                    this.$message.success('菜品删除成功！');
                    this.dishDid='';
                    this.dishName='';
                }else{
                    this.$message.error('菜品删除失败！');
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss">
    .xfn-dish-delete{
        font-size: 14px;
    }

</style>

