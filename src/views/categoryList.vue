<template>
    <div class="xfn-category-list">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品类别管理</el-breadcrumb-item>
        </el-breadcrumb>
        
        <br/>
        <el-button type="primary" size="mini" plain @click="addCategory">+ 添加新的菜品类别</el-button>
        <br/>
        <br/>

         <el-table :data="categoryList" style="width: 100%" stripe border highlight>
            <el-table-column prop="cid" label="编号" width="100"></el-table-column>
            <el-table-column prop="cname" label="名称" width="560"></el-table-column>
            <el-table-column prop="cname" label="名称" width="360">
                <template slot-scope="{row,$index}">
                    <el-button type="success" size="mini" @click="updateCategory(row,$index)">修改</el-button>
                    <el-button type="danger" size="mini" @click="deleteCategory(row,$index)">删除</el-button>
                </template>
            </el-table-column>
         </el-table>
    </div>       
</template>

<script>
    export default{
        data(){
            return {
                categoryList:[]
            }
        },

        mounted() {
            var url=this.$store.state.globalSettings.apiUrl+'/admin/category';
            this.$axios.get(url).then((res)=>{
                this.categoryList=res.data;
            }).catch((err)=>{
                console.log(err);
            })
            
        },

        methods:{
            updateCategory(c,i){
                this.$prompt('请输入您想要修改的类别名：','提示',{inputValue:c.cname}).then(({value})=>{
                       var url=this.$store.state.globalSettings.apiUrl+'/admin/category';
                       this.$axios.put(url,{cname:value,cid:c.cid}).then((res)=>{
                           if(res.data.code==200){
                               this.$message.success('类别修改成功！');
                           }else{
                               this.$message.error('类别修改失败：'+res.data.msg);
                           }
                       }).catch((err)=>{
                           console.log(err);
                       })
                }).catch(()=>{

                })
            },

            deleteCategory(c,i){
                this.$confirm('确定要删除当前类别吗？一旦删除不可撤销','提示',{type:'warning'}).then(()=>{
                    var url=this.$store.state.globalSettings.apiUrl+'/admin/category/'+c.cid;
                        this.$axios.delete(url).then((res)=>{
                            if(res.data.code==200){
                                this.categoryList.splice(i,1);
                                this.$message.success('类别删除成功'); 
                            }else{
                                this.$message.error('类别删除失败'+res.data.msg);
                            }
                        }).catch((err)=>{
                            console.log(err);
                        })
                }).catch((err)=>{

                })

            },

            addCategory(){
                this.$prompt('请输入新的菜品类别名：','提示',{type:'info'}).then(({value})=>{
                    var url=this.$store.state.globalSettings.apiUrl+'/admin/category';
                    this.$axios.post(url,{cname:value}).then((res)=>{
                        if(res.data.code==200){
                            this.categoryList.push({cid:res.data.cid,cname:value});
                            this.$message.success('新类别添加成功！');
                        }else{
                            this.$message.error('新类别添加出错：'+res.data.msg);
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }).catch(()=>{
                    // console.log('用户取消操作');
                })
            }

        }
    }
</script>