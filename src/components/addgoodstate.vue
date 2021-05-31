<template>
  <div>
    <el-steps :active="ac" finish-status="success" align-center>
      <el-step title="填写商品基本信息"></el-step>
      <el-step title="填写商品销售信息"></el-step>
    </el-steps>
    <!-- <el-button style="margin-top: 12px" @click="next">下一步</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ['ac'],
  mounted() {
    console.log(this.ac);
  },
  watch: {
    ac() {
      console.log(this.ac);
    },
  },
  // methods: {
  //   next() {
  //     this.active += 1;
  //     if (this.active > 2) this.active = 0;
  //   },
  // },
};
</script>

<style lang='less'>
.el-steps{
    width: 100%;
    padding-top:20px ;
    margin: 0px auto;
    border-bottom: 1px solid #eee;
}
</style>
