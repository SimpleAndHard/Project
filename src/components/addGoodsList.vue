<template>
  <div class="formlab">
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      style="height: 100%; background: #fafafa"
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="标题:" class="section" prop="name">
        <el-input v-model="form.name" size="large"></el-input>
      </el-form-item>
      <el-form-item label="商品描述:" class="section">
        <el-input v-model="form.desc" size="medium"></el-input>
      </el-form-item>

      <el-form-item label="商品类目:" class="section" prop="region">
        <el-select v-model="form.c_type" size="medium" @change="mychoice">
          <el-option
            v-for="(item, index) in shoptype"
            :label="item"
            :value="item"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="section">
        <el-select
          v-model="form.value"
          placeholder="请添加子类目"
          size="medium"
        >
          <el-option
            v-for="(item, index) in shoplist"
            :label="item"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标签:" class="section" >
        <el-select v-model="form.tags" placeholder="请选择" size="medium">
          <el-option
            label="包邮，最晚次日达"
            value="包邮，最晚次日达"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button style="margin-top: 12px" @click="next('form')"
        >下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import api from '../api/url';

export default {
  data() {
    return {
      shoplist: [],
      shoptype: [],
      rules: {
        name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        regions: [{ required: true, message: '请输入描述', trigger: 'change' }],
        // tags: [{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
    };
  },
  props: ['form', 'isactive'],
  computed: {
    tag() {
      if (!this.form.tag) {
        return '';
      }
      return this.form.tag[0];
    },
  },
  methods: {
    async mychoice(e) {
      if (this.shoplist.length !== 0) {
        this.shoplist = [];
      }
      const i = this.shoptype.indexOf(e);
      this.$emit('mychoice', i + 1);
      const resp = await api.goodslist({
        params: {
          category: i + 1,
        },
      });
      resp.data.data.data.forEach((item) => {
        if (!this.shoplist.includes(item.c_item)) {
          this.shoplist.push(item.c_item);
        }
      });
    },
    next(val) {
      console.log(this.form);
      this.$refs[val].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.$emit('next', 1);
        return true;
      });
    },
  },
  async created() {
    const resp = await api.goodstype();
    this.shoptype = resp.data.data.data.map((item) => item.name);
  },
  updated() {
    console.log(this.form);
  },
};
</script>

<style lang="less">
.formlab {
  width: 100%;
  background: rgb(250, 250, 250);
  padding-top: 20px;
  padding-bottom: 20px;
  .el-form {
    margin: 0px auto;
    width: 500px;
    .section {
      width: 100%;
      .el-select,
      .el-select--medium {
        width: 100%;
        .el-input__inner {
          width: 100%;
        }
      }
    }
  }
}
.el-input__inner {
  height: 32px;
}
.btn {
  text-align: center;
}
</style>
