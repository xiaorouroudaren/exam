$(function(){
    var $config = $(".carousel").attr("data-carousel");
    var $_img = "";
    var $_span="";
    var carouselWidth;
    var height;
    var timer;
    var timer1;
    if(!JSON.parse($config).config.width){
        carouselWidth=500;
    }
    else {
        carouselWidth=JSON.parse($config).config.width*JSON.parse($config).src.length;
    }
    if(!JSON.parse($config).config.height){
        height=300;
    }
    else{
        height=JSON.parse($config).config.height;
    }
    //根据传入参数创建图片标签
    for(var i=0;i<JSON.parse($config).src.length;i++){
        $_img += "<img class='content_img' src='"+JSON.parse($config).src[i]+"'>";
    }
    // 创建div img标签并设置样式
    $(".carousel").css({"width":JSON.parse($config).config.width,"height":height})
        .append("<div class='content'></div>")
        .find(".content").css({"width":carouselWidth,"height":height,"left":0})
        .append($_img);
    $(".content_img").css({"width":JSON.parse($config).config.width,"height":height});

    //根据图片数量创建圆圈切换标签
    for(var j=0;j<JSON.parse($config).src.length;j++){
        $_span += "<span></span>";
    }
    $(".content").after("<div class='radius'></div>");
    $(".radius").append($_span);
    $("span:first").addClass("on");
    //
    //if($(window).width()>1400){
    //    $(".content_img").width($(window).width());
    //    $(".carousel").width($(window).width());
    //    $(".content").width($(window).width()*3)
    //}else{
    //    $(".content_img").width(375);
    //    $(".carousel").width(375*3);
    //    $(".content").width(375*3)
    //}
    //事件处理函数
    var $left_val = parseInt($(".content").css("left"));
    function moving(start,end,speed){
        if($left_val===start){
            $left_val=end
        }
        else{
            $left_val+=speed;
        }
        var a=$left_val/JSON.parse($config).config.width;
        $(".content").css("left",$left_val+"px");

        var span=$("span");
        span.removeClass("on");
        span.eq(a).attr("class","on")
    }
    //绑定圆圈切换图片时间
    for(var i=0;i<$("span").length;i++){
        (function(n){
            $("span")[n].onclick=function(){
                span_control(this,n)
            }
        })(i)
    }
    //事件处理函数
    function span_control(that,num){
        $("span").removeClass("on");
        $(that) .attr("class","on");
        $(".content").css("left",num*-(JSON.parse($config).config.width)+"px");
    }
    //添加定时器
    timer=setInterval(function(){
        moving(0,-(carouselWidth-JSON.parse($config).config.width),JSON.parse($config).config.width)
    },2000);
    $(".carousel").hover(function(){
        clearInterval(timer);
        clearInterval(timer1);
    },function(){
        timer1=setInterval(function(){
            moving(0,-(carouselWidth-JSON.parse($config).config.width),JSON.parse($config).config.width)
        },2000)
    });
    //轮播图自适应屏幕宽度
    //var picWidth = JSON.parse($config).config.width;//获取轮播图片的宽
    //var $screenWidth = document.body.clientWidth; //获取屏幕的宽
    //if(screenWidth>992){
    //   picWidth=picWidth*2
    //}
    //else{
    //    picWidth=picWidth*3;
    //}
    //console.log(JSON.parse($config).config.width)
    //JSON.parse($config).config.width=500;
    //console.log(picWidth);


    //底部按钮绑定事件
    for(var k=0;k<$(".footer_contain").length;k++){
        (function(n){
            $(".footer_contain")[n].onclick=function(){
                list_control(this)
            }
        })(k)
    }
    function list_control(that){
        $(".footer_contain").removeAttr("id");
        $(that) .attr("id","on");
    }
});