<template>
  <div class="list-wrapper">
    <div class="list-header">
      <div
        :class="type === 'all' ? 'active' : ''"
        @touchend="changeType('all')"
      >
        综合
      </div>
      <div
        :class="type === 'sale' ? 'active' : ''"
        @touchend="changeType('sale')"
      >
        销量
      </div>
      <div class="price" @touchend="changeType('price')" :class="type">
        价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        head-height="80"
        style="overflow:unset"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <card v-for="(item, index) in list" :key="index" v-bind="item" />
          <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.c_item" /> -->
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Card from './card.vue';
export default {
  data() {
    return {
      type: "all",
      isLoading:false,
      loading:false,
      finished:false,
      page:1
    };
  },
  components:{
    Card,  
  },
  computed:{
      ...mapState({
          list:state=>state.cardList,
          goodstype:state=>state.goodsType,
          // finished:state=>state.finished,
      })
  },
  methods: {
    ...mapMutations(['ressetCardList','setFinshed','setSorttype']),
    ...mapActions(['getGoodsList']),
    async changeType(val) {
      if (val !== "price") {
        console.log(val);
        this.type = val;
      } else {
       
        this.type = this.type === "price-up" ? "price-down" : "price-up";
      
      }

        this.isLoading=true;
        this.finished=false;
        this.loading=false;
        this.ressetCardList();
        this.setSorttype(this.type);
        this.page=1;
        await this.getGoodsList({type:this.goodstype,page:1})
        this.isLoading=false;
    },
    async onRefresh(){
        this.isLoading=true;
        this.finished=false;
        this.loading=false;
        this.ressetCardList();
        this.page=1;
        await this.getGoodsList({type:this.goodstype,page:1})
        this.isLoading=false;
    },
    async onLoad(){
        this.page+=1;
        this.loading=true; 
        const result =await this.getGoodsList({type:this.goodstype,page:this.page});
        if(result){
           this.loading=false;
        }
        else{
           this.finished=true;
       
        }
    },
  
  },
  watch:{
    goodstype(){
      console.log(111);
      this.finished=false;
      this.page=1;
      this.loading=false;
    }
  }
};
</script>

<style lang="less">
.list-wrapper {
  width: 296px;
  position: fixed;
  right: 0;
  top: 135px;
  border-top: 1px solid #eee;
  .list-header {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #eee;
    div {
      width: 50px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #aaa;
    }
    .price::before {
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      content: "";
      position: absolute;
      top: 4px;
      right: 2px;
    }
    .price::after {
      border: 4px solid transparent;
      border-top-color: #aaa;
      content: "";
      position: absolute;
      top: 13px;
      right: 2px;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
   
    }
    .price-down::after {
      border-top-color: #ff1a90;
     
    }
  }
  .list-content {
    position: fixed;
    bottom: 50px;
    top: 160px;
    width: 100%;
    overflow: auto;
  }
}
</style>