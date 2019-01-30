import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI)  //注册ElementUI插件
Vue.prototype.$axios = axios //把axios设置为所有Vue组件实例的成员属性,以后可以使用this.$axios使用异步请求功能
Vue.config.productionTip = false

/* 创建全局过滤器 */
Vue.filter('date', (val) => {
  //把bigint转换为yyy-mm-dd 
  var date = new Date(val);
  var yy = date.getFullYear();
  var mm = date.getMonth() + 1;
  mm = mm > 9 ? mm : '0' + mm;
  var dd = date.getDate();
  dd = dd > 0 ? dd : '0' + dd;

  return yy+'-'+mm+'-'+dd
})

Vue.filter('dateTime', (val) => {
  //把bigint转换为yyy-mm-dd hh:mm:ss
  var date = new Date(val);
  var yy = date.getFullYear();
  var mm = date.getMonth() + 1;
  mm = mm > 9 ? mm : '0' + mm;
  var dd = date.getDate();
  dd = dd > 0 ? dd : '0' + dd;

  var hh=date.getHours();
  hh = hh > 0 ? hh : '0' + hh;
  var mm=date.getMinutes();
  mm = mm > 0 ? mm : '0' + mm;
  var ss=date.getSeconds();
  ss = ss > 0 ? ss : '0' + ss;


  return yy+'-'+mm+'-'+dd+' '+hh+':'+mm+':'+ss
})

Vue.filter('currency', (val) => {
  //把int转换为￥xx.yy 
  return '￥'+val.toFixed(2)
})

Vue.filter('tableStatus',(val)=>{
    if(val==1) return '空闲';
    else if(val==2) return '预定';
    else if(val==3) return '占用';
    else return '其他';
})

new Vue({
  router,
  store,  //指定当前项目唯一的Vuex存储仓库对象,其中保存着可供所有组件共享的数据
  render: h => h(App)  //根据APP
}).$mount('#app')
