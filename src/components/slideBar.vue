<template>
  <ul class="slide-bar" ref="slide">
      <li class="slide-item" 
      v-for="(item,index) in getSecondMenu" 
      :class="{active:curindex==index}"
      :key="item"
      @click="slectMenu(index)"
      @touchend="scrollTo(item,$event)"
      @touchstart="move=false"
      @touchmove="move=true"> {{typeof item==="number"?all:item}}</li>
  </ul>
</template>

<script>
import {mapActions, mapMutations } from 'vuex'
export default {
data(){
    return{
        curindex:0,
        move:false,
        all:'全部'
    }
},
computed:{
   getSecondMenu(){
        // this.$store.state.secondMenu[0]="全部";
        return this.$store.state.secondMenu
   }
},
methods:{
    ...mapMutations(['ressetCardList']),  
    ...mapActions(['getGoodsList']),  
   slectMenu(index){
        this.curindex=index;
    },
   async scrollTo(item,e){
        if(this.move){
            return
        }
        const ptop = this.$refs.slide.offsetTop;
        const pheight = this.$refs.slide.offsetHeight/2;
        const ctop = e.target.getBoundingClientRect().top;
        const DisY = pheight-ctop+ptop;
        this.moveScroll(this.$refs.slide.scrollTop,DisY);
        this.ressetCardList()
        if(typeof item==="number"){
             await this.getGoodsList({ type: this.getSecondMenu[0],page: 1});
        }else{
              await this.getGoodsList({ type: item,page: 1});
        }
       
    },
    moveScroll(start,end){
        let Dis = 0 ;
        let speed =5;
        if(end>0){
            speed*=-1;
        };
       
        const t = setInterval(()=>{
            Dis+=speed;
           this.$refs.slide.scrollTop=start+Dis;
            if(Math.abs(Dis)>=Math.abs(end)){
                 this.$refs.slide.scrollTop=start-end;
                 clearInterval(t);
            }
        },5)
    },
    

},
async created(){
        this.ressetCardList()
        await this.getGoodsList({type:this.getSecondMenu[0],page:1});
    }
}
</script>

<style lang="less">
.slide-bar{
    width:79px;
    background: #f8f8f8;
    position: fixed;
    left: 0;
    top: 135px;
    bottom: 50px;
    overflow: auto;
    .slide-item{
        width:100%;
        font-size: 12px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        position: relative;
    }
    .active{
         color:#ff1a90;
         font-weight: bold;
    }
    .active::before{
        width: 6px;
        height: 18px;
        background:#ff1a90;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        content:'';
    }
   
}
 .slide-bar::-webkit-scrollbar{
        width: 0px;
        background:none
    }
</style>