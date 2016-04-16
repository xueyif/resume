var header = $('#header');
window.onscroll = function(){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
	var documentH=document.documentElement.clientHeight;//页面高度
 	var headerT = header.offset().top;
 	window.scrollTop = scrollTop;
 	window.documentH = documentH;
 	header.css('top',scrollTop);
 	if(scrollTop>=documentH){
 		header.addClass('header2');
 	}else{
 		header.removeClass();	
 		header.addClass('header');
 	}
}
function touchs(event){
	header.stop().animate({opacity:1});
}
function touche(event){
	if(window.scrollTop<=window.documentH) return;
	header.stop().animate({opacity:0},2000);
}

var box_dA = $('.box_d a');
box_dA.each(function(index,item){
	$(item).css('transition',$(this).index()*.3+.5+'s');
})
box_dA.css('transform','rotatey(0deg)');

(function($){
	var message = $('.message');
	var messageA = $('.message a');
	var final = messageA.eq(messageA.length-1).clone();
	message.prepend(final);
	var t = messageA.eq(0).outerHeight();
	message.css('top',-t);
	var timer = null;
	var n = 1;
	play();
	function play(){
		clearInterval(timer);
		timer = setInterval(function(){
			n++;
			message.stop().animate({
				top:-t*n+'px'
			},function(){
				if(n>=messageA.length){
					message.css('top',0);
					n=0;
				}
			})
		},2000)
	}
})(jQuery)


var timer = null;
var n = 1;
var m = 0;
var final = $('.image a').eq(0).clone();
var first = $('.image a').eq($('.image a').length-1).clone();
$('.image').prepend(first);
$('.image').append(final);
var dot = $('.benner_d span');
var len = $('.image a').length;
var w = $('.image a').eq(0).outerWidth();
$('.image').css('width',w*len);
$('.image').css('left',-w);
play();
function play(){
	clearInterval(timer);
	timer = setInterval(function(){
		n++;
		m++;
		fn();
	},1500);
}
function fn(){
	dot.removeClass();
	dot.eq(m).addClass('first');
	$('.image').stop().animate({
		left:-n*w
	},500,function(){
		if(n>0){
			if(n>=len-1){
				m=0;
				dot.removeClass();
				dot.eq(m).addClass('first');
				$('.image').css('left',-w);
				n=1;
			}
		}else{
			if(n<=0){
				m=len-3;
				dot.removeClass();
				dot.eq(m).addClass('first');
				n=len-2;
				$('.image').css('left',w*-n+'px');
			}
		}
		
	});
}

var startX = 0;
var startY = 0;
var finishX = 0;
var distanceX = 0;
function touchstart(event){
	clearInterval(timer);
	startX = event.touches[0].clientX;
	startY = event.touches[0].clientY;
}
function touchmove(event){
	var moveX = event.touches[0].clientX;
	var moveY = event.touches[0].clientY;
	distanceX = moveX - startX;
	finishX = moveX;
	var lastX = $('.image').css('left').replace('px','');
	if(startX>moveX){
		$('.image').css('left',(parseInt(lastX)-Math.abs(distanceX))+'px');
	}else{
		$('.image').css('left',(parseInt(lastX)+Math.abs(distanceX))+'px');
	} 
	startX = moveX;
}
function touchend(event){
	
	if(finishX==0) return;
	if(!$('.image').is(':animated')){
		if(distanceX>0){
			n--;
			m--;
			fn();
		}else{
			n++;
			m++;
			fn();
		}
	}
	play();
}



