<template>
  <div class="Header">
    <div class="LeftLead">
      <el-button type="info"
      :icon="fold?'el-icon-s-unfold':'el-icon-s-fold'"
      @click="hidemenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ headerTitle[0] }}</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">{{ headerTitle[1] }}</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="RightLead">
      <div class="user">
        <span>{{ username }}</span>
        <i class="el-icon-arrow-down"></i>
      </div>
      <div class="loginout" @click="loginout">
          退出登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fold: false,
      username: '',
    };
  },
  props: ['headerTitle'],
  methods: {
    hidemenu() {
      this.fold = !this.fold;
      this.$emit('fold', this.fold);
    },
    loginout() {
      this.$router.push('/login');
      window.sessionStorage.clear();
    },
  },
  watch: {
    '$store.state.userMes.username': function (val) {
      this.username = val;
    },
  },
  created() {
    this.username = this.$store.state.userMes.username;
  },
};
</script>

<style lang="less">
.Header{
  display: flex;
  justify-content: space-between;
  height: 50px;
  background: #fff;
  line-height: 50px;
  .LeftLead{
    display: flex;
    align-items: center;
    .el-button{
      height: 32px;
      padding: 0 15px;
      cursor: pointer;
      margin: 0 20px 0 10px;
    }
  }
  .RightLead{
    margin-right:  20px;
    color: #999;
    cursor: pointer;
    .user{
      padding: 0 20px;
      font-size: 13px;
    }
    .loginout{
      display: none;
      text-align: center;
      z-index: 10;
      position: relative;
      background: #fff;
    }
   &:hover .loginout{
     display: block;
     &:hover{
       background: #eee;
     }
   }
  }
}
</style>
