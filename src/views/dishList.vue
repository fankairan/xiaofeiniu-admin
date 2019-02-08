<template>
    <div class="">
        <h1>菜品列表</h1>
        <el-tabs type="border-card">
            <el-tab-pane v-for="(c,i) in dishList">
                <span slot="label">
                  <el-badge :value="c.dishList.length" class="dot">{{c.cname}}</el-badge>
                </span>

                <el-row>
                    <el-col class="dish-box" v-for='(d,j) in c.dishList' :xs="12" :md="9" :lg="6" :xl="4">
                        <!-- <xfn-dish :Data="6"></xfn-dish> -->
                        <span class="dish-title" :class='{active:isActive&&dishIndex==j}'>{{d.title}}</span>
                         <span class="dish-detail" :class='{active:isActive&&dishIndex==j}'>{{d.detail}}</span>
                       <img :src="require('../assets/img/dish/'+d.imgUrl)" class="dish-img" style="max-width:98%;">

                        <div class="dish-cover">
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
    el-tab-pane .dot>sup{
        top: 5px;
        z-index: 50;
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

        .dish-cover:hover{
            background-color: rgba( 0, 0, 0, 0.6);

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
