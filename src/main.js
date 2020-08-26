// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'vue-nouislider/dist/vue-nouislider.css'
import VueNoUiSlider from 'vue-nouislider/dist/vue-nouislider.common'
import axios from 'axios'
import VueAxios from 'vue-axios'



Vue.use(VueAxios, axios)
Vue.use(VueNoUiSlider)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});

