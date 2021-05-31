import Vue from 'vue';
import Vuex from 'vuex';
import url from '../api/url';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户登录信息
    userMes: {
    },
    // 路由信息
    routeMes: [],
    // 获取的列表信息
    goodslist: {
    },
    // 总的条目数
    total: 0,
    // 左侧菜单栏切换
    index: window.sessionStorage.getItem('index') ? window.sessionStorage.getItem('index') : '/index',
    // 表格选中行信息
    tableinfo: {
      title: '',
      desc: '',
      category: '',
      c_item: '',
      tags: '',
      price: '',
      price_off: '',
      sale: 0,
      unit: '',
      images: [],
      inventory: '',
      c_type: '',
      page: 1,
      goodstype: [],
    },
    // 项目分类
    typenum: '',
  },
  mutations: {
    setUserMes(state, val) {
      state.userMes = val;
    },
    setRouteMEs(state, val) {
      state.routeMes = val;
    },
    setGoodsList(state, val) {
      state.goodslist = val;
    },
    setTotal(state, val) {
      state.total = val;
    },
    setIndex(state, val) {
      state.index = val;
      window.sessionStorage.setItem('index', val);
    },
    setTableinfo(state, val) {
      state.tableinfo = val;
    },
    setTypenum(state, val) {
      state.typenum = val;
    },
    setPage(state, val) {
      state.page = val;
    },
    setGoodsType(state, val) {
      state.goodstype = val;
    },
  },
  actions: {
    async userLogin(context, config) {
      const result = await url.login(
        config,
      );
      if (result.data.status === 'success') {
        context.commit('setUserMes', result.data.data);
        sessionStorage.setItem('role', result.data.data.role);
        sessionStorage.setItem('email', result.data.data.email);
        sessionStorage.setItem('username', result.data.data.username);
        return result;
      }
      return false;
    },
    async setRoutes({ commit }, val) {
      commit('setRouteMEs', val);
    },
    async getGoodslist({ state, commit }, config) {
      const result = await url.goodslist({
        params: config,
      });
      console.log(result, state.goodstype);
      result.data.data.data.forEach((e) => {
        if (e.category === 1) {
          e.c_type = '酒水冲调';
        }
        if (e.category === 2) {
          e.c_type = '时令水果';
        }
        if (e.category === 3) {
          e.c_type = '安心乳品';
        }
        if (e.category === 4) {
          e.c_type = '新鲜蔬菜';
        }
        if (e.category === 5) {
          e.c_type = '休闲零食';
        }
      });
      console.log(result.data.data.data);
      commit('setTotal', result.data.data.total);
      commit('setGoodsList', result.data.data.data);
      commit('setPage', config.page);
      return result;
    },
    async getGoodstype(context, val) {
      const result = await url.goodstype({
        params: val,
      });
      context.commit('setGoodsType', result.data.data.data);
      return result;
    },
  },
  modules: {
  },
});
