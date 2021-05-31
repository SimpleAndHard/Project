<template>
  <div class="searchNav">
    <div class="leftsearch">
      <div class="keyword">
        <label for="searchinp">检索关键字： </label>
        <el-input
          v-model="input"
          placeholder="请输入关键字"
          class="searchinp"
          id="searchinp"
          size="small"
        ></el-input>
      </div>
      <div class="goodstype">
        <span>商品类目：</span>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="info" size="small" @click="searchRtn(value)">搜索</el-button>
      <el-button type="info" plain size="small" @click="addgoods">添加商品</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      options: [
        {
          value: '酒水冲调',
          label: '酒水冲调',
        },
        {
          value: '时令水果',
          label: '时令水果',
        },
        {
          value: '安心乳品',
          label: '安心乳品',
        },
        {
          value: '新鲜蔬菜',
          label: '新鲜蔬菜',
        },
        {
          value: '休闲零食',
          label: '休闲零食',
        },
      ],
      value: '',
      typenum: 1,
    };
  },
  methods: {
    async searchRtn(val) {
      if (val === '酒水冲调') {
        this.typenum = 1;
      } else if (val === '时令水果') {
        this.typenum = 2;
      } else if (val === '安心乳品') {
        this.typenum = 3;
      } else if (val === '新鲜蔬菜') {
        this.typenum = 4;
      } else {
        this.typenum = 5;
      }
      this.$store.commit('setTypenum', this.typenum);
      await this.$store.dispatch('getGoodstype');
      this.$store.dispatch('getGoodslist', {
        page: 1,
        size: 10,
        category: this.typenum,
      });
      // goodstype.forEach((ele) => {
      //   goodslist.forEach((e) => {
      //     if (ele.c_items.includes(e.c_item)) {
      //       e.c_type = ele.name;
      //     }
      //   });
      // });
    },
    addgoods() {
      this.$store.commit('setIndex', '/add');
      this.$router.push('/add');
    },
  },
};
</script>

<style lang="less">
.searchNav {
  padding: 10px 30px;
  background: #fff;
  border-top: 1px solid #eee;
  .leftsearch {
    display: flex;
    position: relative;
    .keyword {
        margin-right: 20px;
      label {
        cursor: pointer;
        font-size: 14px;
      }
      .el-input {
        width: 200px;
        // .el-input__inner{
        //     height: 32px;
        // }
      }
    }
    .goodstype{
      margin-right: 20px;
        span{
            font-size: 14px;
        }
    }
    .is-plain{
    position: absolute;
    right: 0;
  }
  }
}
</style>
