import Q from 'q';
import * as types from '../mutation-types';
/**
 * 定义属于单个模块
 * state状态名称
 * getters
 * actions
 * mutations
 */

/**
 * 定义state
 * 快车页面的参数共享，定义两个共享参数
 * 销售渠道参数共享  saleChannelParams
 * 销售渠道，类目，自定义指标合并参数共享  allChannelParams
 */
const state = {
  params:{},
  productPicker:{},
  datePicker:{},
  marketPicker:{}
}

/**
 * 定义getters
 * @type {Object}
 */
const getters = {
    initParams(state){

    }
}

/**
 * 定义actions
 * 定义异步请求数据触发相应的mutations来改变state上的状态
 */
const actions = {
  /**
   * 将合并后参数放在全局上
   */
  productPicker({commit,state},params) {

    return Q.Promise((resolve, reject) => {
      commit(types.INDEX_PARAMS,params);

      resolve()
    });
  },
  datePicker({commit,state},params) {

    return Q.Promise((resolve, reject) => {
      commit(types.INDEX_PARAMS,params);
      resolve()
    });
  },
  marketPicker({commit,state},params) {

    return Q.Promise((resolve, reject) => {
      commit(types.INDEX_PARAMS,params);
      resolve()
    });
  },

}
/**
 * 定义mutations
 */
const mutations = {
  [types.INDEX_PARAMS](state, data , action) {
    state.params = Object.assign(state.params,data);

    state.productPicker = true;
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
