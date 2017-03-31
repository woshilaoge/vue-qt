import Vue from 'vue';
import App from './index.vue';
// import store from './store/index'
window.$vm=new Vue({
    el: '#app',
    // store,
    render: (h) => h(App)
});


// Vue.config.errorHandler = function (err, vm) {
//   // handle error
//   console.log(err);
// }
