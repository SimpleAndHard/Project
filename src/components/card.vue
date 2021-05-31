<template>
      <div class="card">
      <div class="card-img" ref=cardimg>
          <img :src='images[0]'>
      </div>
      <div class="card-content">
          
          <div class="title">{{title}}</div>
           <div class="stitle">{{desc}}</div>
           <span class="hour">{{tags[0]}}</span>
            <div class="price">{{price}}</div>
             <div class="priceAdd">
            <div class="reduceimg" @click="reduce(id,-1)" v-if="num[id]"><img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" alt=""></div>
            <div class="num" v-if="num[id]">{{num[id]}}</div>
            <div class="addimg" @click="add(id,1)"><img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png" alt=""></div>
           </div>
  </div>
  </div>
  
</template>

<script>
import { mapState } from 'vuex';
import animate from '../tools/index'
export default {
props:['desc','images','price','tags','title','id'],
data(){
    return{
        list:[]
    }
},
computed:{
    num(){
     return this.$store.state.countermap;
  }
}  
,
methods:{
    reduce(id,val){
        if(this.num[id]===1&&val===-1){
           this.$emit("delshop",{id,val});
        }else{
            this.$store.commit('setStorage',{id,num:val});
        }
 
    },
    add(id,val){
        //图片的位置及宽高
        const {top:imgtop,left:imgleft} = this.$refs.cardimg.getBoundingClientRect();
        const imgwidth = this.$refs.cardimg.offsetWidth;
        const imgheight = this.$refs.cardimg.offsetHeight;
        //购物车位置及宽高
        const {top:shoptop,left:shopleft}=document.getElementById('cardShop').getBoundingClientRect();
        const shopwidth = document.getElementById('cardShop').offsetWidth;
        const shopheight = document.getElementById('cardShop').offsetHeight;
        const moveX=shopleft+shopwidth/2;
        const moveY=shoptop+shopheight/2;
        console.log(shopleft,shoptop);
        const src = this.images[0];
        animate({imgtop,imgleft,imgwidth,imgheight,moveX,moveY,src})
        this.$store.commit('setStorage',{id,num:val})
      
    }
},

}

</script>

<style lang="less">
.card{
    width: 100%;
    height: 100px;
    display: flex;
    border-bottom: 1px solid #ebedf0;
    .card-img{
        width: 90px;
        height: 90px;
        margin-right: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .card-content{
        flex-shrink: 1;
        position: relative;
    
        .title{
            width: 170px;
            font-size: 13px;
            margin: 5px 0;
            font-weight: bold;
            color:#1a1a1a
        }
        .stitle{
            font-size: 11px;
            margin-bottom: 4px;
            color: #cecece;
        }
        .hour{
            color: #cecece;
            padding: 2px;
            border: 1px solid #cecece;
            font-size: 11px;
            border-radius: 4px;
            
        }
        .price{
                color: #ff1a90;
                font-size: 14px;
                font-weight: bold;
                margin-top:4px;
            }
        .priceAdd{
            display: flex;
            justify-content:space-between ;
            position: absolute;
            right: -12px;
            bottom: 5px;
            .reduceimg{
                img{
                    width: 15px;
                    height: 15px;
                }
            };
            .num{
                margin: 0 5px
            };
            .addimg{
                 img{
                    width: 15px;
                    height: 15px;
                }
            }
           
        }
    }

}

</style>