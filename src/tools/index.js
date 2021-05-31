import Vue from 'vue'
import com from './index.vue'
export default function(
    {imgtop,imgleft,imgwidth,imgheight,moveX,moveY,src}){
    // console.log(imgtop,imgleft,imgwidth,imgheight,moveX,moveY,src);
    const Animate = Vue.extend(com)
    const app = new Animate({
        el:document.createElement('div'),
        data(){
            return{
                width:imgwidth,
                height:imgheight,
                opacity:1,
                left:imgleft,
                top:imgtop,
                src,
                sx:1,
                sy:1,
                exist:true
            }
        }

    })
    document.body.appendChild(app.$el);
    setTimeout(() => {
        app.opacity=0;
        app.sx=0.1;
        app.sy=0.1;
        app.left=moveX;
        app.top=moveY;
        app.exist=true;
        
    }, 0);
    setTimeout(()=>{
        app.exist=false
    },1000)
}