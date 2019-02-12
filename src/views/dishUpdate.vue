<template>
    <div class="xfn-dish-update">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>修改菜品</el-breadcrumb-item>
        </el-breadcrumb>  
        <br>
        <el-card>
            <div slot="header" class="clearfix">
                <span>请填写需要修改的内容：</span>
            </div>
            <div>
                <el-form label-width="125px">
                    <el-form-item label="菜品编号：">
                        <el-input v-model="formData.dishId" placeholder="编号为必填！"></el-input>
                    </el-form-item>

                    <el-form-item label="菜品名称：">
                        <el-input v-model="formData.dishName" placeholder="修改菜品名称"></el-input>
                    </el-form-item>

                    <el-form-item label="图片名称：">
                        <el-input v-model="formData.imgUrl" placeholder="修改图片名称"></el-input>
                    </el-form-item>

                    <el-form-item label="菜品价格：">
                        <el-input v-model="formData.price" placeholder="修改菜品价格"></el-input>
                    </el-form-item>

                    <el-form-item label="菜品详情：">
                        <el-input v-model="formData.detail" placeholder="修改菜品详情"></el-input>
                    </el-form-item>

                    <el-form-item label="菜品类别：">
                        <el-input v-model="formData.categoryId" placeholder="修改菜品类别"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" size="small" @click="doSubmit">提交</el-button>
                        <el-button type="info" size="small" @click="doReset" >重填</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>       
</template>

<script>
export default {
    data(){
        return{
            formData:{
                dishId:'',
                dishName:'',
                imgUrl:'',
                price:'',
                detail:'',
                categoryId:''
            }
        }
    },

    methods:{
        doSubmit(){
            var url=this.$store.state.globalSettings.apiUrl+'/admin/dish';
            var titleReg=/^[\u4e00-\u9fa5]{2,8}$/
            var imgReg=/.+(.jpg)$/;
            var priceReg=/^[0-9]{1,3}$/;
            var detailReg=/^[\u4e00-\u9fa5]{1,200}$/
       
            if(this.formData.dishId){
                var msg=!this.formData.dishName&&!this.formData.imgUrl&&!this.formData.price&&!this.formData.detail&&!this.formData.categoryId;
                if(!msg){
                    if(!titleReg.test(this.formData.dishName)){
                        this.$message.error('菜品名称格式不正确！');
                        return;
                    }
                    if(!imgReg.test(this.formData.imgUrl)){
                        this.$message.error('图片格式不正确！');
                        return;
                    }
                    if(!priceReg.test(this.formData.price)){
                        this.$message.error('价格格式不正确！');
                        return;
                    }
                    if(!detailReg.test(this.formData.detail)){
                    this.$message.error('详情格式不正确！');
                    return;
                    }
                    this.$axios.put(url,this.formData).then((res)=>{
                    if(res.data.code==200){
                        this.$message.success(res.data.msg);
                        this.doReset();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }else{
                     this.$alert('修改信息不能为空！', '提示', {
                        confirmButtonText: '确定',
                        type: 'error',
                     callback: action => {}
                    });
                }
                    
            }else{
                  this.$alert('菜品编号不能为空！', '提示', {
                    confirmButtonText: '确定',
                    type: 'error',
                     callback: action => {}
                 });
            }
           
        },

        doReset(){
            this.formData.dishId='';
            this.formData.dishName='';
            this.formData.imgUrl='';
            this.formData.price='';
            this.formData.detail='';
            this.formData.categoryId='';
        }
    }
}
</script>
