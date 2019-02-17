<template>
    <div class="table-delete">
        <el-breadcrumb>
            <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
            <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
            <el-breadcrumb-item>桌台删除</el-breadcrumb-item>
        </el-breadcrumb>
        <br>

        <el-form label-width="90px">
            <el-form-item label="桌台编号：">
                <el-input v-model="tid" placeholder="请输入需要删除的桌台编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" @click="toDeleteTable" type="danger">删除</el-button>
            </el-form-item>
        </el-form>
    </div>       
</template>

<script>
export default {
    data(){
        return{
            tid:''
        }
    },

    methods:{
        toDeleteTable(){
            var tid=this.tid;
            var url=this.$store.state.globalSettings.apiUrl+"/admin/table/"+tid;
            var tidReg=/^\d+$/;
            if(!this.tid){
                this.$alert('删除桌台的话,编号不能为空呦~', '提示', {confirmButtonText: '确定',
                  type: 'error',
                  callback: action => {}
                 });
            }else if(!tidReg.test(this.tid)){
                this.$message.error("请输入桌台正确的编号");
                return;
            }
            this.$axios.delete(url).then((res)=>{
                if(res.data.code==200){
                    this.$message.success(res.data.msg);
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>
