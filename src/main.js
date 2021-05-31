import Vue from 'vue';
import VCharts from 'v-charts-v2';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

// Vue.prototype.$echarts = echarts;
Vue.use(VCharts);
Vue.use(ElementUI);
Vue.config.productionTip = false;
window.addEventListener('beforeunload', () => {
  this.$router.push('/index');
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
