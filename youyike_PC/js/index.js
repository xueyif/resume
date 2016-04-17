var benner = $('#benner');
var aDiv = $('div',benner);
var visuaW = document.documentElement.clientWidth||document.body.clientWidth;
var visuaH = document.documentElement.clientHeight||document.body.clientHeight;
var visualW = visuaW/2;
var visualH = visuaH/2;
benner.style.left = (visuaW-benner.offsetWidth)/2+'px';
benner.style.top = (visuaH-benner.offsetHeight)/2-(visuaH/20)+'px';

aDiv[0].style.left = '34px';
aDiv[0].style.top = '-13px';
aDiv[1].style.left = '41px';
aDiv[1].style.top = '-18px';
aDiv[2].style.left = '804px';
aDiv[2].style.top = '54px';

//跟随鼠标
var benner = document.getElementById('benner');
var bennerD = benner.getElementsByTagName('div');
var x1 = 0;
var x2 = 0;
var y1 = 0;
var y2 = 0;
var gapx = 0;
var gapy = 0;
document.onmousemove = function(ev){
	var x = ev.clientX;
	var y = ev.clientY;
	var l = bennerD[0].offsetLeft;
	var left = 0;
	var top = 0;
	var t = 0;
	if(Math.abs(x-gapx)>Math.abs(y-gapy)){
		if(x>visualW){
			if(x1<x){
				left = l + 1;
			}else{
				left = l - 1;	
			}
			x1 = x;
		}else{
			if(x2<x){
				left = l + 1;
			}else{
				left = l - 1;
			}
			x2 = x;
		}
		bennerD[0].style.left = left+'px'; 
		bennerD[0].style.transition = '0.1s';
	}else{
		if(y>visualH){
			for(var i=0;i<bennerD.length;i++){
				t = bennerD[i].offsetTop;
				if(y1<y){
					top = t - 1;
				}else{
					top = t + 1;
				}
				// console.log(top)
				bennerD[i].style.top = top + 'px';
				bennerD[i].style.transition = '0.01s';
			}
			y1 = y;
		}else{

			for(var i=0;i<bennerD.length;i++){
				t = bennerD[i].offsetTop;
				if(y2<y){
					top = t - 1;
				}else{
					top = t + 1;
				}
				bennerD[i].style.top = top + 'px';
				bennerD[i].style.transition = '0.01s';
			}
			y2 = y;
		}
	}
	gapx = x;
	gapy = y;	
}
//作品介绍
var worksI = $('#worksI');
var news = $('#news');
var newsW = news.offsetWidth;
var newsH = news.offsetHeight;
// console.log(visua)
news.style.left = visuaW-newsW-20+'px';
worksI.onclick = function(){
	news.style.transition = '.5s';
	if(this.className != 'worksI'){
		news.style.height = '500px';
		news.style.left = (view().W-newsW)/2+'px';
		this.className = 'worksI';
	}else{
		news.style.height = '67px';
		news.style.left = visuaW-newsW-20+'px';
		this.className = '';
	}
	news.style.top = '10px';
}

var changeLi = $('li',$('#change'));
var opusDiv = $('div',$('#opus'));
for(var i=0;i<changeLi.length;i++){
	changeLi[i].index = i;
	changeLi[i].onclick = function(){
		for(var i=0;i<changeLi.length;i++){
			changeLi[i].className = '';
			opusDiv[i].style.display = 'none';
		}
		this.className = 'active';
		opusDiv[this.index].style.display = 'block';
	}
}
//拖拽
var newsHd = $('#newsHd');
newsHd.onmousedown = function(ev){
	news.style.transition = 'none';
	var x = ev.clientX - news.offsetLeft;
	var y = ev.clientY - news.offsetTop;
	var l = 0;
	var t = 0;
	var newsH = news.offsetHeight;
	news.onmousemove = function(ev){
		l = ev.clientX - x;
		t = ev.clientY - y;
		if(t<=0){
			t = 0;
		}else if(t+newsH>view().H){
			t = view().H-newsH;
		}
		news.style.left = l + 'px';
		news.style.top = t + 'px';
		return false;
	}
	news.onmouseup = function(){
		news.style.transition = '.5s';
		if(l+newsW>view().W){
			news.style.left = view().W-newsW + 'px';
		}else if(l<0){
			news.style.left = 0;
		}
		news.onmousemove = news.onmouseup = null;
	}
}

