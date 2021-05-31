<template>
  <div class="shopCar">
    <div class="shopCarhead">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        @click-right="onClickRight"
      />
    </div>
    <div class="shopEmpty" v-if="showContent">
      <img
        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg"
        alt=""
      />
    </div>

    <van-checkbox-group v-model="result" v-else class="check-group">
      <div class="shopcard" v-for="(item, index) in list" :key="index">
        <van-checkbox :name="item.id" class="check"></van-checkbox>
        <goods-card v-bind="item" @delshop="delshopping"></goods-card>
      </div>
    </van-checkbox-group>

    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
      class="subShop"
    >
      <van-checkbox v-model="checked" @click="allselect">全选</van-checkbox>
      <!-- <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template> -->
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Dialog,Toast } from 'vant'
import GoodsCard from "../components/card.vue";
import getGoodsById from "../tools/URLS";
export default {
  data() {
    return {
      result: [],
      list: [],
      showContent: false,
      checked:false
    };
  },
  components: {
    GoodsCard,
  },
  computed:{
    ...mapState(['countermap']),
    totalPrice(){
      let price =0.00;
      const filterItem = this.list.filter((item)=>this.result.includes(item.id));
      Object.keys(this.countermap).forEach((key)=>{
         filterItem.forEach((item)=>{
           if(item.id===+key){
             price+=this.countermap[key]*item.price
           }
      })
      })
          console.log(price); 
          return price*100
      
    }
  },
  methods: {
    //删除商品
    onClickRight() {
      if(this.result.length===0){
         Toast('请选择您要删除的商品');
         return
      }
      Dialog.confirm({
      title: '',
      message: '您是否要删除已选中的商品',
      })
  .then(() => {
    // on confirm
        this.result.forEach((item)=>this.$store.commit('setStorage',{id:item,num:Infinity}));
        setTimeout(()=>{this.getdata();},0)
        
      Toast('用户点击了确定');
  })
  .catch((error) => {
    // on cancel
    Toast('用户点击了取消');
  });
    },
    onSubmit(){},
    //通过减号删除商品
    delshopping({id,val}){
      console.log(id,val);
       Dialog.confirm({
      title: '',
      message: '您是否要删除已选中的商品',
      })
  .then(() => {
    // on confirm
        this.list.forEach((item,index)=>{
        if(item.id===id){
          this.list.splice(index,1);
        }
      });
      this.$store.commit('setStorage',{id,num:val});
      Toast('用户点击了确定');
  })
  .catch((error) => {
    // on cancel
    Toast('用户点击了取消');
  });
     
    },
    allselect(){
      if(this.list.length===this.result.length){
        this.result=[];
      }else{
        this.list.forEach((item)=>{
        this.result.push(item.id);
      })
      }
     
    },
    async getdata(){
      const results = Object.keys(JSON.parse(localStorage.getItem("goods")));
      const res = await getGoodsById.get("/getGoodsByIds", {
      params: {
        value: results.join(),
      },
    });
    this.list = res.data.list;
    }
 
  },
  watch:{
    result(){
      if(this.list.length!==this.result.length){
        this.checked=false;
      }else{
        this.checked=true;
      }
    },
  },
   created() {
   this.getdata();

  },

};
</script>

<style lang="less">
.shopCar {
  background: #eee;
  min-height: 100vh;
  position: relative;
  .shopCarhead {
  }
  .shopEmpty {
    img {
      width: 100%;
    }
  }
  .check-group {
    padding-bottom: 100px;
  }
  .shopcard {
    display: flex;
    background: #fff;
    padding: 5px 10px;
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .subShop {
    bottom: 50px;
  }
}
</style>