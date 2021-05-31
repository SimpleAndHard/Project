<template>
  <div class="table-list">
    <el-table :data="goodslist" style="width: 100%">
      <el-table-column label="id" prop="id"> </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span style="margin-left: 10px" :title="scope.row.title">{{
            scope.row.title
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述"> </el-table-column>
      <el-table-column label="类目" >
        <template slot-scope="scope">
          <span style="margin-left: 10px" :title="scope.row.c_type">{{
            scope.row.c_type
          }}</span>
        </template>
         </el-table-column>
      <el-table-column prop="price" label="预售价格"> </el-table-column>
      <el-table-column prop="price_off" label="折扣价格"> </el-table-column>
      <el-table-column prop="tags" label="标签"> </el-table-column>
      <el-table-column
        prop="inventory"
        label="限制购买数量"
        title="限制购买数量"
      >
      </el-table-column>
      <el-table-column label="上架状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.status === 1 ? "上架" : "下架"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="turn">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="curchage"
        class="turnpage"
        :page-size="size"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import url from '../api/url';

export default {
  data() {
    return {
      // goodslist: [],
      search: '',
      goodstype: [],
      size: 8,
      total: 0,
      currentPage: 1,
    };
  },
  computed: {
    goodslist() { return this.$store.state.goodslist; },
  },
  watch: {
    '$store.state.goodslist': function () {
      // this.goodslist = this.$store.state.goodslist;
      console.log(this.goodslist);
      this.total = this.$store.state.total;
      this.currentPage = this.$store.state.page;
    },
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$store.commit('setIndex', '/add');
      this.$store.commit('setTableinfo', row);
      this.$router.push({
        name: 'ProductEdit',
        params: {
          _id: row._id,
          id: row.id,
          row,
        },
      });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm(`确认删除标题为：${row.title}的商品吗?`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await url.deletegoods(row.id);
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          // const res = await this.$store.dispatch('getGoodslist', {
          //   page: this.currentPage,
          //   size: this.size,
          //   category: this.$store.state.typenum,
          // });
          // console.log(res);
          // this.goodslist = res.data.data.data;
          this.curchage(this.curchage);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    async curchage(val) {
      this.currentPage = val;
      await this.$store.dispatch('getGoodslist', {
        page: val,
        size: this.size,
        category: this.$store.state.typenum,
      });
    },
  },
  async created() {
    await this.$store.dispatch('getGoodstype');
    const resp = await this.$store.dispatch('getGoodslist', {
      page: 1,
      size: this.size,
    });
    this.total = resp.data.data.total;
  },
};
</script>

<style lang="less">
.table-list {
  // display: flex;
  // flex-direction: column;
  .el-table {
    // position: absolute;
    // left: 0;
    // top: 0;
    .el-button:focus,
    .el-button:hover {
      color: #fff;
      border-color: #909399;
      background-color: #909399;
    }
    .cell {
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      text-align: center;
      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        text-align: center;
      }
    }
  }
}

.el-message-box__btns .el-button--primary {
  background-color: rgb(84, 92, 100);
  border-color: rgb(84, 92, 100);
}
.turn {
  padding: 20px 0;
  background: #fff;
  .turnpage {
    float: right;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(84, 92, 100); //修改后的背景图颜色
    color: #fff;
  }
  &::after {
    clear: both;
    content: "";
    display: block;
  }
}
</style>