//作品轮播
var opusImg = $('#opusImg');
var play = $('#play');
var playImg = $('img',$('#play'));
var imgW = playImg[0].offsetWidth;
var imgLen = playImg.length;
var timer = null;
var n = 0;
var arrUrl = ['img/tmall.png','img/pid.png','img/uehtml.png','img/yinyuetai.png','img/pid2.png','img/tmall2.png']
var switchS = $('span',$('#switch'));
opusImg.style.transform = 'translate(0,0)';
play.style.width = imgLen*imgW+'px';
opusImg.onmouseover = function(){
	clearInterval(timer);
}
opusImg.onmouseout = function(){
	roll();
}
switchS[1].onclick = function(){
	n++;
	switc();
}
switchS[0].onclick = function(){
	n--;
	n = n<0?arrUrl.length-1:n;
	playImg[0].src = arrUrl[n];
	doMove(play,'left',25,0,function(){
		playImg[1].src = playImg[0].src;
		play.style.left = -imgW + 'px';
	})
}
roll();
function roll(){
	timer = setInterval(function(){
		n++;
		console.log(n)
		switc();
	},2000)
}
function switc(){
	n>=arrUrl.length?n=0:n;
	playImg[2].src = arrUrl[n];
	doMove(play,'left',25,-imgW*2,function(){
		playImg[1].src = playImg[2].src;
		play.style.left = -imgW + 'px';
	})
}

//导航跟随
var nav = $('#nav');
var box = $('#box');
box.style.top = nav.offsetTop-$('#content').offsetHeight-30+'px';
nav.style.transform = 'translatex(0) scale(1)';
var navmove = $('#navmove');
var navA = $('a',nav);
navmove.style.left = navA[0].offsetLeft + 'px';
var navAleft = navA[0].offsetLeft;
var content = $('section',$('#box'));
var arrElement = [];
var close = $('#close');
var closeP = close.offsetParent;
var old = 0;
for(var i=0;i<content.length;i++){
	if(content[i].className == 'content'){
		arrElement.push(content[i]);
	}
}
for(var i=0;i<navA.length;i++){
	navA[i].onOff = false;
	navA[i].index = i;
	navA[i].onmouseover = function(){
		navmove.style.left = this.offsetLeft + 'px';
	}
	navA[i].onmouseout = function(){
		if(!this.onOff){
			navmove.style.left = navAleft + 'px';
		}else{
			this.onOff = false;
		}
	}
	navA[i].onclick = function(){
		this.onOff = true;
		navAleft = this.offsetLeft;
		if(this.index === 0){
			closeP.style.top = '500px';
			closeP.style.opacity = 0;
			news.style.left = visuaW-newsW-20+'px';
			opusImg.style.transform = 'translate(0,0)';
		}
		if(old != this.index&&this.index!=0){
			closeP.style.top = '500px';
			closeP.style.opacity = 0;
			setTimeout(function(){
				closeP.style.top = '-29px';
				closeP.style.opacity = 1;
			},100);
		}
		old = this.index;
		for(var i=0;i<arrElement.length;i++){
			arrElement[i].style.opacity = 0;
			arrElement[i].style.top = '500px';
		}
		if(this.index<=0) return;
		arrElement[this.index-1].style.opacity = 1;
		var contentS = $('span',arrElement[this.index-1]);
		for(var i=0;i<contentS.length;i++){
			if(contentS[i].className == 'triangle'){
				contentS[i].style.left = this.offsetLeft+this.offsetWidth/2 + 'px';
			}
		}
		news.style.left = '1500px';
		opusImg.style.transform = 'translate(300px,300px)';
		arrElement[this.index-1].style.top = 0;
	}
}
close.onclick = function(){
	for(var i=0;i<arrElement.length;i++){
		arrElement[i].style.opacity = 0;
		arrElement[i].style.top = '500px';
	}
	closeP.style.top = '500px';
	closeP.style.opacity = 0;
	navmove.style.left = navA[0].offsetLeft + 'px';
	news.style.left = visuaW-newsW-20+'px';
	opusImg.style.transform = 'translate(0,0)';
}

var nav2A = $('a',$('#nav2'));
var navSpan = $('span',$('#nav2'))[0];
follow(nav2A,navSpan);
function follow(nav2A,navSpan){
	navSpan.style.left = nav2A[0].offsetLeft + 'px';
	var nav2Aleft = nav2A[0].offsetLeft;
	var _this = nav2A[0];
	var nav2AWidth = nav2A[0].offsetWidth;
	for(var i=0;i<nav2A.length;i++){
		nav2A[i].onOff = false;
		nav2A[i].onmouseover = function(){
			for(var i=0;i<nav2A.length;i++){
				nav2A[i].className = '';
			}
			this.style.color = '#6f6f6f';
			navSpan.style.left = this.offsetLeft + 'px';
			navSpan.style.width = this.offsetWidth + 'px';
			if(!this.onOff){
				_this.style.color = '#fff';
			}
		}
		nav2A[i].onmouseout = function(){
			if(!this.onOff){
				this.style.color = '#fff';
				navSpan.style.left = nav2Aleft + 'px';
				navSpan.style.width = nav2AWidth + 'px';
				_this.style.color = '#6f6f6f';
			}else{
				this.onOff = false;
			}
		}
		nav2A[i].onclick = function(){
			this.onOff = true;
			nav2Aleft = this.offsetLeft;
			nav2AWidth = this.offsetWidth;
			_this = this;
		}
	}
}

