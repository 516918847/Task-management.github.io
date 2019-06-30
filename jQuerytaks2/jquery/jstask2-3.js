var allmsgs=sessionStorage.getItem("allmsg");
var allmsg=JSON.parse(allmsgs);
console.log(allmsg)
console.log(allmsg.collection)
$(".tag").click(function(){
    var bb=confirm("确定离开游戏吗？");
    if (bb==true){
        window.location.href='jstask2.html';
    }
})
    for(var i=0;i<allmsg.collection.length-1;i++){   //节点复制。。  如果自己写了HTML样式的话， 就会出现一个很大的问题。
        $(".min")[i].innerHTML=allmsg.collection[i].id;  //  改变了从0开始的下标，但是他会少循环一次，这就出现了最后一个不是你想要的下标
        var clonedNode=$(".people")[0].cloneNode(true);
        $("#main")[0].appendChild(clonedNode);
        $(".min")[i+1].innerHTML=allmsg.collection[i+1].id;  //而这里就是要补全最后一个，加1是因为第一个上面的循环了，而且这个还能把最后面的也循环了
        $(".shui")[i+1].innerText=i+2+"号";
    }
    $("#begin").click(function(){
        window.location.href='jstask2-4.html';
    })

