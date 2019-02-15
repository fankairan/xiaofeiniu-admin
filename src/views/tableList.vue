<template>
    <div class="xfn-table-list">
        <el-breadcrumb>
            <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
            <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
            <el-breadcrumb-item>桌台列表</el-breadcrumb-item>
        </el-breadcrumb>
        <br/>

        <el-row>
            <el-col v-for="(t,i) in tableList" :key="i" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" >
                <xfn-table :data="t" :reserve="reserveList" @tableList="getTableList" @reserveList="getReserve"></xfn-table>
            </el-col>

        </el-row>
    </div>       
</template>

<script>
    import Table from '../components/table'
    export default{
        data(){
            return {
                tableList:[],
                reserveList:[]
            }
        },

        components:{
            'xfn-table':Table
        },

        mounted() {
           this.getTableList();
           this.getReserve();
        },

        methods:{
            getTableList(){
                 //加载桌台列表
                var url=this.$store.state.globalSettings.apiUrl+'/admin/table';
                this.$axios.get(url).then(({data})=>{
                        this.tableList=data;
                        console.log(data);
                }).catch((err)=>{
                    console.log(err);
                })

                // this.getReserve();
            },

            getReserve(){
                var url=this.$store.state.globalSettings.apiUrl+'/admin/table/reserve';

                this.$axios.get(url).then((res)=>{
                    this.reserveList=res.data;
                    console.log(res.data);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }



    }
</script>