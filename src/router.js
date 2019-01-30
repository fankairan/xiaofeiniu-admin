import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Main from './views/main.vue'
import NotFound from './views/notFound.vue'
import GlobalSettings from './views/globalSettings.vue'
import TableList from './views/tableList.vue'
import TableAdd from './views/tableAdd.vue'
import TableDelete from './views/tableDelete.vue'
import CategoryList from './views/categoryList.vue'
import CategoryAdd from './views/categoryAdd.vue'
import CategoryDelete from './views/categoryDelete.vue'
import CategoryUpdate from './views/categoryUpdate.vue'
import DishList from './views/dishList.vue'
import DishAdd from './views/dishAdd.vue'
import DishDelete from './views/dishDelete.vue'
import DishUpdate from './views/dishUpdate.vue'
import OrderhList from './views/orderList.vue'
import Security from './views/security.vue'

Vue.use(Router)
//整个项目的路由词典：访问路径 <=>  视图组件
export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/main',
      component: Main,
      children: [
        { path: '', redirect: '/table/list' },
        { path: '/settings', component: GlobalSettings },
        { path: '/table/list', component: TableList },
        { path: '/table/add', component: TableAdd },
        { path: '/table/delete', component: TableDelete },
        { path: '/category/list', component: CategoryList },
        { path: '/category/add', component: CategoryAdd },
        { path: '/category/delete', component: CategoryDelete },
        { path: '/category/update', component: CategoryUpdate },
        { path: '/dish/list', component: DishList },
        { path: '/dish/add', component: DishAdd },
        { path: '/dish/delete', component: DishDelete },
        { path: '/dish/update', component: DishUpdate },
        { path: '/order/list', component: OrderhList },
        { path: '/security/', component: Security }

      ]
    },
    { path: '/*', component: NotFound }

  ]
})
