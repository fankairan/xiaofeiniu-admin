<template>
    <div class="xfn-dish-list">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-tabs type="border-card">
            <el-tab-pane v-for="(c,i) in dishList" :key="i">
                <span slot="label">
                  <el-badge :value="c.dishList.length" class="dot">{{c.cname}}</el-badge>
                </span>

                <el-row>
                    <el-col class="dish-box" v-for='(d,j) in c.dishList' :key="j" :xs="24" :md="12" :lg="6" :xl="4">
                        <!-- <xfn-dish :Data="6"></xfn-dish> -->
                        <span class="dish-title" :class='{active:isActive&&dishIndex==j}'>{{d.title}}</span>
                         <span class="dish-detail" :class='{active:isActive&&dishIndex==j}'>{{d.detail}}</span>
                         <span class="dish-price" :class='{active:isActive&&dishIndex==j}'>{{d.price | currency}}</span>
                       <img :src="require('../assets/img/dish/'+d.imgUrl)" class="dish-img" style="max-width:98%;">

                        <div class="dish-cover" :class='{active:isActive&&dishIndex==j}'>
                        </div>  
                        <div class="dish-event" @mouseenter="dishListAct(j)" @mouseleave="dishListNor"></div>
                    </el-col>
                 
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>       
</template>


<script>
    export default{
        data(){
            return{
                dishList:[],     //[{cid:x, cname:x, dishList:[]}]
                isActive:false,
                dishIndex:0

            }
        },

        mounted(){
            //一步获取菜品列表
            var url=this.$store.state.globalSettings.apiUrl+'/admin/dish';
            this.$axios.get(url).then(({data})=>{
                this.dishList=data;
                console.log(this.dishList);
            }).catch((err)=>{
                console.log(err);
            })
        },

        methods:{
            dishListAct(index){
                this.isActive=true;
                this.dishIndex=index;
            },

            dishListNor(){
                this.isActive=false;
            }
        }
    }
</script>

<style lang="scss">
    .el-badge__content.is-fixed{
        top: 9px!important;
        right: 6px!important;
    }

    .dish-box{
    //    overflow: hidden;
       position: relative;
       height: auto;

        .dish-img{
            position: relative;
            border-radius: 5px;
        }
        
        .dish-title{
            position: absolute;
            top: 0.5rem;
            left: 0.8rem;
            color: #fff;
            font-size: 20px;
            z-index: 5;
            font-weight: 700;
        }

        .dish-title.active{
            color: #e62e00;
        }

        .dish-detail{
            position: absolute;
            top: 3rem;
            left: 0.8rem;
            padding-right: 0.8rem;
            color: #fff;
            font-size: 12px;
            z-index: 5;
            display: none;
        }

        .dish-detail.active{
            display: block;
        }

        .dish-cover{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 98%;
            height: 98%;
            z-index: 2;
            border-radius: 5px;
           
        }

        .dish-cover.active{
            background-color: rgba( 0, 0, 0, 0.6);

        }

        .dish-price{
            position: absolute;
            bottom: 1.2rem;
            right: 0.8rem;
            padding-right: 0.8rem;
            color: #fc0;
            font-size: 15px;
            z-index: 5;
            display: none;
        }

        .dish-price.active{
            display: block;
        }

        .dish-event{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 98%;
            height: 98%;
            z-index: 6;
            border-radius: 5px;
        }
    }

 

   

    
</style>
