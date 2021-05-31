import Vue from 'vue'

import Vuex from 'vuex'
import  request from "../tools/URLS"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    secondMenu:[],
    sorttype:'all',
    size:5,
    showContent:false,
    cardList:[],
    page:1,
    goodsType:2,
    finshed:false,
    //购物车的保存id和数量的对象
    countermap:{},
    record:1,

  },
  mutations: {
    setRecord(state,val){
      state.record=val;
    },
    setSecondMenu(state,val){
      state.secondMenu=[...val];
    },
    setShowContent(state,val){
      state.showContent=val
    },
    setType(state,val){
      state.stype=val;
    },
    setCardList(state,val){
      state.cardList=[...state.cardList,...val];
    },
    ressetCardList(state){
      state.cardList=[];
    },
    setPage(state,val){
      state.page=val;
    },
    setGoodsType(state,val){
      state.goodsType=val;
    },
    setFinshed(state,val){
      state.finshed=val;
    },
    setSorttype(state,val){
      state.sorttype=val;
    },
    setCounterMap(state,val){
      state.countermap=val;
    },
    setStorage(state,val){
    
      const {id , num}=val;
      if(state.countermap[id]){
        if((state.countermap[id]===1&&num===-1)||num===Infinity){
          // state.countermap[id]=undefined;
        Vue.delete(state.countermap,id)
        }else{
          // state.countermap[id]+=num;
          
          Vue.set(state.countermap,id,state.countermap[id]+num);
        }
      }else{
        // state.countermap[id]=1;
        Vue.set(state.countermap,id,1)
      }
     
      localStorage.setItem('goods',JSON.stringify(state.countermap));
    },
  

  },
  actions: {
    async getSildeList({state,commit},val){
      commit('setShowContent',false);
      const result = await request.get('https://mallapi.duyiedu.com/goods/getsidebar',{
        params:{
         type:val
       }}
       );
       commit('setType',result.data[0]);
       commit('setShowContent',true);
       commit('setSecondMenu',result.data);
       return result;
     },
    async getGoodsList({state,commit},options){
      let { type, page } = options;
      commit('setGoodsType',type)
      const result = await request.get('https://mallapi.duyiedu.com/goods/getGoodsList',{
        params:{
          type, 
          page,
          size:state.size,
          sort:state.sorttype,
        }
      })
      commit('setCardList',result.data.list)
      // console.log(state.cardList.length,result.data.total);
      //如果商品数组长度小于总商品数组长度，返回true
      if(state.cardList.length<result.data.total){ 
        return true;
      }else{
        return false;
      }
        
 
     
     
    },
  
  },
  modules: {
 
  }
})
