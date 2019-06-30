var allmsgs = sessionStorage.getItem("allmsg");
var allmsg = JSON.parse(allmsgs);
$("#fanhuic").click(function () { //退出游戏
    var bb = confirm("确定离开游戏吗？");
    if (bb == true) {
        sessionStorage.clear(allmsg);
        window.location.href = 'jstask2.html';
    }
})
var {
    collection: collection,
    civilian: civilian,
    killer: killer,
    dayNNum: dayNNum,
    move: move,
    state,
} = allmsg
console.log(allmsg)
console.log(dayNNum)
console.log("数组：", collection)
var arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]; // 给循环里面添加天数
for (var i = 1; i < dayNNum + 1; i++) { //此处是克隆
    var clonedNode = $(".fate")[0].cloneNode(true); //给子元素克隆。
    $(".main")[0].appendChild(clonedNode)
    $(".omg")[i].innerHTML = "第" + arr[i] + "天"
}
for (let i = 0; i < dayNNum + 1; i++) {
    for (let j = 0; j < collection.length; j++) {
        if (collection[j].deaDday == i && collection[j].deaDreason == 'killed') {
            $(".tixing")[i].innerHTML = collection[j].index + 1 + "号被杀手杀死，真实身份是平民";
        }
        if (collection[j].deaDday == i && collection[j].deaDreason == 'voted') {
            $(".toupiao")[i].innerHTML = collection[j].index + 1 + "号被杀手杀死，真实身份是" + collection[j].id;
        }
    }
}
for (let i = 0; i < dayNNum; i++) {
    $(".omg").eq(i).click(function () {
        if ($(".and")[i].style.display === 'block') {
            $(".and")[i].style.display = 'none'
        } else {
            $(".and")[i].style.display = 'block'
        }
    })
    if (i < dayNNum) {
        if ($(".and")[i].style.display === 'block') {
            $(".and")[i].style.display = 'none'
        }
    }

    $(".thisb").eq(i).css('background-color', 'red');
    $(".whatb").eq(i).css('background-color', 'red');
    $(".yourb").eq(i).css('background-color', 'red');
    $(".whenb").eq(i).css('background-color', 'red');

}
if (allmsg.move == 1) {   //保存了杀手杀人按键的颜色
    $(".thisb").eq(dayNNum).css('background-color', 'red');
}
$(".thisb").eq(dayNNum).click(function () {
    if (allmsg.move == 0) {
        allmsg.state = "kill";
        allmsg.move = allmsg.move + 1; //这是这个状态机的核心部分，点击一次加1，
        sessionStorage.setItem('allmsg', JSON.stringify(allmsg));
        window.location.href = 'jstask2-5.html';
    } else if (allmsg.move == 1) { //这里是三个判断，不按照我的顺序来的话，会出现警告框     
        alert("请按游戏顺序进行，亡灵发言！");
    } else if (allmsg.move == 2) {
        alert("请按游戏顺序进行，玩家发言发言！");
    } else if (allmsg.move == 3) {
        alert("请按游戏顺序进行，玩家投票！");
    }
    console.log(allmsg.move)
})
$(".whatb").eq(dayNNum).click(function () {
    if (allmsg.move == 1) {
        alert('亡灵正在发言中！')
        $(".whatb").eq(dayNNum).css('background-color', 'red');
        allmsg.move = allmsg.move + 1;
    } else if (allmsg.move == 0) {
        alert("请按游戏顺序进行，杀手先杀人！");
    } else if (allmsg.move == 2) {
        alert("请按游戏顺序进行，玩家发言发言！");
    } else if (allmsg.move == 3) {
        alert("请按游戏顺序进行，玩家投票！");
    }
    console.log(allmsg.move)
})
$(".yourb").eq(dayNNum).click(function () {
    if (allmsg.move == 2) {
        alert("玩家正在发言中！");
        $(".yourb").eq(dayNNum).css('background-color', 'red');
        allmsg.move = allmsg.move + 1;
    } else if (allmsg.move == 0) {
        alert("请按游戏顺序进行，杀手先杀人！");
    } else if (allmsg.move == 1) {
        alert("请按游戏顺序进行，亡灵发言！");
    } else if (allmsg.move == 3) {
        alert("请按游戏顺序进行，玩家投票！");
    }
    console.log(allmsg.move)
})
$(".whenb").eq(dayNNum).click(function () {
    if (allmsg.move == 3) {
        $(".whenb").eq(dayNNum).css('background-color', 'red');
        allmsg.state = "vote";
        allmsg.move = 0;
        sessionStorage.setItem('allmsg', JSON.stringify(allmsg));
        window.location.href = 'jstask2-5.html';
    } else if (allmsg.move == 0) {
        alert("请按游戏顺序进行，杀手先杀人！");
    } else if (allmsg.move == 1) {
        alert("请按游戏顺序进行，亡灵发言！");
    } else if (allmsg.move == 2) {
        alert("请按游戏顺序进行，玩家发言发言！");
    }
    console.log(allmsg.move)
})

$(".over").click(function(){
    sessionStorage.setItem('allmsg', JSON.stringify(allmsg));
    window.location.href= 'jstask2-3.html';
})
