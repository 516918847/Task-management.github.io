var allmsgs=sessionStorage.getItem("allmsg");
var allmsg=JSON.parse(allmsgs);
console.log(allmsg)
console.log(allmsg.collection[0].id)
$(".tag").click(function () { //退出游戏
    var bb = confirm("确定离开游戏吗？");
    if (bb == true) {
        window.location.href = 'jstask2.html';
    }
})
var v=0;  //这是让if语句点击循环
var n=2;   //v大于0的时候执行n
var m=0;   //v等于0的时候执行m
$(function(){
     $("#check").click(function(){
         if(m==allmsg.collection.length){   //当M大于数组长度的时候就会跳转页面
             window.location.href='jstask2-3.html';
         }
         if(v==0){     //v等于0的时候执行这条代码，不等于0的时候执行下一条代码
             $(".rng")[0].style.visibility="visible";
             $("#check")[0].innerText="隐藏并传递给"+n+"号";
             $(".mlxg")[0].innerHTML=allmsg.collection[m].id;
             v=v+1;
             m=m+1;
         }else{
             $(".edg")[0].innerText=n;
             $("#check")[0].innerText="查看"+n+"号身份";
            $(".rng")[0].style.visibility="hidden";
            v=v-1;
            n=n+1;
         }
         if(m==allmsg.collection.length){
            $("#check")[0].innerText=("法官查看")
         }
         
     })
})