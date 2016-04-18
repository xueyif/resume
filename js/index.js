var dW = $(document).width();
var dH = document.documentElement.clientHeight||document.body.clientHeight;
var benner = $('.benner');
var box = $('#box');
var boxsL = $('#box>section').length;
benner.css('height',dH);
var bennerH = benner.height();
box.css('height',boxsL);
var n = 0;
var scrollT = 0;
var onOff = true;
$('a').attr('target','_blank');
function wheel(){
	//滚轮切换全屏
	var m = 0;
	mousewheel(document,function(){
		if(!onOff) return;
		if(box.is(':animated')) return;
		n--;
		scrollT = -n*benner.height();
		if(m!=n){
			if(n==0){
				basicLeave(scrollT);
				onOff = false;
			}else if(n==1){
				fightingLeave(scrollT);
				onOff = false;
			}else if(n==2){
				experLeave($('.opus'),scrollT);
				onOff = false;
			}
		};
		m = n;
	},function(){
		if(box.is(':animated')) return;	
		if(!onOff) return;
		n++;
		scrollT = -n*benner.height();
		if(n==0){
			bennerEnter();
		}else if(n==1){
			bennerLeave(scrollT);		
			onOff = false;
		}else if(n==2){
			basicLeave(scrollT);
			onOff = false;
		}else if(n==3){
			fightingLeave(scrollT);
			onOff = false;
		}
		m = n;
	})
}
bennerEnter();
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
function bennerEnter(){
	//benner效果
	$('span',benner).css('transition','1s');
	$('.headset').css({
		left:-dW/20,
		top:dH/20
	});
	$('.logo').css({
		left:(dW-$('.logo').width())/2,
		top:dH/2-$('.logo').height()
	})
	$('.logo div').each(function(index,item){
		$(this).css({
			left:index,
			opacity:1,
			transitionDelay:index*0.05+'px'
		})
	})
	$('.benner p').css('left',(dW-$('.benner p').width())/2);
	$('.benner p:nth-of-type(1)').css('top',dH/2+20);
	$('.benner p:nth-of-type(2)').css('top',dH/2+$('.benner p:nth-of-type(2)').height()+20);
	$('.benner p:nth-of-type(1) strong').each(function(index){
		$(this).css({
			top:0,
			opacity:1,
			transitionDelay:index*0.1+'s'
		})
	});
	$('.benner p:nth-of-type(2) strong').each(function(index){
		$(this).css({
			top:0,
			opacity:1,
			transitionDelay:index*0.05+'s'
		})
	});
	$('.computer_base').css({
		right:(dW-$('.computer_base').width())/2,
		top:0
	});
	$('.glasses').css({
		right:dW/7,
		top:dH/8
	});
	$('.beverage').css({
		right:dW/20,
		top:dH/3
	});
	$('.mouse').css({
		right:dW/8,
		top:dH/1.5,
		opacity:1
	});
	$('.mouse').css('transform','scale(1)');
	$('.pen').css({
		left:dW/20,
		top:dH/1.3
	});
	$('.clavier').css({
		right:(dW-$('.clavier').width())/2,
		bottom:-$('.clavier').height()/2
	});
	setTimeout(function(){
		wheel();
		onOff = true;
	},1000);
}
function bennerLeave(scrollT){
	$('.logo div').each(function(index,item){
		$(this).css({
			left:-500,
			opacity:0
		})
	})
	$('.benner p:nth-of-type(1) strong').each(function(index){
		$(this).css({
			top:-500,
			opacity:0
		})
	});
	$('.benner p:nth-of-type(2) strong').each(function(index){
		$(this).css({
			top:500,
			opacity:0
		})
	});
	$('span',benner).css('transition','none');
	$('.headset').stop().animate({
		left:-1000
	},200);
	$('.computer_base').stop().animate({
		top:-500
	},350);
	$('.glasses').stop().animate({
		right:-500
	},500);
	$('.beverage').stop().animate({
		right:-500
	},650);
	$('.mouse').stop().animate({
		right:-500,
		top:1000
	},800);
	$('.pen').stop().animate({
		left:-200,
		top:1000
	},950,function(){
		box.stop().animate({
			top:scrollT
		});
		basicEnter();
	});
	$('.clavier').stop().animate({
		bottom:-300
	},1100);
}
function basicEnter(){
	//基本信息
	$('.information').css('height',dH);
	$('.me').css('left',(dW-$('.me').width())/2);
	$('.mask1').css('left',-$('.mask1').width()*2);
	$('.mask2').css('left',$('.mask2').width()*2);
	$('.mask3').css('left',-$('.mask3').width()*2);
	$('.mask4').css('left',$('.mask4').width()*2);
	$('.mask5').css('left',-$('.mask5').width()*2);
	$('.mask6').css('left',$('.mask6').width()*2);
	$('.line7').css('height',138);
	$('.line8').css('height',136);
	reveal($('.information'));
	$('.round2',$('.information')).css('top',dH/2+227);
}
function basicLeave(scrollT,obj){
	vanish($('.information'));
	$('.mask').css('left',0);
	$('.round2',$('.information')).css('top',1000);
	setTimeout(function(){
		box.stop().animate({
			top:scrollT
		});
		n==0?bennerEnter():fightingEnter();	
	},10000)
};
function vanish(obj){
	$('.me span',obj).css({
		top:-200,
		opacity:0
	});
	$('.round',obj).css({
		transform:'scale(0)',
		opacity:0
	});
	$('.straight',obj).css('height',0);
	$('.photo',obj).css('transform','scale(0) rotate(-720deg)');
	$('.straight2',obj).css('height',0);
	$('.line1').stop().delay(4000).animate({
		right:1000,
		opacity:0
	},500);
	$('.line2').stop().delay(4000).animate({
		left:1000,
		opacity:0
	},500);
	$('.line3').stop().delay(5000).animate({
		right:1000,
		opacity:0
	},500);
	$('.line4').stop().delay(5000).animate({
		left:1000,
		opacity:0
	},500);
	$('.line5').stop().delay(6000).animate({
		right:1000,
		opacity:0
	},500);
	$('.line6').stop().delay(6000).animate({
		left:1000,
		opacity:0
	},500);
	$('.line7').css({
		right:1000,
		opacity:0
	});
	$('.line8').css({
		left:1000,
		opacity:0
	});
}
function reveal(obj){
	$('.me').css('top',dH/2-247-$('.round').height()-$('.me').height());
	$('.me span',obj).each(function(index,item){
		$(this).css({
			top:0,
			transitionDelay:0.1*index+'s',
			opacity:1
		})
	});
	$('.round',obj).css({
		transform:'scale(1)',
		opacity:1,
		top:dH/2-77-150-$('.round').height(),
		left:(dW-$('.round').width())/2
	})
	$('.straight',obj).css({
		height:150,
		top:dH/2-77-150,
		left:dW/2
	});
	$('.photo',obj).css({
		transform:'scale(1) rotate(720deg)',
		top:dH/2-77,
		left:dW/2-77
	});
	$('.straight2',obj).css({
		height:150,
		top:dH/2+77,
		left:dW/2
	});
	$('.round2',obj).css({
		left:(dW-$('.round2').width())/2,
		opacity:1,
		transition:'1s',
		transitionDelay:'9s'
	});
	$('.line1',obj).css({
		top:dH/2-60-$('.line1',obj).height(),
		right:dW/2+$('.photo').width()/4,
		opacity:1
	});
	$('.line2',obj).css({
		top:dH/2-63-$('.line2',obj).height(),
		left:dW/2+$('.photo').width()/4,
		opacity:1
	});
	$('.line3',obj).css({
		top:dH/2-20-$('.line3',obj).height(),
		right:dW/2+$('.photo').width()/2-3,
		opacity:1
		});
	$('.line4',obj).css({
		top:dH/2-20-$('.line4',obj).height(),
		left:dW/2+$('.photo').width()/2-3,
		opacity:1
		});
	$('.line5',obj).css({
		top:dH/2+20,
		right:dW/2+$('.photo').width()/2-3,
		opacity:1
		});
	$('.line6',obj).css({
		top:dH/2+20,
		left:dW/2+$('.photo').width()/2-3,
		opacity:1
		});
	$('.line7',obj).css({
		top:dH/2+60,
		right:dW/2+$('.photo').width()/3-3,
		opacity:1
	});
	$('.line8',obj).css({
		top:dH/2+60,
		left:dW/2+$('.photo').width()/3-3,
		opacity:1
	});
	setTimeout(function(){
		onOff = true;
	},10000);
}
function fightingEnter(){
	onOff = false;
	//战斗力
	$('.fighting').css('height',dH);
	$('.me2').css('left',(dW-$('.me2').width())/2);
	$('.ability').ClassyLoader({
		width:74,
		height:74,
		percentage:90,
		speed:23,
		diameter:31,
		roundedLine:true,
		showText:false,
		lineColor:'#54c3f1',
		remainingLineColor:'#f2f2f2',
		lineWidth:6,
		start:'top'
	});
	$('.ability2').ClassyLoader({
		width:74,
		height:74,
		percentage:80,
		speed:23,
		diameter:31,
		roundedLine:true,
		showText:false,
		lineColor:'#54c3f1',
		remainingLineColor:'#f2f2f2',
		lineWidth:6,
		start:'top'
	});
	$('.ability3').ClassyLoader({
		width:74,
		height:74,
		percentage:60,
		speed:23,
		diameter:31,
		roundedLine:true,
		showText:false,
		lineColor:'#54c3f1',
		remainingLineColor:'#f2f2f2',
		lineWidth:6,
		start:'top'
	});
	$('.ability4').ClassyLoader({
		width:74,
		height:74,
		percentage:70,
		speed:23,
		diameter:31,
		roundedLine:true,
		showText:false,
		lineColor:'#54c3f1',
		remainingLineColor:'#f2f2f2',
		lineWidth:6,
		start:'top'
	});
	$('.ability5').ClassyLoader({
		width:74,
		height:74,
		percentage:40,
		speed:23,
		diameter:31,
		roundedLine:true,
		showText:false,
		lineColor:'#54c3f1',
		remainingLineColor:'#f2f2f2',
		lineWidth:6,
		start:'top'
	});
	$('.ability6').ClassyLoader({
		width:74,
		height:74,
		percentage:50,
		speed:23,
		diameter:31,
		roundedLine:true,
		showText:false,
		lineColor:'#54c3f1',
		remainingLineColor:'#f2f2f2',
		lineWidth:6,
		start:'top'
	});
	$('.ability7').ClassyLoader({
		width:74,
		height:74,
		percentage:60,
		speed:23,
		diameter:31,
		roundedLine:true,
		showText:false,
		lineColor:'#54c3f1',
		remainingLineColor:'#f2f2f2',
		lineWidth:6,
		start:'top'
	});
	$('.ability8').ClassyLoader({
		width:74,
		height:74,
		percentage:40,
		speed:23,
		diameter:31,
		roundedLine:true,
		showText:false,
		lineColor:'#54c3f1',
		remainingLineColor:'#f2f2f2',
		lineWidth:6,
		start:'top'
	});
	$('.wire1').css({
		height:104,
		width:135,
		top:24
	});
	$('.wire2').css('width',135);
	$('.wire3').css({
		height:42,
		width:162,
		top:24
	});
	$('.wire4').css('width',160);
	$('.wire5').css('height',42);
	$('.wire6').css('height',42);
	$('.wire7').css('height',106);
	$('.wire8').css('height',106);
	$('.skill7').css('height',172);
	$('.skill8').css('height',172);
	reveal($('.fighting'));
	$('.round2',$('.fighting')).css('top',dH/2+227);
}
function fightingLeave(scrollT){
	vanish($('.fighting'));
	$('.wire1').css({
		height:0,
		width:0,
		top:128
	});
	$('.wire2').css('width',0);
	$('.wire3').css({
		height:0,
		width:0,
		top:66
	});
	$('.wire4').css('width',0);
	$('.wire5').css('height',0);
	$('.wire6').css('height',0);
	$('.skill7').css('height',172);
	$('.skill8').css('height',172);
	$('.round2').css('top',1000);
	setTimeout(function(){
		box.stop().animate({
			top:scrollT
		});
		n==1?basicEnter():experEnter();
	},10000)
}
function experEnter(){
	//实战经验
	$('.wroks').css({
		height:dH,
		width:dW*$('.wroks li').length
	});
	$('.wroks li').css({
		width:dW,
		height:dH
	});
	var opus = $('.opus');
	wrok(opus);
	function wrok(opus){
		dW = opus.width();
		dH = opus.height();
		$('.me3',opus).css({
			top:dH/2-275-$('.me3',opus).height(),
			left:(dW-$('.me3',opus).width())/2
		});
		$('.me3 span',opus).each(function(index,item){
			$(this).css({
				top:0,
				transitionDelay:0.1*index+'s',
				opacity:1
			})
		})
		$('.circle',opus).css({
			transform:'scale(1)',
			opacity:1,
			top:dH/2-255,
			left:(dW-$('.circle',opus).width())/2
		})
		$('.vertical',opus).css({
			height:150,
			top:dH/2-243,
			left:dW/2
		});
		$('.circle2',opus).css({
			opacity:1,
			top:dH/2-93,
			left:(dW-$('.circle2',opus).outerWidth())/2
		})
		$('.circle2 span',opus).css('transform','scale(1)');
		$('.vertical2',opus).css({
			height:150,
			top:dH/2-75,
			left:dW/2
		});
		$('.circle3',opus).css({
			opacity:1,
			top:dH/2+75,
			left:(dW-$('.circle3',opus).outerWidth())/2
		})
		$('.circle3 span',opus).css('transform','scale(1)');
		$('.vertical3',opus).css({
			height:150,
			top:dH/2+93,
			left:dW/2
		});
		$('.circle4',opus).css({
			opacity:1,
			top:dH/2+243,
			left:(dW-$('.circle4',opus).outerWidth())/2
		})
		$('.vertical4',opus).css({
			top:$('.circle2',opus).position().top+$('.circle2',opus).outerHeight()/2,
			left:(dW-$('.circle2',opus).outerWidth())/2
		})
		$('.vertical4',opus).stop().animate({
			left:(dW-$('.circle2',opus).outerWidth())/2-150,
			width:150
		},500)
		$('.pid header img',opus).css({
			transform:'translatex(0)',
			opacity:1
		})
		$('.pid header span p',opus).css({
			opacity:1,
			transform:'translatey(0)'
		})
		$('.pid header span time',opus).css({
			opacity:1,
			transform:'translatex(0)'
		})
		$('.pid h3 span',opus).css({
			opacity:1,
			transform:'translatex(0)'
		})
		$('.pid h3 strong',opus).css({
			opacity:1,
			transform:'translatex(0)'
		})
		$('.pid div span',opus).css({
			opacity:1,
			transform:'translatex(0)'
		})
		$('.pid div p',opus).css({
			opacity:1,
			transform:'scale(1)'
		})
		$('.vertical5',opus).css({
			top:$('.circle3',opus).position().top+$('.circle3',opus).outerHeight()/2,
			left:(dW+$('.circle3',opus).outerWidth())/2
		})
		$('.vertical5',opus).stop().animate({
			width:150
		},500)
		$('.pid',opus).css({
			top:$('.vertical4',opus).position().top-$('.pid',opus).height()/2,
			left:$('.circle2',opus).position().left-$('.pid',opus).width()-150
		})
		$('.pidImg',opus).css({
			top:$('.vertical5',opus).position().top-$('.pidImg',opus).height()/2,
			left:$('.vertical5',opus).position().left+160
		})
		$('.pidImg span',opus).css('left',1000);
		$('.pidImg img',opus).css('border','2px solid #54c3f1');
		setTimeout(function(){
			onOff = true;
		},8500);
	}
	//横向滚动条
	var scrol = $('.scrol');
	var scrolSpan = $('span',scrol);
	var scrolW = scrol.width();
	var wroks = $('.wroks');
	var wroksW = wroks.width();
	scrolSpan.css('width',dW/wroksW*scrolW);
	scrolSpan.mousedown(function(ev){
		var x = ev.clientX - $(this).position().left;
		$(document).mousemove(function(ev){
			var l = ev.clientX - x;
			if(l<=0) l=0;
			if(l>=scrolW-scrolSpan.width()) l=scrolW-scrolSpan.width();
			scrolSpan.css('left',l);
			var l2 = l/scrolW*wroksW;
			if(l2>=1000){
				var opus2 = $('.opus2');
				wrok(opus2);
			};
			if(l2>=2000){
				var opus3 = $('.opus3');
				wrok(opus3);
			};
			if(l2>=3000){
				var opus4 = $('.opus4');
				wrok(opus4);
			};
			if(l2>=4000){
				var opus5 = $('.opus5');
				wrok(opus5);
			};
			if(l2>=5000){
				var opus6 = $('.opus6');
				wrok(opus6);
			};
			wroks.css('left',-l2);
			return false;
		});
		$(document).mouseup(function(){
			$(document).off();
		})
	})
	mousewheel(document.getElementById("wroks"),function(){
		var left = wroks.position().left + dW;
		if(left>=0){
			left = 0;
			n = 3;
		};
		scrolSpan.css('left',-left/wroksW*scrolW);
		wroks.css('left',left);
	},function(){
		n = 3;
		var left = wroks.position().left - dW;
		if(-left>=wroksW-dW) left=-(wroksW-dW);
		if(left<=-dW){
			var opus2 = $('.opus2');
			wrok(opus2);
		};
		if(left<=-dW*2){
			var opus3 = $('.opus3');
			wrok(opus3);
		};
		if(left<=-dW*3){
			var opus4 = $('.opus4');
			wrok(opus4);
		};
		if(left<=-dW*4){
			var opus5 = $('.opus5');
			wrok(opus5);
		};
		if(left<=-dW*5){
				var opus6 = $('.opus6');
				wrok(opus6);
		};
		scrolSpan.css('left',-left/wroksW*scrolW);
		wroks.css('left',left);
	});
}
function experLeave(opus,scrollT){
	$('.me3 span',opus).css({
		top:-100,
		opacity:0
	});
	$('.circle',opus).css({
		left:1000,
		opacity:0
	});
	$('.vertical',opus).css({
		left:-500,
		height:0
	});
	$('.circle2',opus).css('opacity',0);
	$('.vertical4',opus).css({
		left:1000,
		width:0
	});
	$('.pid',opus).css('left',-2000);
	$('.vertical2',opus).css('height',0);
	$('.circle3',opus).css('left',-2000);
	$('.vertical5',opus).css('width',0);
	$('.pidImg span',opus).css('left',0);
	$('.vertical3',opus).css('height',0);
	$('.circle4',opus).css({
		top:1000,
		opacity:0
	})
	setTimeout(function(){
		box.stop().animate({
			top:scrollT
		});
		fightingEnter();
	},9000)
};



