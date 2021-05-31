<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {},
  created() {
    this.$store.state.userMes.username = sessionStorage.username || '';
    this.$store.state.userMes.role = sessionStorage.role || '';
    this.$store.state.userMes.email = sessionStorage.email || '';
  },
  // mounted() {
  //   window.onbeforeunload = () => {
  //     const local = window.localStorage;
  //     // const session = window.sessionStorage;
  //     console.log(window.sessionStorage);
  //     local.clear();
  //   };
  //   window.onload = function () {
  //     console.log(window.sessionStorage.ISlogin);
  //     if (!window.sessionStorage.ISlogin) {
  //       // 关闭浏览器
  //       window.localStorage.removeItem('userInfo');
  //     } else {
  //       // 刷新
  //     }
  //   };
  // },
};
</script>
<style lang="less">
@import url("./assets/index.less");
</style>
