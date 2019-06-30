$(".recur").click(function () {
    var bb = confirm("确定离开游戏吗？");
    if (bb == true) {
        sessionStorage.clear(allmsg);
        window.location.href = 'jstask2.html';
    }
})
var allmsgc = sessionStorage.getItem("allmsg"); //获取数据
var allmsg = JSON.parse(allmsgc);
console.log(allmsg)
console.log(allmsg.collection)
$(".slayer")[0].innerHTML = allmsg.killer //打印杀手还剩下多少人
$(".civilian")[0].innerHTML = allmsg.civilian //打印平民还剩多少人
var srr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
for (var i = 1; i < allmsg.dayNNum; i++) { //此处是克隆
    var clonedNode = $(".first")[0].cloneNode(true); //给子元素克隆。
    $(".woman")[0].appendChild(clonedNode);
    $(".time")[i].innerHTML = "第" + srr[i] + "天"
}
for (let j = 0; j < allmsg.dayNNum + 1; j++) { //这跟2-4 那个页面一样的效果  稍微改下就行了
    for (let i = 0; i < allmsg.collection.length; i++) {
        if (allmsg.collection[i].deaDday == j && allmsg.collection[i].deaDreason == 'killed') {
            $(".night")[j].innerHTML = "晚上：" + [allmsg.collection[i].index + 1] + "号被杀手杀死了，真实身份是平民";
        }
        if (allmsg.collection[i].deaDday == j && allmsg.collection[i].deaDreason == 'voted') {
            $(".day")[j].innerHTML = "白天：" + [allmsg.collection[i].index + 1] + "号被投票投死，真实身份是" + allmsg.collection[i].id;
        }
    }
}