//作品横轴滚动条
var scroll = $('#scroll');
var casel = $('#case');
var caseW = $('#caseW');
var caseLi = $('li',casel);
var scrollSpan = $('span',scroll)[0];
var caseLiW = caseLi[0].offsetWidth+15;
casel.style.width = caseLiW*caseLi.length + 'px';
caseW.style.width = scroll.offsetWidth + 'px';
var caselW = casel.offsetWidth;
var scrollW = scroll.offsetWidth;
scrollSpan.style.width = caseW.offsetWidth/caselW*scrollW + 'px'
scrollSpan.onmouseover = function(){
	this.style.background = '#54c3f1';	
}
scrollSpan.onmouseout = function(){
	this.style.background = '';
}
scrollSpan.onmousedown = function(ev){
	var x = ev.clientX - this.offsetLeft;
	document.onmousemove = function(ev){
		var l = ev.clientX - x;
		var t = ev.clientY;
		if(l<=0) l=0;
		if(l>=scrollW-scrollSpan.offsetWidth) l=scrollW-scrollSpan.offsetWidth;
		scrollSpan.style.left = l + 'px';
		casel.style.left = -l/scrollW*caselW + 'px';
		return false;
	}
	document.onmouseup = function(){
		document.onmousemove = document.onmouseup = null;
	}
}

mousewheel($('#content'),function(){
	var left = scrollSpan.offsetLeft - 50;
	if(left<=0) left = 0;
	scrollSpan.style.left = left + 'px';
	casel.style.left = -left/scrollW*caselW + 'px';
},function(){
	var left = scrollSpan.offsetLeft + 10;
	if(left>=scrollW-scrollSpan.offsetWidth) left=scrollW-scrollSpan.offsetWidth;
	scrollSpan.style.left = left + 'px';
	casel.style.left = -left/scrollW*caselW + 'px';
})
function $(selector,content){
	var firstChar = selector.charAt(0);
	content = content || document;
	if( firstChar === '#' ){
		return document.getElementById(selector.slice(1));
	}else if(  firstChar === '.'  ){
		var allElement = document.getElementsByTagName('*');
		var arr =[];
		for( var i = 0; i < allElement.length ; i++ ){          
			 var classname = allElement[i].className;
			 var classArr = classname.split(' ');	
			 for( var j = 0; j < classArr.length ; j++ ){  
			 	if( classArr[j] == selector.slice(1) ){	
			 		arr.push( allElement[i] );          
			 		break;     
			 	}
			 }
		};
		return arr; 
	}else{
		return content.getElementsByTagName(selector);
	}
}
function mousewheel(obj,upFn,downFn){
	obj.onmousewheel = fn;
	if(obj.addEventListener){
		obj.addEventListener("DOMMouseScroll",fn,false);
	}
	function fn(ev){
		var e = ev || event;
		var direction = true;
		if( e.wheelDelta ){ //chrome
			direction = e.wheelDelta > 0 ? true : false;
		}else{  //FF
			direction = e.detail < 0 ? true : false;
		}
		if( direction ){  //向上
			typeof upFn === "function" && upFn(e);
		}else{ //向下
			typeof downFn === "function" && downFn(e);
		}
		if(e.preventDefault){
			e.preventDefault();  //ie低版本不兼容
		}
		return false;
	}	
}
//获取样式
function getStyle(obj,attr){     
	if( obj.currentStyle ){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
};
//封装函数 设置参数     控制对象、控制属性、速度、最终值、达到最终值运行的函数
function doMove(obj,attr,speed,target,callBack){ 
	if( obj.moveTimer ) return;	
	var num = parseFloat( getStyle( obj,attr ) );
	speed = num > target ? -Math.abs(speed) : Math.abs(speed);
	obj.moveTimer = setInterval(function(){
		num += speed;
		if(Math.abs(target-num) <= Math.abs(speed)){
			num = target;
			clearInterval(obj.moveTimer);
			obj.moveTimer = null;
			obj.style[attr] = num + 'px';			
			(typeof callBack === "function") && callBack(); 
		}else{
			obj.style[attr] = num + 'px';
		}
	},30)
}
function view(){
	return {
		W:document.documentElement.clientWidth,
		H:document.documentElement.clientHeight
	}
};











