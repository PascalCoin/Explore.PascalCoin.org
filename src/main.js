import Vue from 'vue';
import VueTimeago from 'vue-timeago';
import VueMoment from 'vue-moment';
import VueApexCharts from 'vue-apexcharts';
import Loading from './components/Loading.vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'nprogress/nprogress.css';

Vue.config.productionTip = false;

Vue.use(Loading);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',
});
Vue.use(VueMoment);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
