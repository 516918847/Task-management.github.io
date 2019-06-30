var killerb = $("#shashou")[0], //杀手
    civiliana = $("#pingmin")[0], // 平民
    total = $("#points")[0]; // 输入框
$(".omg").click(function () { //退出游戏
    var bb = confirm("确定离开游戏吗？");
    if (bb == true) {
        window.location.href = 'jstask2.html';
    }
})
total.addEventListener('input', function () {   //监听输入框的变化
    assign();
    random();
    if(total.value>4){
        return;
    }else{ 
        total.value=""
    }
}, false)
function assign() {      //  获取杀手和平民的值
        people = total.value     //获取输入框的最初值
    if (people < 4 || people > 18) {   // 当小于4或者大于18时为空
        people = ""; 
    }
    killer = parseInt(Math.floor(people / 3)) //  获取杀手分配
    civilian = people - killer // 获取平民分配
    killerb.innerHTML = killer   //  显示杀手的人数
    civiliana.innerHTML = civilian  //  显示平民的人数
    console.log("杀手", killer)
    console.log("平民", civilian)
}
assign()    //这是打印出，最初值时候 杀手和平民的人数
function random() {    //这是把杀手和平民都放在overall中
    overall=[];
    for (var i = 0; i < killer; i++) {
        overall.push("杀手");
    }
    for (var i = 0; i < civilian; i++) {
        overall.push("平民");
    }
    for (var i = overall.length; i > 0; i--) { //  上面在杀手和平民放在同一个数组的情况下的情况下开始打乱顺序
        var number = Math.floor(Math.random() * i);
        var temp = overall[i - 1];
        overall[i - 1] = overall[number];
        overall[number] = temp;
    }
    console.log(overall)
    collection=[],   //此处存放着初始状态，id名，第几天，在什么状态被杀
    index=0;       //数组长度
    for (i = 0; i < overall.length; i++) {
         var add={
             id:overall[i],   
             index:index++,
             state:'alive',
             deaDreason:null,
             deaDday:null,
        }
        collection.push(add)
    }
    console.log(collection)
}
random();
$(function(){
    $(".deal").click(function(){
        if (people < 4 || people > 18) {
            confirm("输入错误");
        }else {
             var allmsg={
                collection:collection,   //数组
                civilian:civilian,        //平民
                killer:killer,         //杀手
                dayNNum:0,       //天数
                move:0,       //步骤
             }
        }
        console.log(allmsg)
        sessionStorage.setItem('allmsg',JSON.stringify(allmsg))
        window.location.href='jstask2-2.html';

    })
})
