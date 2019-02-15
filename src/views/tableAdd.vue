<template>
    <div class="">
        <el-breadcrumb>
            <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
            <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加桌台</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form label-width="90px">
            <el-form-item label="桌台编号：">
                <el-input disabled v-model="tid" style="width: 50px;text-algin:center;margin-right:0.3rem;"></el-input><span style="color: #999;">自动生成，无需输入</span>
            </el-form-item>
            <el-form-item label="桌台别名：">
                <el-input v-model="formData.tname" placeholder="给桌台起个吉利喜气的名字吧！"></el-input>
            </el-form-item>
            <el-form-item label="桌台类型：">
                <el-input v-model="formData.type" placeholder="这是几人桌呢？如2人桌、4人桌.."></el-input>
            </el-form-item>
            <el-form-item label="初始状态：">
                <div>
                    <el-radio-group v-model="formData.status">
                        <el-radio label="1" size="small" border style="margin-right:0px;">空闲</el-radio>
                        <el-radio disabled label="2" size="small" border
                        style="margin-right:0px;">预定</el-radio>
                        <el-radio disabled label="3" size="small" border
                        style="margin-right:0px;">占用</el-radio>
                    </el-radio-group>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="toAddTables">提交</el-button>
                <el-button size="small" type="info" @click="toClear">清空</el-button>
            </el-form-item>
        </el-form>
    </div> 
    
</template>

<script>
export default {
    data(){
        return{
            tid:'',
            formData:{
                tname:'',
                type:'',
                status:'1'
            }
          
        }
    },

    methods:{
        toAddTables(){
            var url=this.$store.state.globalSettings.apiUrl+"/admin/table/newTable";
            var tnameReg=/^[\u4e00-\u9fa5]{2,4}$/;
            var typeReg=/^\d{1}-?\d?\u4eba{1}\u684c{1}$/
            if(!tnameReg.test(this.formData.tname)){
                this.$message.error('桌台名称不能这么起哦！');
                return;
            }
            if(!typeReg.test(this.formData.type)){
                this.$message.error("桌台类型格式不对哦！");
                return;
            }

            this.$axios.put(url,this.formData).then((res)=>{
                if(res.data.code==200){
                    this.$message.success(res.data.msg);
                    this.getTableCount();
                    this.toClear();
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                console.log(err);
            })
        },

        toClear(){
            this.formData.tname='';
            this.formData.type='';
        },

        getTableCount(){
            var url=this.$store.state.globalSettings.apiUrl+"/admin/table";
            this.$axios.get(url).then((res)=>{
                this.tid=res.data.length+1;
            }).catch((err)=>{
                console.log(err);
            })
        },

      
    },

    mounted(){
        this.getTableCount();

    }


}
</script>
