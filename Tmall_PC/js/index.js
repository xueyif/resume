// benner运动
var imageA = $('.image a');
var changeA = $('.change a');
var timer = null;
var arrColor = ['#e8e8e8','#fa4481','#e4ffec','#e6e6e6','#e8e8e8'];
var arrPosition2 = ['one','two','three','four','five'];
var arrPosition = ['-364px','-385px','-406px','-427px','-448px'];
var n = 0;
play();	
function play(){
	var m = 0;
	timer = setInterval(function(){
		n++;
		n = n>=imageA.length?0:n;
		imageA.hide(500);
		imageA.eq(n).show(500);
		$('.benner_b').css('background',arrColor[n]);
		changeA.each(function(index,item){
			changeA.eq(index).css('backgroundPosition',arrPosition[index]+' -48px');
		})
		changeA.eq(n).css('backgroundPosition',arrPosition[n]+' -69px');
		m = n;
	},2000);
}
changeA.mouseover(function(){
	clearInterval(timer);
	var index = $(this).index();
	changeA.each(function(index,item){
		changeA.eq(index).css('backgroundPosition',arrPosition[index]+' -48px');
	})
	$(this).css('backgroundPosition',arrPosition[index]+' -69px');
	imageA.hide();
	imageA.eq(index).show();
	$('.benner_b').css('background',arrColor[index]);
	n = index;
})
changeA.mouseout(play);

//benner导航
var classifyLi = $('#classify li');
classifyLi.mouseover(function(){
	classifyLi.removeClass();
	$(this).addClass('active');
	$('.submenu',classifyLi).css('display','none');
	$('.submenu',$(this)).css('display','block');
})
classifyLi.mouseout(function(){
	classifyLi.removeClass();
	$('.submenu',classifyLi).css('display','none');
})


