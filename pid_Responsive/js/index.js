$('#btn').click(function(){
	$('#nav2').toggle(200);
});
var timer = null;
var n = 0;
var aImg = $('.benner div a');
var aLi = $('.benner li');
function play(){
	clearInterval(timer);
	timer = setInterval(function(){
		n++;
		n = n>=aImg.length?0:n;
		aImg.css({
			opacity:0,
			display:'none'
		})
		aImg.eq(n).css({
			opacity:1,
			display:'block'
		})
		aLi.removeClass();
		aLi.eq(n).addClass('active');
	},2000)
}
play();
aLi.mouseover(function(){
	clearInterval(timer);
})
aLi.mouseout(play);
aLi.click(function(){
	var index = $(this).index();
	aLi.removeClass();
	$(this).addClass('active');
	aImg.css({
		opacity:0,
		display:'none'
	})
	aImg.eq(index).css({
		opacity:1,
		display:'block'
	})
	n = index;
})

var site = $('.box4L nav a');
var box4R = $('.box4R');
site.mouseover(function(){
	var index = $(this).index();
	site.removeClass();
	$(this).addClass('active');
	box4R.hide();
	box4R.eq(index).show();
})
//新闻滚动
var pressLi = $('#press li');
pressPlay();
function pressPlay(){
	pressLi.each(function(index){
		play(index);
	}); 
	function play(index){
		var pressS = $('section',pressLi.eq(index));
		var len = pressS.length;
		var H = pressS.eq(0).height();
		pressLi.css('top',-H+'px');
		var m = 0;
		setInterval(function(){
			m++;
			pressLi.eq(index).stop().animate({
				top:-H*m+'px'
			},function(){
				if(m>=len-1){
					pressLi.eq(index).css('top',0);
					m=0;
				}
			})
		},1000)
	}
} 




/*
var press = document.getElementById('press');
var pressLi = press.getElementsByTagName('li');

for(var i=0;i<pressLi.length;i++){
	pressPlay(i);
}
function pressPlay(i){
	var pressS = pressLi[i].getElementsByTagName('section');
	var len = pressS.length;
	var H = pressS[0].offsetHeight;
	var m = 0;
	setInterval(function(){
		m++;
		if(m>=len){
			m=0;
		}
		pressLi[i].style.top = -H*m+'px';
	},2000)
}
*/


