// 获取元素节点
var tag= document.getElementsByClassName("tag");
console.log(tag)
        //  获取颜色
  function colorc(){
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
       return  'rgb('+ r +',' + g + ',' + b + ')'
  }console.log(colorc())
  
  function label(){//数字循环，每次数字都是不相同的
    for(;a==b||b==c ||a==c; ) {
        var a = Math.floor(Math.random() * 9);
        var b = Math.floor(Math.random() * 9);
        var c = Math.floor(Math.random() * 9);
    }
    console.log(a, b, c)
    //  结合上面的数字随机，让三个盒子在随机的时候，不会出现相同的颜色
    for(;omg==ing||ing==ig||omg==ig;){
        var omg = tag[a].style.backgroundColor=colorc();
        var ing = tag[b].style.backgroundColor=colorc();
        var ig  = tag[c].style.backgroundColor=colorc();
        
    }
    console.log(omg,ing,ig)
  }
  //开始键
  var cc;

    function  btnone(){
       cc= setInterval(function(){  //这里是1秒刷新一次
            for(var i=0;i<9;i++){//这里是先全部恢复成黄色，然后在随机颜色。
                tag[i].style.backgroundColor="orange";
            }
            label()
        },1000)//1秒后会重复着上面的顺序在来次。
        document.getElementById("bb").disabled = true;// 布尔属性，和下面fales是配套的。
    }
    //结束按钮
    function  btntwo(){
        for(var i=0;i<9;i++){
            tag[i].style.backgroundColor="orange";
        }
        clearInterval(cc);
        document.getElementById("bb").disabled = false;
    }
   

