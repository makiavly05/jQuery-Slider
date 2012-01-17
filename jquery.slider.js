/* ------------------------------------------------------------
 
 jQuery Slider version 0.1
 http://neo-geek.net/work/jquery-slider/
 
 Copyright (c) 2012 Neo Geek
 Dual-licensed under both MIT and BSD licenses.
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 
------------------------------------------------------------ */

(function($){
	
	var methods = {
		
		init: function (options) {
		
			var options = $.extend({loop:false, start:1}, options);
			
			return this.each(function() {
				
				var $this = $(this);
				
				if ($this.data('page')) { $this.html($this.children().html()); }
				
				if (!options.width) { options.width = $this.children().outerWidth(); }
				
				visible = Math.floor(options.width / $this.children().outerWidth());
				
				$this.data('page', options.start).data('visible', visible).data('loop', options.loop).data('pages', Math.ceil($this.children().length / visible));
				$this.data('width', $this.children().outerWidth() * $this.data('visible'));
				
				$this.css({width: options.width, overflow: 'hidden', position: 'relative'});
				$this.children().css({float: 'left'});
				$this.html('<div style="position: relative; width: ' + $this.children().outerWidth() * $this.children().length + 'px; left: 0; overflow: hidden;">' + $this.html() + '</div>');
				
				if (options.start != 1) { $this.slider('move', options.start); }
				
			});
			
		},
		
		move: function(num) {
			
			if (this.children().is(':animated')) { return false; }
			
			if (num < 0) { num = 1; }
			else if (num > this.data('pages')) { num = this.data('pages'); }
			
			this.children().animate({left: -this.data('width') * (num-1)});
			this.data('page', parseFloat(num));
			
			return this;
			
		},
		
		left: function() {
			
			if (!parseFloat(this.children().css('left'))) {
				if (this.data('loop')) { this.slider('move', this.data('pages')); }
				return false;
			}
			
			this.slider('move', this.data('page')-1);
			
			return this;
			
		},
		
		right: function() {
			
			if (this.data('width') - this.children().outerWidth() >= parseFloat(this.children().css('left'))) {
				if (this.data('loop')) { this.slider('move', 1); }
				return false;
			}
			
			this.slider('move', this.data('page')+1);
			
			return this;
			
		}
		
	}
	
	$.fn.slider = function(method) {
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		
	};
	
})(jQuery);