import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
// Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    index
    // cart,
    // products
  }
})
