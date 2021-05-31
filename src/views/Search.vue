<template>
  <div class="searchbar">
    <div class="search-head">
      <van-icon name="arrow-left" @click="$router.goBack()"/>
      <van-search
        v-model="value"
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
      />
      <template v-if="showlist">
        <div class="searchbtn" @click="onSearch(value)">搜索</div>
      </template>
      <template v-else>
        <div id="cardShop" @click="$router.push('/shopcard')">
          <van-icon name="shopping-cart-o" :badge="badge" />
        </div>
      </template>
    </div>
    <div class="like-search" v-if="likeList.length && showcontent">
      <van-list>
        <van-cell
          v-for="item in likeList"
          :key="item"
          @click="onSearch(item)"
        >
          <span class="custom-title" v-html="formatHTML(item)"></span>
        </van-cell>
      </van-list>
    </div>
    <div class="list-content" v-if="!showcontent">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        head-height="80"
        style="overflow: unset"
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
    <div class="search-history">
      <h4>历史记录:</h4>
      <div class="searchitem" 
      v-for="(item,index) in searchlist" 
      :key="index"
      @click="onSearch(item.type)">{{item.type}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import likeSearch from "../tools/URLS.js";
import Card from "../components/card.vue"
export default {
  data() {
    return {
      place: "芒果10块2斤",
      value:'',
      timer: null,
      likeList: [],
      page:1,
      size:7,
      isLoading:false,
      finished:false,
      loading:false,
      list:[],
      showcontent:true,
      showlist:true,
      total:1,
      searchlist:[],
    };
  },
  computed: {
    ...mapState({
      badge: (state) => {
        let sum=0;
        Object.keys(state.countermap).forEach((key)=>{
          
           sum += state.countermap[key];
        });
        return sum;
      },
    }),
  },
  components:{
    Card
  },
  methods: {
    input() {
      if (this.value === "") {
        
        this.likeList = [];
        return false;
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const res = await likeSearch.get("/likeSearch", {
            params: {
              likeValue: this.value,
            },
          });
          this.likeList = res.data.result;
         clearInterval(this.timer);
          this.timer = null;
        }, 100);
      }
    },
    async onSearch(value) {
     this.showcontent=false;
     this.showlist=false;
     this.likeList=[];
     this.list=[];
     this.page=1;
     this.value=value;
     this.finished=false;
     const result = await likeSearch.get("/search",{
        params:{
          type:value,
          page:this.page,
          size:this.size,
        }
      })
      this.list=result.data.list;
      this.total=result.data.total;
      this.loading=false;
      if(this.list.length>=this.total){
        this.finished=true;
      }
       const flag = this.searchlist.find((item)=>{
         if(this.value ===item.type){
           item.time=new Date().getTime();
           return true
         }
         return false
        });
       if(flag){
         this.searchlist.sort((a,b)=>{
           return b.time-a.time
         })
       }else{
         this.searchlist.unshift({type:this.value,time:new Date().getTime()});
        if(this.searchlist.length>=11){
          this.searchlist.pop();
        }
       }
        localStorage.setItem('searchlist',JSON.stringify(this.searchlist));
       console.log(this.searchlist)
    },
   async onRefresh(){
     this.list=[];
     this.isLoading=true;
     const result =  await  likeSearch.get("/search",{
          params:{
          type:this.value,
          page:1,
          size:this.size,
        }
      })
      this.list=result.data.list;
      this.isLoading=false;

     
    },
    async onLoad(){
      this.page+=1;
      this.loading=true;
      this.finished=false;
       const result = await likeSearch.get("/search",{
        params:{
          type:this.value,
          page:this.page,
          size:this.size,
        }
      });
      this.list=[...this.list,...result.data.list];
      this.loading=false;
       if(this.list.length>=this.total){
        this.finished=true;
      }
    },
    focus() {
      this.showcontent=true;
      this.showlist=true;
      
    },
    formatHTML(value){
       const reg = new RegExp(this.value, 'g');
       return value.replace(reg, this.value.fontcolor('red'));
    },
    back(){
      this.$router.push('/classfiy')
    }
  },
  created(){
    this.searchlist=JSON.parse(localStorage.getItem('searchlist'))||[];
  }
};
</script>

<style lang="less">
.searchbar {
  width: 100%;
  height: 100vh;
  background: #fff;
  z-index: 10;
  .search-head {
    width: 345px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 50;
    .van-icon-shopping-cart-o {
      font-size: 25px;
    }
    .van-icon-arrow-left {
      font-size: 22px;
    }
    .van-search {
      width: 290px;
    }
    .searchbtn {
      font-size: 14px;
    }
  }
  .like-search {
    position: absolute;
    top: 50px;
    width: 100%;
    padding-left: 30px;
    box-sizing: border-box;
    background: #fff;
    z-index: 10;
  }
  .list-content {
    margin: 54px auto 0;
    box-sizing: border-box;
    padding-left: 45px;
    background: #fff;
    position: relative;
    z-index: 5;
  }
  .search-history{
    width: 350px;
    position: absolute;
    top: 60px;
    left:25px ;
    z-index: 1;
    .searchitem{
      padding:15px ;
      border-radius:10px ;
      background: #eee;
      margin-right:10px;
      display: inline-block;
    }
  }
}
</style>