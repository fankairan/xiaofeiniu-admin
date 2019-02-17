<template>
    <div class="xfn-dish-add">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加菜品</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form label-width="100px">
            <el-form-item label="菜品图片：">
                <el-upload class="xfn-uploader" :action="uploadAction" :on-success="doUploadSucc" name="dishImg" :show-file-list="false">
                    <img v-if="formData.imgUrl" :src="imgUrl">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="upload-hint">只能上传jpg/png文件，且不超过500KB</div>
            </el-form-item>

            <el-form-item label="主标题：" >
                <el-input type="text" v-model="formData.title" placeholder="请输入菜品主标题"></el-input>
            </el-form-item>

            <el-form-item label="所属类别">
                    <el-radio v-model="formData.categoryId" label="1" border size="small">蔬菜豆制品</el-radio>
                    <el-radio v-model="formData.categoryId" label="2" border size="small">肉类</el-radio>
                    <el-radio v-model="formData.categoryId" label="3" border size="small">丸滑类</el-radio>
                    <el-radio v-model="formData.categoryId" label="4" border size="small">菌菇类</el-radio>
                    <el-radio v-model="formData.categoryId" label="5" border size="small">海鲜河鲜</el-radio>
            </el-form-item>

           <el-form-item label="价格：">
                <el-input type="text" v-model="formData.price" placeholder="请输入菜品价格"></el-input>
            </el-form-item>

            <el-form-item label="菜品描述：">
                <el-input type="textarea" v-model="formData.detail" placeholder="请输入菜品描述"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="doSubmit">提交</el-button>
                <el-button type="info" @click="doReset">重填</el-button>
            </el-form-item>
        </el-form>
       
    </div>       
</template>

<script>
    export default{
        data(){
            return {
                uploadAction:this.$store.state.globalSettings.apiUrl+'/admin/dish/image', //可处理文件上传的数据API
                imgUrl:'',  //要显示的预览图片地址
                formData:{
                    title:'',
                    imgUrl:'',  //菜品图片在服务器上的文件名称
                    price:'',
                    detail:'',
                    categoryId:'1'
                }
            }   
        },

        methods:{       //res: 服务器返回的响应消息  //file：从INPUT[type]中读取的第一个上传的文件对象
            doUploadSucc(res,file){  //文件上传成功后,客户端得到响应消息之后的处理函数
                    // console.log(res);
                    this.formData.imgUrl=res.fileName;
                    this.imgUrl=URL.createObjectURL(file.raw);//把上传的文件编码为DataURL字符串
            },

            doSubmit(){
                var url=this.$store.state.globalSettings.apiUrl+'/admin/dish';
                this.$axios.post(url,this.formData).then((res)=>{
                    if(res.data.code==200){
                        this.$message.success('菜品添加成功！');
                        this.doReset();
                    }else{
                        this.$message.error('菜品添加失败！');
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },

            doReset(){
                this.formData.title='';
                this.formData.imgUrl='';
                this.formData.price='';
                this.formData.detail='';
                this.formData.category='1';
            }
        }
    }       //scoped
</script>

<style lang="scss">
    .xfn-dish-add{

        .upload-hint{
            font-size: 12px;
            color: #606266;
         }

        .el-radio {
            margin-right: 0px;
         }

        .xfn-uploader{ 
            .el-upload{
                text-align: center;
                line-height: 112px;
                border: 2px dotted #ccc;
                border-radius: 5px;
                cursor: pointer;
                width: 200px;
                height: 112px;
                overflow: hidden;
                transition: all .3s linear;
                &:hover{
                    border-color: #4091ff;
                }
             }

                img {
                    max-width: 100%;
                }

      
        }


    }

</style>