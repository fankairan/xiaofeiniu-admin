<template>
    <div class="security">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>安全管理</el-breadcrumb-item>
        </el-breadcrumb>  
        <br>
        <el-row>
            <el-col :md="24" :lg="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>修改管理员密码：</span>
                    </div>
                    <div>
                      <el-form label-width="125px">
                        <el-form-item label="旧密码：">
                          <el-input v-model="formData.oldApwd" placeholder="请输入旧密码" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：">
                            <el-input v-model="formData.newApwd " placeholder="请输入新密码" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码：">
                            <el-input v-model="confirm" placeholder="请再次确认密码" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" @click="toUpdateApwd" type="primary">确认</el-button>
                            <el-button size="small" @click="toConcel" type="info">取消</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                 </el-card>
            </el-col>
        </el-row>
        
      
    </div>       
</template>

<script>
export default {
    data(){
        return{
            formData:{
                aname:this.$store.state.adminName,
                oldApwd:'',
                newApwd:'',
            },
            confirm:''
        }
    },

    methods:{
        toUpdateApwd(){
            var url=this.$store.state.globalSettings.apiUrl+"/admin";
            if(this.formData.newApwd===this.confirm){
                this.$axios.patch(url,this.formData).then((res)=>{
                    if(res.data.code==200){
                        this.$message.success(res.data.msg);
                        this.toConcel();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                this.$alert('新密码不一致，请确认', '提示', {
                confirmButtonText: '确定',
                type: 'error',
                    callback: action => {}
                });
            }
            
        },

        toConcel(){
            this.formData.oldApwd='';
            this.formData.newApwd='';
            this.confirm='';
        }
    }

}
</script>
