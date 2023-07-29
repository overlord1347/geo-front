import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketio from 'vue-socket.io-extended';

import Dialog from 'hsy-vue-dialog';
Vue.use(Dialog);
// import io from 'socket.io-client';
import Socket from './socket';

Vue.use(VueSocketio, Socket, { store });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
