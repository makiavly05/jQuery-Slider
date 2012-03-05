/* ------------------------------------------------------------
 
 jQuery Slider version 0.2.1
 http://neogeek.github.com/jQuery-Slider/
 
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
		
			var options = $.extend({'loop':false}, options);
			
			return this.each(function() {
				
				var $this = $(this);
				
				if (!options.width) {
					
					$this.css('width', '');
					options.width = $this.outerWidth();
					
					if ($this.data('options') && $this.data('options').width == options.width) {
						$this.css('width', options.width);
						return false;
					}
					
				}
				
				if ($this.data('pages')) { $this.html($this.children().html()); }
				
				$this.data('options', options);
				
				$this.data('visible', Math.floor(options.width / $this.children().outerWidth()));
				$this.data('pages', Math.ceil($this.children().length / $this.data('visible')));
				$this.data('innerWidth', $this.children().outerWidth() * $this.data('visible'));
				
				$this.css({width: options.width, position: 'relative', overflow: 'hidden'});
				
				$this.children().css({'float': 'left'});
				
				$this.children().first().addClass('first');
				
				$this.html('<div style="position: relative; left: 0; top: 0; width: ' + $this.children().outerWidth() * $this.children().length + 'px; overflow: hidden;">' + $this.html() + '</div>');
				
				if (options.start != 1) {
					jQuery.fx.off = true;
					$this.slider('move', options.start);
					jQuery.fx.off = false;
				}
				
			});
			
		},
		
		move: function(num) {
			
			$this = $(this);
			
			if ($this.children().is(':animated')) { return false; }
			
			first = $this.children().children().first();
			
			if ($this.data('options').loop && $this.children().find('.first').index()) {
				$this.children().append($this.children().children().slice(0, $this.children().find('.first').index())).css({left: -$this.find(first).position().left});
			}
			
			$this.children().animate({left: -$this.data('innerWidth') * (num-1)}, function() {
				if ($this.data('options').loop) {
					$this.children().css({left: 0}).append($this.children().children().slice(0, $this.data('visible') * (num-1)));
				}
			});
			
		},
		
		left: function() {
			
			$this = $(this);
			
			if ($this.children().is(':animated')) { return false; }
			
			if ($this.data('options').loop) {
				$this.children().prepend($this.children().children().slice(-$this.data('visible'))).css({left: -$this.data('innerWidth')});
			}
			
			if (parseFloat($this.children().css('left'))) {
				$this.children().animate({left: '+=' + $this.data('innerWidth')});
			}
			
			return this;
			
		},
		
		right: function() {
			
			$this = $(this);
			
			if ($this.children().is(':animated')) { return false; }
			
			if (parseFloat($this.children().css('left')) > -(parseFloat($this.children().css('width'))-$this.data('innerWidth'))) {
				
				$this.children().animate({left: '-=' + $this.data('innerWidth')}, function() {
					if ($this.data('options').loop) {
						$this.children().css({left: 0}).append($this.children().children().slice(0, $this.data('visible')));
					}
				});
				
			}
			
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