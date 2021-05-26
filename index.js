var page=document.getElementsByClassName('page')[0];
var backing=document.getElementsByClassName('backing')[0];
var mouster=page.getElementsByClassName('mouster')[0];
console.log(mouster);
var num=0;
var timer=setInterval(function(){
    backing.style.width=num+'%';
    num+=1;
    if(backing.style.width=='100%')
    {
        clearInterval(timer);
        page.classList.add('complete');

    }
},30)