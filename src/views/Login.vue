<template>
  <div class="login">
    <el-form
      :model='ruleForm'
      status-icon
      :rules='rules'
      ref='ruleForm'
      label-width='100px'
      class='demo-ruleForm'
    >
      <el-form-item label='邮箱:' prop='email'>
        <el-input v-model='ruleForm.email'></el-input>
      </el-form-item>
      <el-form-item label='密码:' prop='password'>
        <el-input
          type='password'
          v-model='ruleForm.password'
          autocomplete='off'
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click.prevent="submitForm('ruleForm')"
          size="small">提交</el-button
        >
        <el-button
        @click="resetForm('ruleForm')"
         size="small">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import login from '../api/url';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    const checkemail = (rule, value, callback) => {
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
      if (value === '') {
        return callback(new Error('请输入邮箱'));
      } if (!reg.test(value)) {
        return callback(new Error('请输入正确的邮箱格式'));
      }
      return callback();
    };
    return {
      ruleForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        email: [{ validator: checkemail, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // login.login(this.ruleForm).then((res) => {
          //   localStorage.setItem('username', res.data.data.username);
          //   this.$router.push('/index');
          // });
          const result = await this.$store.dispatch('userLogin', this.ruleForm);
          console.log(result);
          if (!result) {
            console.log('111');
            this.$message.error('用户名或密码错误');
            return false;
          }
          this.$router.push('/index');
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
.login{
  padding: 30px 100px 20px 30px;
  width: 30%;
  margin: 100px auto;
  transform: translateX(-10%);
  border: 1px solid #eee;
}
</style>
