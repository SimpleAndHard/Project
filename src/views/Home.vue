<template>
  <div class="home">
    <el-container>
      <div class="menu">
        <el-aside :class="unfold ? 'unfold' : 'fold'">
          <el-menu
            :default-active="index"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse="isCollapse"
            :collapse-transition="tt"
          >
            <el-submenu index="1" ref="shouye">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span v-show="!unfold">首页</span>
              </template>
              <el-menu-item-group >
                <el-menu-item index="/index" @click="total(['首页','统计'])">
                  <i class="el-icon-s-grid"></i>
                  统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-box"></i>
                <span v-show="!unfold">商品</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/list" @click="shoplist(['商品','商品列表'])">
                <i class="el-icon-tickets"></i>
                商品列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group >
                <el-menu-item index="/add" @click="addshop(['商品','添加商品'])">
                <i class="el-icon-document-add"></i>
                添加商品</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>

      <el-main>
        <Cheader @fold="fold" :headerTitle='headertitle'/>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import Cheader from '../components/Cheader.vue';

export default {
  data() {
    return {
      unfold: false,
      headertitle: ['首页', '统计'],
      isCollapse: false,
      tt: true,
    };
  },
  components: {
    Cheader,
  },
  computed: {
    index() {
      return this.$store.state.index;
    },
  },
  methods: {
    fold(val) {
      this.isCollapse = !this.isCollapse;
      this.unfold = val;
      this.$store.commit('setTypenum', '');
    },
    total(item) {
      this.$store.commit('setIndex', '/index');
      this.$store.commit('setTableinfo', '');
      this.headertitle = item;
      // this.$router.push('/index');
    },
    shoplist(item) {
      this.$store.commit('setIndex', '/list');
      this.$store.commit('setTableinfo', '');
      this.headertitle = item;
      // this.$router.push('/list');
    },
    addshop(item) {
      this.$store.commit('setIndex', '/add');
      this.headertitle = item;
      this.$store.commit('setTypenum', '');
      // this.$router.push('/add');
    },
  },
};
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
    .menu {
      .el-aside {
        height: 100%;
        transition: all 0.3s linear;
        .el-menu {
          height: 100%;
          border: 0;
          .el-menu-item-group__title{
            padding: 0;
          }
          .el-submenu__title{
            height: 50px;
            line-height: 50px;
          }
          ::v-deep .el-menu-item {
            height: 45px;
            line-height: 45px;
          }
          ::v-deep .el-submenu__title {
            height: 45px;
            line-height: 45px;
          }
        }
      }
      & .fold {
        width: 200px !important;
        .el-icon-arrow-down::before {
          content: "\e6df";
        }
      }
      & .unfold {
        width: 90px !important;
        .el-submenu__title {
          text-align: center;
          .el-icon-arrow-down::before {
            content: "";
          }
        }
      }
    }

    .el-main {
      padding: 0;
      background: #fff;
    }
  }
}
</style>
