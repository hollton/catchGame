//功能函数
function star(){
	var timer=null;
	var x=0;     //xyy初始化坐标位置
	var y=0;
	var num=0;		//计数捉到的xyy
	var n=0;		//改变title
	var speed=8;	//htl速度,数字越大越快
	var time=10;	//xyy速度,数字越小越快
	
	//改变title
	setInterval(function(){
		n++;
		(n%2)?$(document).attr('title','多媒体作业'):$(document).attr('title','20112807 刘浩东');},1000);
	
	//x坐标随机出现
	function ran(){
		x=Math.floor(Math.random()*940);
		$('#xyy').css('left',x+'px');
	}	
		
	//定时执行
	ran();
	timer=setInterval(goDown,time);
	
	//下降
	function goDown(){
		y++;
		$('#xyy').css('top',y+'px')
		
		//抓到xyy
		if(check()){
			$('body').append('<embed src="sound/succ.mp3" autostart="true" hidden="true" loop="false" height="0" width="0">');
			$('#xyy').css('top',0);
			y=0;
			var left=parseInt($('#htl').css('left'));
			$('#add').fadeIn(300).css('left',left+$('#htl').width()*2.6+'px');
			num++;
			ran();
			clearInterval(timer);
			timer=setInterval(goDown,time);
		}
		
		//未抓到xyy
		if(y>=410){
			$('body').append('<embed src="sound/lose.mp3" autostart="true" hidden="true" loop="false" height="0" width="0">');
			$('#htl').attr('src','img/htl0.jpg');
			clearInterval(timer);
			alert('游戏结束，共抓到了'+num+'只小羊哦');
			$('#mask').css('display','block');
		}
	}
			
	//碰撞检测
	function check() {
		//得到xyy宽高及距离左侧和上端的距离
		var xyyOffset = $("#xyy").offset();
		var xyyWidth = parseInt($("#xyy").css("width").replace("px", ""));
		var xyyHeight = parseInt($("#xyy").css("height").replace("px", ""));
		
		//得到htl宽高及距离左侧和上端的距离
		var htlOffset = $("#htl").offset();
		var htlHeight = parseInt($("#htl").css("height").replace("px", ""));
		var htlWidth = parseInt($("#htl").css("width").replace("px", ""));
		
		//左侧和上方相交的boolean
		var leftBool;
		var topBool;
		
		//左侧相交
		if (xyyOffset.left > htlOffset.left) {
			leftBool = xyyOffset.left - htlOffset.left - htlWidth < 0;
		} else {
			leftBool = htlOffset.left - xyyOffset.left - xyyWidth < 0;
		}
		
		//上方相交
		if (xyyOffset.top > htlOffset.top) {
			topBool = xyyOffset.top - htlOffset.top - htlHeight < 0;;
		} else {
			topBool = htlOffset.top - xyyOffset.top - xyyHeight < 0;
		}
		
		//上方和左侧共同相交则表明碰撞
		if (leftBool && topBool) {
			return true;
		} 
	}		
		
	//键盘控制
	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
				
		if(e && e.keyCode==37){	//左
			$('#htl').css('left',parseInt($('#htl').css('left'))-speed+'px');
			$('#add').fadeOut(500);
		}
		if(parseInt($('#htl').css('left'))<=0){
			$('#htl').css('left',0+'px');
		}
		
		
		if(e && e.keyCode==39){	//右
			$('#htl').css('left',parseInt($('#htl').css('left'))+speed+'px');
			$('#add').fadeOut(500);
		}
		if(parseInt($('#htl').css('left'))>=880){
			$('#htl').css('left',880+'px');
		}
	}
}

//执行
$('#star').click(function(){
	$('#mask').css('display','none');
	$('#htl').attr('src','img/htl.jpg');
	$('embed').remove();
	star();});