import Vue from 'vue';
import App from './index.vue';

new Vue({
    el: '#app',
    render: (h) => h(App)
});

// Vue.config.errorHandler = function (err, vm) {
//   // handle error
//   console.log(err);
// }
