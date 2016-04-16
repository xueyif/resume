(function ( $ ) {
    $.fn.extend({
		focusFollow : function(options) {
			 var settings = $.extend({
			     color: "#000",
			     speed: 100,
			     opacity: .8,
			     timeout: 200,
			     margin: 0,
				 z_index: 1
			 }, options );
			 if(options.margin_horizontal == null){
			     settings.margin_horizontal = settings.margin;
			 }
			 if(options.margin_vertical == null){
			     settings.margin_vertical = settings.margin;
			 }
		 	var follower = jQuery('<li/>', {}).appendTo('#oUl');
		 	
			 $(follower).css({
			     "z-index": settings.z_index,
			     "position": "absolute",
			     "background-color": settings.color,
			     "opacity": 0,
			     "margin":0
			 });
			 return this.each(function() {
			     $(this).on( "mouseenter", function() {
			     	var spanContent = '';
			     	var html1 = $('span',$(this)).html();
			     	spanContent = "<span class='span'>"+html1+"</span>";
			     	$(follower).html(spanContent)
			         if(options.border_radius == null){
						 if( parseInt($(this).css("border-radius")) != 0){
						 settings.border_radius = parseInt($(this).css("border-radius"))+settings.margin_vertical;
						 }else{
						 settings.border_radius = 0;
						 }
			         }
			         var _this = $(this);
			             $(follower).stop().animate({
			                 'top' : _this.position().top-settings.margin_vertical,
			                 'left' : _this.position().left-settings.margin_horizontal,
			                 'opacity' : settings.opacity,
			                 'height' : _this.outerHeight()+settings.margin_vertical*2,
			                 'width' : _this.outerWidth()+settings.margin_horizontal*2
			             }, settings.speed);
			     }); 
				 if( options.wrapper == null ){
					 $(this).on( "mouseleave", function() {
						 $(follower).stop().animate({
							 'opacity' : 0
						 },settings.timeout);
					 });
				 }else{
					$(settings.wrapper).on( "mouseleave", function() {
						 $(follower).stop().animate({
							 'opacity' : 0,
							 'height':0
						 },settings.timeout);
					 });
				 }
			 });
		}
    });
}( jQuery ));