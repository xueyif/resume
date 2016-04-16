var oChannel = $('#channel');
var oNav1 = $('#nav1');
oChannel.click(function(e){
	if(oNav1[0].style.display == 'block'){
		oNav1.hide();
	}else{
		oNav1.show();
		e.stopPropagation();
	}
})
$(document).click(function(){
	oNav1.hide();
})


//benner幻灯
var timer = null;
var n = 1;
var m = 0;
var final = $('.image a').eq(0).clone();
var first = $('.image a').eq($('.image a').length-1).clone();
$('.image').prepend(first);
$('.image').append(final);
var dot = $('.oUl li a');
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
	},1000);
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
				n=len-2;
				m=len-3;
				dot.removeClass();
				dot.eq(m).addClass('first');
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
	clearInterval(timer)
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