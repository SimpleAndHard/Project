<template>
  <div class="content">
    <div class="cardList">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品总览</span>
        </div>
        <div  class="text item">
          cardContent
        </div>
      </el-card>
       <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>销售总览</span>
        </div>
        <div  class="text item">
          cardContent
        </div>
      </el-card>
       <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户总览</span>
        </div>
        <div  class="text item">
          cardContent
        </div>
      </el-card>
    </div>
    <charts/>
  </div>
</template>

<script>
import Charts from './charts.vue';

export default {
  components: {
    Charts,
  },

};
</script>

<style lang="less">
.content{
  height: 100%;
  .cardList{
 padding: 20px;
 display: flex;
 .box-card{
   width: 33.3%;
   margin: 0 10px;
   .text {
  font-size: 14px;
}

.item {
  margin: 0 0 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
 }
}
}
</style>
