<template>
  <div class="goodsmes">
    <!-- {{form}} -->
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品售价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="折扣商品">
        <el-input v-model="form.desc_price"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" >
        <el-input v-model="form.restore"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" >
        <el-input v-model="form.danwei"></el-input>
      </el-form-item>
      <el-form-item label="商品相册" >
        <el-upload
          action="http://mallapi.duyiedu.com/upload/images?appkey=maqi_1614864837058"
          list-type="picture-card"
          :on-success="handleChange"
          :on-remove="handleRemove"
          ref="upload"
          name="avatar"
          :file-list="fileList"
          :class="{hide:flag}"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="form.imgurl" alt="" />
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      img: '',
      fileList: [],
      flag: false,
      rules: {
      },
    };
  },
  props: ['form'],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(file, fileList) {
      console.log(file, fileList);
      this.$emit('sub', file.data.url);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  },
  mounted() {
    // this.img = this.form.imgurl;
    if (!this.form.imgurl) {
      return;
    }
    if (this.form.imgurl.length !== 0) {
      console.log('在里面不出来');
      this.fileList.push({ url: this.form.imgurl });
    }
  },
  watch: {
    form: {
      handler() {
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="less">
.goodsmes {
  .el-form {
    width: 50%;
    margin: 20px auto;
    transform: translateX(-40px);
    .is-success {
      width: 100px;
      height: 100px;
    }
    .el-upload--picture-card,
    .el-upload-list__item-thumbnail {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
    .hide .el-upload--picture-card {
       display: none;
    }
  }
}
</style>
