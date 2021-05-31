<template>
  <div class="classfiy">
    <div class="searchBar" @click="searchbar">
      <van-icon name="search" />
      <span>荔枝水果9.99</span>
    </div>
    <tab-bar/>
    <template v-if="showContent">
      <slide-bar/>
    </template>
    <van-loading size="1.5rem" color="#d13193" class="center" v-else/>
    <main-content/>
  </div>
</template>

<script>

import TabBar from '../components/tabBar.vue'
import SlideBar from '../components/slideBar.vue'
import MainContent from '../components/mainContent.vue'
import { mapState } from 'vuex'
export default {
components:{
  TabBar,
  SlideBar,
  MainContent,

},
computed:{
  ...mapState({
    showContent:(state)=>state.showContent,
  })
},
methods:{
  searchbar(){
    this.$router.push('/search');
   
  },
  // created(){
  //   this.$store.commit('setRecord',1);
  // }
}
}
</script>

<style lang="less">
.classfiy{
  width: 100%;
  height: 100vh;
  position: absolute;
 
  .searchBar{
    width: 355px;
    margin: 10.5px auto 0;
    background: #eee;
    border-radius: 10px;
    height: 31.5px;
    line-height: 31.5px;
    color: #a1a1a1;
    text-align: center;
    // position: fixed;
   >*{
      vertical-align: middle;
      font-size: 14px;
   }
  }
}
.center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>