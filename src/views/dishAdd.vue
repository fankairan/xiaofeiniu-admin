<template>
    <div class="">
        <h1>添加菜品</h1>
        <el-form label-width="100px">
            <el-form-item label="菜品图片">
                <el-upload class="xfn-uploader" :action="uploadAction" :on-success="doUploadSucc" name="dishImg" :show-file-list="false">
                    <img v-if="imgUrl" :src="imgUrl">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
                    detail:''
                }
            }   
        },

        methods:{       //res: 服务器返回的响应消息  //file：从INPUT[type]中读取的第一个上传的文件对象
            doUploadSucc(res,file){  //文件上传成功后,客户端得到响应消息之后的处理函数
                    console.log(res);
                    this.formData.imgUrl=res.fileName;
                    this.imgUrl=URL.createObjectURL(file.raw);//把上传的文件编码为DataURL字符串
            }
        }
    }       //scoped
</script>

<style lang="scss">
    .xfn-uploader{ 
        .el-upload{
            text-align: center;
            line-height: 177px;
            border: 2px dotted #ccc;
            border-radius: 5px;
            cursor: pointer;
            width: 250px;
            height: 177px;
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
</style>