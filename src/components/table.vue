<template>
    <div class="xfn-table-info">
        <el-card shadow="hover">
            <div class="xfn-table" :style="{background:getTableColor(data.status)}">{{data.tid}}号桌：{{data.status|tableStatus}}</div>
            <el-button type="success" plain size="mini" @click="showTableDetail">详情</el-button>
            <el-button type="danger" plain size="mini">修改</el-button>
        </el-card>

        <!-- 桌台详情对话框 -->
        <el-dialog :title="data.tid+'号桌台详情'" :visible='dialogTableDetailVisible' :before-close="closeDialogTableDetail">
            <!-- 对话框主体 -->
            <el-tabs type="border-card" @tab-click="makeQRCode">
                <el-tab-pane label="桌台状态">状态...</el-tab-pane>
                <el-tab-pane label="桌台二维码">
                    <img :src="qrcodeData">
                </el-tab-pane>
            </el-tabs>
            <div slot="footer">
                <el-button type="primary" @click="dialogTableDetailVisible=false">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                dialogTableDetailVisible:false,
                qrcodeData:''
            }
        },

        props:['data'],

        methods:{
            getTableColor(status){
                if(status==1) return '#67c23a';
                else if(status==2) return '#e6a23c';
                else if(status==3) return '#f56c6c';
                else return '#909399';
            },

            showTableDetail(){
                this.dialogTableDetailVisible=true;
                console.log(this.data);//当前桌子的数据

            },

            closeDialogTableDetail(){
                this.dialogTableDetailVisible=false;
            },

            makeQRCode(){
                //创建二维码--注意此方法不能在当前组件的moutted中调用,因为绘图必须的canvas在ek-dialog中,对话框的组件加载时并不在DOM树上
                var qrcode=require('qrcode');
                //每个桌子对应的URL应该形如：
                //http://127.0.0.1:8092/#/3
                var tableUrl=this.$store.state.globalSettings.appUrl+'/#/'+this.data.tid;
                //把绘制得到的图片二进制数据转换为字符编码
                qrcode.toDataURL(tableUrl,{
                    width:266,
                    errorCorrectionLevel:'H'
                },(err,url)=>{
                    console.log(url);
                    this.qrcodeData=url;
                })
            }
        }
    }
</script>


<style lang="scss">
    .xfn-table-info{
        padding: 5px;
        text-align: center;
    }

    .xfn-table{
        margin: 5px auto;
        width: 95%;
        height: 150px;
        line-height: 150px;
        border-radius: 50%;
        border: 1px solid #aaa;
        box-shadow: 5px 5px 3px #ccc;
    }
</style>