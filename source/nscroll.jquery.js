/******************************************
 * nscroll
 *
 * simple jquery plugin for making sticky like elements
 *
 * @author          Neschkudla Patrick
 * @copyright       Copyright (c) 2013 Neschkudla Patrick
 * @license         GPLv3
 * @link            http://nscroll.neschkudla.at
 * @docs            http://nscroll.neschkudla.at/
 * @version         Version 1.0.4
 *
 ******************************************/

;(function($) {
	$.fn.extend({
		nscroll: function(options,arg) { 
			if ((options && typeof(options) == 'object') || (typeof(options) == 'undefined')) {
	            options = $.extend( {}, $.nscroll.defaults, options );
	        }
	        this.each(function() {
	            new $.nscroll(this, options, arg );
	        });
	        return;
	    }
	});
	
	 $.nscroll = function( ele, options, arg ) {
        if (options && typeof(options) == 'string') {
           if (options == 'destroy') {
               destroy( arg );
           }
           return;
        }

        $(ele).data('offset-y', $(ele).offset().top).css('position','relative');
        
        if(typeof(options.offsetY) != 'number'){
        	options.offsetY = $(options.offsetY).outerHeight();
        }

        $(window).on('scroll touchmove.'+$(ele).attr($.expando)+' onscroll.'+$(ele).attr($.expando)+' gesturechange.'+$(ele).attr($.expando)+' resize.'+$(ele).attr($.expando), updatePosition);

        updatePosition(arg);
        
        function updatePosition(arg)
        {	
        	scrollToTop = false;
        	if($(document).width() >= options.minWidth){
				if($(window).scrollTop() + options.offsetY > $(ele).data('offset-y')){
					if($(window).scrollTop() - $(ele).data('offset-y') + options.offsetY + $(ele).outerHeight() < $(options.parent).height()){
						var y =  $(window).scrollTop() - $(ele).data('offset-y') + options.offsetY - $(ele).css('top').replace(/[^-\d\.]/g, '');
						if(options.animate){ 
							$(ele).stop().animate({ top: '+='+y }, options.speed, options.ease, options.callback );
						}else{
							$(ele).stop().css('top','+='+y);
							options.callback();
						}
					}else{
						var y =  $(options.parent).outerHeight()-$(ele).outerHeight();
						if(options.animate){
							$(ele).stop().animate({ top: y }, options.speed, options.ease, options.callback );
						}else{
							$(ele).stop().css('top',y);
							options.callback();
						}
					}
				}else{
					scrollToTop = true;
				}
			}else{
				scrollToTop = true;				
			}

			if(scrollToTop){
				if(options.animate){
					$(ele).stop().animate({ top: 0 }, options.speed, options.ease, options.callback );
				}else{
					$(ele).stop().css('top', 0);
					options.callback();
				}
			}
        }
        
        function destroy(arg)
        {
        	$(ele).removeData('offset-y').css('top',0);
        	$(window).unbind('.'+$(ele).attr($.expando));
        }
        
        var waitForFinalEvent = (function () {
    	  var timers = {};
    	  return function (callback, ms, uniqueId) {
    	    if (!uniqueId) {
    	      uniqueId = "Don't call this twice without a uniqueId";
    	    }
    	    if (timers[uniqueId]) {
    	      clearTimeout (timers[uniqueId]);
    	    }
    	    timers[uniqueId] = setTimeout(callback, ms);
    	  };
    	})();
    };

    $.nscroll.defaults = {
	    parent: "body",
	    minWidth: 0,
	    offsetY: 0,
	    animate: true,
	    speed: '10',
	    ease: 'swing',
	    callback: function(){}
    };
})(jQuery);  