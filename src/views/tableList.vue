<template>
    <div class="xfn-table-list">
        <el-breadcrumb>
            <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
            <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
            <el-breadcrumb-item>桌台列表</el-breadcrumb-item>
        </el-breadcrumb>
        <br/>

        <el-row>
            <el-col v-for="(t,i) in tableList" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" >
                <xfn-table :data="t"></xfn-table>
            </el-col>

        </el-row>
    </div>       
</template>

<script>
    import Table from '../components/table'
    export default{
        data(){
            return {
                tableList:[]
            }
        },

        components:{
            'xfn-table':Table
        },

        mounted() {
            //加载桌台列表
            var url=this.$store.state.globalSettings.apiUrl+'/admin/table';
            this.$axios.get(url).then(({data})=>{
                    this.tableList=data;
            }).catch((err)=>{
                console.log(err);
            })
        }

    }
</script>