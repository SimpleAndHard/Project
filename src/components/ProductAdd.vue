<template>
  <div class="steps">
    <add-goodstate :ac="active"></add-goodstate>
    <add-goodslist v-if="active===0" :form="form" @mychoice="mychoice" @next="next"></add-goodslist>
    <add-goodsmes v-else :form="form" @sub="imgs"></add-goodsmes>
    <div class="btn">
      <!-- <el-button style="margin-top: 12px;" @click="next" v-if="active===0">下一步</el-button> -->
      <div v-if="active===1">
         <el-button style="margin-top: 12px;" @click="next(-1)" >上一步</el-button>
         <el-button style="margin-top: 12px;"  @click="submit">提交</el-button>
      </div>
  </div>
  </div>
</template>

<script>
import AddGoodstate from './addgoodstate.vue';
import AddGoodslist from './addGoodsList.vue';
import AddGoodsmes from './addGoodsMes.vue';
import url from '../api/url';

export default {
  data() {
    return {
      active: 0,
      form: {
        name: '', // 标题
        desc: '', // 商品描述
        region: 1, // 商品类目
        value: '',
        tags: '',
        price: 0,
        desc_price: 0,
        restore: 0,
        danwei: '',
        imgurl: [],
        regions: '',
        sale: 0,
        category: 0,
        status: 0,
      },
    };
  },
  components: {
    AddGoodstate,
    AddGoodslist,
    AddGoodsmes,
  },
  methods: {
    next(val) {
      // console.log(val);
      this.active += val;
    },
    imgs(val) {
      // this.form.imgurl.push(val);
      console.log(this.imgurl);
      this.form.imgurl = val;
    },
    async submit() {
      const obj = {
        _id: this.$route.params._id,
        title: this.form.name,
        desc: this.form.desc,
        category: this.form.region,
        c_item: this.form.value,
        tags: this.form.tags,
        price: this.form.price,
        price_off: this.form.desc_price,
        unit: this.form.danwei,
        status: this.form.status,
        images: this.form.imgurl,
        inventory: this.form.restore,
        sale: this.form.sale,
        id: this.$route.params.id,
        appkey: 'maqi_1614864837058',
      };
      console.log(obj);
      if (this.$route.params.id) {
        const result = await url.ediitgoods(obj);
        if (result.data.status === 'success') {
          this.$message.success('修改成功');
          this.$router.push('/list');
        }
      } else {
        const resp = await url.addgoods({
          title: this.form.name,
          desc: this.form.desc,
          category: this.form.region,
          c_item: this.form.value,
          tags: this.form.tags,
          price: this.form.price,
          price_off: this.form.desc_price,
          unit: this.form.danwei,
          status: this.form.status,
          images: this.form.imgurl,
          inventory: this.form.restore,
        });
        if (resp.data.msg === '成功') {
          this.$message.success('新增成功');
          this.$router.push('/list');
        }
        console.log(resp);
      }
    },
    mychoice(val) {
      this.form.region = val;
    },
  },
  created() {
    // console.log(this.$store.state.tableinfo, '创建了');
    this.form = {
      name: this.$store.state.tableinfo.title, // 标题
      desc: this.$store.state.tableinfo.desc, // 商品描述
      region: this.$store.state.tableinfo.category, // 商品类目
      value: this.$store.state.tableinfo.c_item,
      tags: this.$store.state.tableinfo.tags ? this.$store.state.tableinfo.tags[0] : [],
      price: this.$store.state.tableinfo.price,
      desc_price: this.$store.state.tableinfo.price_off,
      restore: this.$store.state.tableinfo.inventory,
      danwei: this.$store.state.tableinfo.unit,
      imgurl: this.$store.state.tableinfo.images ? this.$store.state.tableinfo.images[0] : [],
      regions: this.$store.state.tableinfo.c_type,
      sale: this.$store.state.tableinfo.sale,
      // category: this.$store.state.tableinfo.category,
      status: this.$store.state.tableinfo.status,
      c_type: this.$store.state.tableinfo.c_type,
    };
    // console.log(this.form);
  },
};
</script>

<style lang="less">
.steps{
  background: #fff;
  border-top: 1px solid #eee;
  height: 100%;
  .btn{
    text-align: center;
  }
}

</style>
