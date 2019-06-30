var allmsgs = sessionStorage.getItem("allmsg");
var allmsg = JSON.parse(allmsgs);
console.log(allmsg)
$(".label").click(function () {
    var bb = confirm("确定离开游戏吗？");
    if (bb == true) {
        sessionStorage.clear(allmsg);
        window.location.href = 'jstask2.html';
    }
})
for (var i = 0; i < allmsg.collection.length - 1; i++) { //节点复制。。  如果自己写了HTML样式的话， 就会出现一个很大的问题。
    $(".min")[i].innerHTML = allmsg.collection[i].id; //  改变了从0开始的下标，但是他会少循环一次，这就出现了最后一个不是你想要的下标
    var clonedNode = $(".people")[0].cloneNode(true);
    $("#main")[0].appendChild(clonedNode);
    $(".min")[i + 1].innerHTML = allmsg.collection[i + 1].id; //而这里就是要补全最后一个，加1是因为第一个上面的循环了，而且这个还能把最后面的也循环了
    $(".shui")[i + 1].innerText = i + 2 + "号";
}
var {
    collection: collection, //数组
    civilian: civilian, //平民
    killer: killer, //杀手
    dayNNum: dayNNum, //天数
    move, //步骤
    state, //状态
} = allmsg; //这里是获取数组了，好进行下一步的保存
console.log("数组：", allmsg.collection)
console.log("平民：civilian", civilian)
console.log("杀手：killer", killer)
console.log('天数：dayNNum', dayNNum)
if (state == 'vote') {
    $('.chakan')[0].innerHTML = '投票投死';
    $('.shashou')[0].innerHTML = '讨论结束，大家开始投票';
    $('.dianji')[0].innerHTML = '点击得票数最多的人';
}
for (let i = 0; i < allmsg.collection.length; i++) {

    $(".people").eq(i).click(function () { //当点击下标的时候，先全部隐藏在显示下标
        hide()
        $(".logo").eq(i).show() //这是jquery显示效果
        // $(".logo").eq(i).css("display","block");  //这是jquery中直接写出来自己要的代码
        // $(".logo")[i].style.display="block";      //这属于jquery和原生的结合写法
        subscript = i;
        and = allmsg.collection[i].id
        console.log(and)
    })
    if (collection[i].state == 'dead') {
        $(".people").eq(i).css('background-color', 'red');

    }
}

function hide() { //设置一个全部隐藏的效果  
    for (let i = 0; i < allmsg.collection.length; i++) {
        $(".logo").eq(i).hide() //这是jquery的隐藏
    }
}
$("#begin").click(function () {
    if (collection[subscript].state == 'dead') {
        alert('能不能不怎么恶心,还鞭尸')
        return;
    }
    if (state == 'kill') {
        if (and == "杀手") {
            alert('杀手不能杀自己')
            return;
        } else if (and == "平民") {
            collection[subscript].state = 'dead';
            collection[subscript].deaDreason = 'killed';
            collection[subscript].deaDday = dayNNum;
            allmsg.civilian = allmsg.civilian - 1;
        }
    } else if (state == 'vote') {
        if (and == '杀手') {
            allmsg.killer = allmsg.killer - 1;
        } else {
            allmsg.civilian = allmsg.civilian - 1;
        }
        collection[subscript].state = 'dead';
        collection[subscript].deaDreason = 'voted';
        collection[subscript].deaDday = dayNNum;
        allmsg.dayNNum = allmsg.dayNNum + 1;
    }
    if (allmsg.killer === 0) {
        alert('恭喜平民胜利,游戏结束！')
        sessionStorage.setItem('allmsg', JSON.stringify(allmsg));
        window.location.href = 'jstask2-6.html';
        return;
    } else if (allmsg.killer >= allmsg.civilian && allmsg.civilian === 1) {
        alert('恭喜杀手胜利,游戏结束!')
        sessionStorage.setItem('allmsg', JSON.stringify(allmsg));
        window.location.href = 'jstask2-6.html';
        return;
    }
    sessionStorage.setItem('allmsg', JSON.stringify(allmsg));
    window.location.href = 'jstask2-4.html';
})