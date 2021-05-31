<template>
  <div id="app">
      
    <!-- <div class="text"></div> -->
    <transition :name="transitionName" :mode="$router.back?'out-in':'in-out'">
    <router-view class="view"></router-view>
    </transition>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      transitionName:'slide-left',
  }},
  created(){
    const countermap =JSON.parse(localStorage.getItem('goods'))  || {};
    this.$store.commit('setCounterMap',countermap);

  },
  watch:{
    $route(to,from){
      if(to.name==="classfiy"&&from.name==="Search"){
        this.$router.back=true;
      }
      if(this.$router.back){
        this.transitionName='slide-right';
      }else{
        this.transitionName='slide-left';
      }
      this.$router.back=false;
    }
  }
}
</script>
<style lang="less">
// .text{
//   width: 100px;
//   height: 100px;
//   border: 1px solid red;
//   position: relative;
//   z-index: 1000;
//   transform: translateX(100px);
// }
.view{
  position: absolute;
  left: 0px;
  top: 0;
  width: 100%;
  transition: all .3s linear;
  
}

.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-right-leave-to {
  transform: translate(100%, 0);
}
</style>
