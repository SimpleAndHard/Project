<template>
  <div class="tab-wrapper" ref="tab" 
  >
    <div class="tab-item" 
    v-for="(item,index) in menuList" :key="item.title"
     @touchstart="move=false"
    @touchmove="move=true"
     @touchend="choose(item,index,$event)"
    :class="curindex==index?'active':''">
      <div class="tabimg">
        <img :src="item.imgURL" />
      </div>
      <div class="title-box">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      menuList: [
        {
          title: "时令水果",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg",
        },
        {
          title: "酒水冲调",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg",
        },
        {
          title: "安心乳品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg",
        },
        {
          title: "休闲零食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg",
        },
        {
          title: "肉蛋食材",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg",
        },
        {
          title: "新鲜蔬菜",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg",
        },
        {
          title: "熟食餐饮",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg",
        },
        {
          title: "海鲜水产",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg",
        },
        {
          title: "粮油调味",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg",
        },
        {
          title: "某手美食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg",
        },
        {
          title: "纸杯清洁",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg",
        },
        {
          title: "个人护理",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg",
        },
        {
          title: "美妆护肤",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg",
        },
        {
          title: "家居收纳",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg",
        },
        {
          title: "家用电器",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg",
        },
        {
          title: "3C数码",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg",
        },
        {
          title: "母婴用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg",
        },
        {
          title: "鲜花绿植",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg",
        },
        {
          title: "宠物用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg",
        },
        {
          title: "图书玩具",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg",
        },
        {
          title: "手表配饰",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg",
        },
      ],
      curindex:0,
      move:false,
    };
  },
  methods:{
    ...mapActions(['getSildeList','getGoodsList']),
    async choose(item,index,e){
      if(this.move){
        return
      }
      this.curindex=index;
      const wrapwidth = this.$refs.tab.clientWidth;
      const itemleft = e.target.getBoundingClientRect().left;
      const itemwidth =e.target.offsetWidth;
      const changeDisX =itemleft-wrapwidth/2+itemwidth/2;
      // 头部一级移动菜单
      this.moverScroll(this.$refs.tab.scrollLeft,changeDisX);
      // console.log(item.title)
      const resp = await this.getSildeList(item.title);
      console.log(resp);
      await this.getGoodsList({type:resp.data[0],page:1});

    },
    moverScroll(start,end){
      let dis = 0;
      let speed = 5;
      if(end<0){
        speed*=-1;
      }
      const t = setInterval(()=>{
        dis+=speed;
        this.$refs.tab.scrollLeft=start+dis;
        if(Math.abs(dis)>=Math.abs(end)){
          this.$refs.tab.scrollLeft=start+end;
          clearInterval(t);
        }
      },2)
    }
  },
  async created(){
   await this.getSildeList(this.menuList[0].title);
  //  await this.getGoodsList({type:'全部',page:1});
  },
  
};
</script>
<style lang="less">
.tab-wrapper {
  height: 104px;
  display: flex;
  overflow-x:auto;
  overflow-y: visible;
  padding: 0;
  .tab-item {
    flex-shrink: 0;
    width: 50px;
    height: 70px;
    padding: 10px 5px 0;
    .tabimg {
      width: 50px;
      height: 50px;
      border: 2px solid;
      border-color: transparent;
      border-radius: 23px;
      background: #fff;
      text-align: center;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .title-box {
      font-size: 12px;
      margin-top: 5px;
    }
   
  }
   .active {
      .tabimg{
        border-color: #d13193 ;
      }
      .title-box {
        background: #d13193;
        color: #fff;
        border-radius: 30px;
        font-weight: bold;
      }
    }
}
.tab-wrapper::-webkit-scrollbar{
    width: 0px;
    background: none;
  }
</style>