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
 * @version         Version 1.1
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

        if($(ele).css('position') != 'absolute' && $(ele).css('position') != 'relative'){
        	$(ele).css('position','relative');
        }
        $(ele).data('nscroll', true).data('offset-y', $(ele).offset().top);
        
        if(typeof(options.offsetY) != 'number'){
        	options.offsetY = $(options.offsetY).outerHeight();
        }

        $(window).bind('scroll.'+$(ele).attr($.expando)+' resize.'+$(ele).attr($.expando),	function(){ updatePosition(arg); });

        updatePosition(arg);
        
        function updatePosition(arg)
        {
        	offset = (options.dynamicOffset != false) ? $(options.parent).data('newTop') * -1 + options.offsetY : options.offsetY;
			if( $(window).scrollTop() + offset > $(ele).data('offset-y')){
				if($(window).scrollTop() - $(ele).data('offset-y') + offset + $(ele).outerHeight() <= $(options.parent).height() - options.offsetY2){
					var y =  $(window).scrollTop() - $(ele).data('offset-y') + offset;
					if(arg == 'random-speed'){
			        	options.speed = Math.floor((Math.random()*1000)+250);
			        }
					if(options.animate){ 
						$(ele).stop().data('newTop', y).animate({ top: y }, options.speed, options.ease, options.callback );
					}else{
						$(ele).stop().data('newTop', y).css('top', y);
						options.callback();
					}
				}else{
					var y =  $(options.parent).outerHeight() - $(ele).outerHeight() - options.offsetY2;
					if(options.animate){
						$(ele).stop().data('newTop', y).animate({ top: y }, options.speed, options.ease, options.callback );
					}else{
						$(ele).stop().data('newTop', y).css('top',y);
						options.callback();
					}
				}
			}
			if($(document).width() < options.minWidth || $(window).scrollTop() + offset <= $(ele).data('offset-y')){
				if(options.animate){
					$(ele).stop().data('newTop', options.offsetY).animate({ top: options.offsetY }, options.speed, options.ease, options.callback );
				}else{
					$(ele).stop().data('newTop', options.offsetY).css('top', options.offsetY );
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
	    offsetY: 0,
	    offsetY2: 0,
	    animate: true,
	    speed: '10',
	    ease: 'swing',
	    randomizedSpeed: false,
	    dynamicOffset: false,
	    callback: function(){}
    };
})(jQuery);  