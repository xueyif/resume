var oList = document.getElementById('list');
var oUl = document.getElementById('ul');
var oNaviga = document.getElementById('naviga');
var aLi = oNaviga.getElementsByTagName('li');
var oBtn = document.getElementById('btn2');
var oNit = document.getElementById('navigation');
var arr = [];
oList.onmouseover = function()
{
	oUl.style.display = 'block';
}
oList.onmouseout = function()
{
	oUl.style.display = 'none';
}

for(var i=0;i<aLi.length;i++)
{	
	if(aLi[i].parentNode == oNaviga)
	arr.push(aLi[i])
}
for(var i = 0;i<4;i++)
{
	arr[i].onmouseover = function(){		 
		this.getElementsByTagName('ul')[0].style.display = 'block'
	}
	arr[i].onmouseout = function(){
		this.getElementsByTagName('ul')[0].style.display = 'none'
	}
}
oBtn.onclick = function()
{
	if(oNit.style.display == 'none')
	{
		oNit.style.display = 'block'
	}else{
		oNit.style.display = 'none'
	}
}
//信息滚动
var message = $('.message');
var messageD = $('.message div');
var news = $('.news');
var last = $('#last');
var next = $('#next');
var liNext = $('.next');
var timer = null;
var n = 1;
play();
news.mouseover(function(){
	clearInterval(timer);
});
news.mouseout(function(){
	play();
});
liNext.mouseover(function(){
	clearInterval(timer);
});
liNext.mouseout(function(){
	play();
});
last.click(function(){
	clearInterval(timer);
	if(message.is(":animated")) return;
	n--;
	slide();
});
next.click(function(){
	clearInterval(timer);
	if(message.is(":animated")) return;
	n++;
	slide();
});
function play(){
	clearInterval(timer);
	timer = setInterval(function(){
		n++;
		slide();
	},2000)
}
function slide(){
	var t = messageD.eq(0).outerHeight();
	message.stop().animate({
		top:-t*n+'px'
	},function(){
		if(n>0){
			if(n>=messageD.length-1){
				message.css('top',-t);
				n=1;
			}
		}else{
			if(n<=0){
				n=messageD.length-2;
				message.css('top',n*-t+'px');
			}
		}
	})
}
//导航跟随
var nagt = $('.nagt').position().top;
window.onscroll = function(){
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
	console.log(scrollTop > nagt)
	if(scrollTop > nagt){
		$('.nagt').css('top',scrollTop-nagt+'px');
	}else{
		$('.nagt').css('top',0);
	}
	
}
//鼠标跟随
$('.last .img1').focusFollow({
	wrapper: '#oUl',
	margin_vertical:0,
	margin_horizontal:0,
	color: '#000',
	speed: 300,
	timeout: 300
})
//作者信息
var create =  $('.create');
var div = $('<div/>');
div.css({
	position:'relative',
	width:'0',
	height:'148px',
	background:'url(img/introduce.png)',
	zIndex:200,
	opacity:0
});
$('body').append(div);
for(var i=0;i<create.length;i++){
	create[i].index = i;
	create[i].onmouseover = function(){
		var createT = $(this).offset().top;
		var createH = $(this).outerHeight();
		var createW = $(this).outerWidth();
		var createL = $(this).offset().left;
		var divH = div.outerHeight();
		var height = document.documentElement.clientHeight;
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		div.css({
			left:createL,
			width:346,
			opacity:1,
			transition:'.2s'
		})
		if(createT+createH+divH>=height+scrollTop){
			div.css('top',createT-divH);
		}else{
			div.css('top',createT+createH);
		}
	}
	create[i].onmouseout = function(){
		div.css({
			width:0,
			opacity:0
		})
	}
}
//用户点击切换
var uelike = $('.uelike');
var below = $('.below');
var up = $('.up');
var cur = 0;
below.click(function(){
	cur++;
	cur = cur>=uelike.length-1?cur=-1:cur;
	uelike.hide(300);
	uelike.eq(cur).show(300);
})
up.click(function(){
	cur--;
	cur = cur<0?cur=uelike.length-1:cur;
	uelike.hide(300);
	uelike.eq(cur).show(300);
})
