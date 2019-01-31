<template>
  <div class="login">
    <el-card class="xfn-login-card">
      <div slot="header">管理员登录</div>
      <div>
        <el-form label-width="85px">
          <el-form-item label="管理员名：">
              <el-input placeholder="请输入管理员名" v-model="formData.aname"></el-input>
          </el-form-item>

          <el-form-item label="登录密码：">
              <el-input type="password" placeholder="请输入登录密码" v-model="formData.apwd"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doLogin">登录</el-button>
            <el-button @click="doCancel">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
      data(){  //普通
        return {
            formData: {  //表单中用户输入的两个数据
              aname: 'admin',
              apwd: '123456'
            }
        }
    },

    methods:{  //执行登录
      doLogin(){
        var url=this.$store.state.globalSettings.apiUrl+`/admin/login/${this.formData.aname}/${this.formData.apwd}`;
        // console.log(url);
        this.$axios.get(url).then((res)=>{
         if(res.data.code==200){
           this.$router.push('/main');
           this.$store.commit('setAdminName',this.formData.aname);
         }else{ //登录失败
           this.$alert('用户名或密码错误！','登录失败',{
             type:'error'
           }).then(()=>{}).catch(()=>{});
         }
        }).catch((err)=>{
          console.log(err);
        })
      },

      doCancel(){ //清除用户的输入
          this.formData.aname='';
          this.formData.apwd='';
      }
    },
    
    mounted(){
      //当前组件挂载完成后需要异步请求全局配置数据
      var url=this.$store.state.globalSettings.apiUrl+'/admin/settings';
      this.$axios.get(url).then((res)=>{
        this.$store.commit('setGlobalSettings',res.data);
      }).catch((err)=>{
        console.log(err);
      })
    }


  }

  
</script>



<style lang="scss">
  .xfn-login-card{
    width: 400px;
    margin: 66px auto;

    .el-card__header{
      text-align: center;
      font-size: 1.2em;
    }
  }

</style>
