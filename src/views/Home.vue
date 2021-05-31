<template>
  <div class="home">
  <router-view></router-view>
  <van-tabbar route>
  <van-tabbar-item icon="home-o" to="/" name="home">首页</van-tabbar-item>
  <van-tabbar-item icon="apps-o" to="/classfiy"  name="search">分类</van-tabbar-item>
  <van-tabbar-item icon="shopping-cart-o" to="/shopcard" 
  :badge="badge" id="cardShop" name="shopcar">购物车</van-tabbar-item>
  <van-tabbar-item icon="user-circle-o" to="/" name="mine">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>



export default {
data() {
    return {
      // active:'home'
    };
  },
  components: {
  
  },
 computed:{
   badge(){
     let val = this.$store.state.countermap;
     var total =0;
     for(let item in val){
      total +=val[item];
     }  
     if(total>99){
       return '99+';
     }
     return total
   },

 },

}
</script>
