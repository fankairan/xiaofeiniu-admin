<template>
    <div class="order-list">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>  
        <br>

        <el-table :data="tableData3" height="120" border style="width: 100%">
            <el-table-column prop="date" label="订单编号" fit="true"></el-table-column>
            <el-table-column prop="name" label="开始时间" fit="true"></el-table-column>
            <el-table-column prop="address" label="结束时间" fit="true"></el-table-column>
            <el-table-column prop="date" label="用餐人数" fit="true"></el-table-column>
            <el-table-column prop="name" label="桌台编号" fit="true"></el-table-column>
            <el-table-column prop="address" label="菜品详情" fit="true"></el-table-column>
        </el-table>
    </div>       
</template>