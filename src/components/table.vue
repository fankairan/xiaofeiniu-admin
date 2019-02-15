<template>
    <div class="xfn-table-info">
        <el-card shadow="hover">
            <div class="xfn-table" :style="{background:getTableColor(data.status)}">{{data.tid}}号桌：{{data.status|tableStatus}}</div>
            <el-button type="success" plain size="mini" @click="showTableDetail">详情</el-button>
            <el-button type="danger" plain size="mini" @click="showTableUpdate">修改</el-button>
        </el-card>

        <!-- 桌台详情对话框 -->
        <el-dialog :title="data.tid+'号桌台详情'" :visible='dialogTableDetailVisible' :before-close="closeDialogTableDetail" style="font-size:16px;color:#777;">
            <!-- 对话框主体 -->
            <el-tabs type="border-card" @tab-click="makeQRCode">
                <el-tab-pane label="桌台状态">
                   <el-form label-width="90px" style="text-align: left;">

                    <el-form-item label="桌台状态：" >
                        <el-tag type="warning" :style="{color:getTableColor(data.status),borderColor:getTableColor(data.status)}">{{data.status|tableStatus}}</el-tag>
                    </el-form-item>

                    <el-form-item label="桌台名称：" >
                        <el-tag type="info">{{data.tname}}</el-tag>
                    </el-form-item>

                    <el-form-item label="桌台类型：" >
                        <el-tag type="info">{{data.type}}</el-tag>
                    </el-form-item>

                    <div v-for="(r,i) in reserve" :key="i" >
                         <el-form-item label="预订人：" v-show="data.tid==r.tableId">
                            <el-tag type="info">{{r.contactName}}</el-tag>
                         </el-form-item>

                        <el-form-item label="联系电话："  v-show="data.tid==r.tableId">
                            <el-tag>{{r.phone}}</el-tag>
                        </el-form-item>
                    
                        <el-form-item label="联系时间：" v-show="data.tid==r.tableId">
                            <el-tag type="success">{{r.contactTime | dateTime}}</el-tag>
                        </el-form-item>

                        <el-form-item label="用餐时间：" v-show="data.tid==r.tableId">
                            <el-tag type="success">{{r.dinnerTime | dateTime}}</el-tag>
                        </el-form-item>
                    </div>

                   </el-form>
                </el-tab-pane>
                <el-tab-pane label="桌台二维码">
                    <img :src="qrcodeData">
                    <div>提示：请将此二维码打印于对应桌台；顾客扫码即可点餐</div>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer">
                <el-button type="primary" @click="dialogTableDetailVisible=false">确定</el-button>
            </div>
        </el-dialog>

         <el-dialog :title="data.tid+'号桌台状态修改'" :visible='dialogTableUpdateVisible' :before-close="closeDialogTableUpdate" style="font-size:16px;color:#777;padding-bottom:0px;">
            <!-- 对话框主体 -->
            <el-form label-width="90px">
                <el-form-item label="桌台状态：" style="text-align:left;"> 
                    <div>
                        <el-radio-group v-model="formData.tableStatus">
                            <el-radio label="1" size="small" border style="margin-right:0px;">空闲</el-radio>
                            <el-radio label="2" size="small" border
                            style="margin-right:0px;">预定</el-radio>
                            <el-radio label="3" size="small" border
                            style="margin-right:0px;">占用</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>

                <div v-if="formData.tableStatus==2">
                    <el-form-item label="联系时间：" style="text-align:left;">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                            v-model="formData.contactTime"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="预定时间：" style="text-align:left;">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                            v-model="formData.dinnerTime"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="预约人：">
                        <el-input v-model="formData.contactName" placeholder="预约联系人"></el-input>
                    </el-form-item>

                    <el-form-item label="联系电话：">
                        <el-input v-model="formData.phone" placeholder="预约人电话"></el-input>
                    </el-form-item>
                </div>

                <el-form-item style="text-align:right;">
                    <el-button type="primary" size='small' @click="toUpdateTableStatus(data.tid)">修改</el-button>
                    <el-button type="info" @click="dialogTableUpdateVisible=false" size='small'>取消</el-button>
                </el-form-item>

            </el-form>
         </el-dialog>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                dialogTableDetailVisible:false,
                dialogTableUpdateVisible:false,
                qrcodeData:'',
               
                formData:{
                    tid:'',
                    tableStatus:'',
                    phone:'',
                    contactName:'',
                    contactTime:'',
                    dinnerTime:''
                }
            }
        },

        props:['data','reserve'],

        mounted(){
             this.formData.tableStatus=this.data.status;
        },
        methods:{
            toUpdateTableStatus(tid){
                var phoneReg=/^1[34578]\d{9}$/;
                if(!phoneReg.test(this.formData.phone) &&this.formData.phone!=''){
                        this.$alert('手机号格式不正确！', '提示', {
                        confirmButtonText: '确定',
                        type: 'error',
                        callback: action => {}
                    });
                    return;
                }

                if(this.formData.tableStatus==2){
                    if(this.formData.contactTime){
                         this.formData.contactTime=this.formData.contactTime.getTime();
                    }
                    if(this.formData.dinnerTime){
                        this.formData.dinnerTime=this.formData.dinnerTime.getTime();
                    }
                    
                  

                    if(!this.formData.phone && !this.formData.contactName && !this.formData.contactTime && !this.formData.dinnerTime){
                        console.log(111);
                        this.$alert('修改信息不能为空！', '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                            callback: action => {}
                        });
                        return;
                    }
                }


                this.formData.tid=tid;
                var url=this.$store.state.globalSettings.apiUrl+'/admin/table/updateStatus';
                this.$axios.put(url,this.formData).then((res)=>{
                    if(res.data.code==200){
                        this.closeDialogTableUpdate();
                        this.$emit("tableList");
                        this.$emit("reserveList");
                        this.$message.success(res.data.msg);
                        this.formData.tableStatus=data.status;
                        // this.$options.filters.dateTime(this.formData.contactTime);
                        // this.$options.filters.dinnerTime(this.formData.dinnerTime);
                    }
                                       
                }).catch((err)=>{
                    console.log(err);
                })
            },

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

            showTableUpdate(){
                this.dialogTableUpdateVisible=true;
            },

            closeDialogTableUpdate(){
                this.dialogTableUpdateVisible=false;
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
                    width:200,
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
         .dialogStyle{
            font-size: 18px;
            color: #888;
        }
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