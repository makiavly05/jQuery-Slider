jQuery Slider
=============

A script with no name, this jQuery plugin is a simple solution for implementing a slider on any web page.

Usage
-------------

This plugin requires very little in the way of HTML structure to get started. In the example below, a div contains figures all with the same width. An additional div contains links to move the slider left and right and to specific pages.

	<div id="slider" style="width: 700px;">
		
		<figure>
			<img src="/images/photo_01.jpg" width="350" height="250" alt="New York City" />
			<figcaption>New York City</figcaption>
		</figure>
		
		<figure>
			<img src="/images/photo_02.jpg" width="350" height="250" alt="New York City" />
			<figcaption>New York City</figcaption>
		</figure>
		
		<figure>
			<img src="/images/photo_03.jpg" width="350" height="250" alt="Epic Mickey" />
			<figcaption>Epic Mickey</figcaption>
		</figure>
		
		<figure>
			<img src="/images/photo_04.jpg" width="350" height="250" alt="Sunset" />
			<figcaption>Sunset</figcaption>
		</figure>
		
	</div>
	
	<div>
		<a href="#left">&#8592; Previous</a>
		<span id="pagination">
			<a href="#1">1</a>
			<a href="#2">2</a>
			</span>
			<a href="#right">Next &#8594;</a>
	</div>

To activate the slider without specifying a width (uses the width of slider container) or any other options, use the following code.

	$('#slider').slider();

Examples of options.

	$('#slider').slider({width:700}); // Sets the slider wrapper to 700px wide. (Integer)
	$('#slider').slider({start: 1}); // Animates to the specified position. (Integer)
	$('#slider').slider({loop: true}); // Scrolls from last to first and vice versa. (Boolean)

To move the slider left and right, use the following code.

	$('a[href=#left]').click(function() { $('#slider').slider('left'); return false; });
	$('a[href=#right]').click(function() { $('#slider').slider('right'); return false; });

To move the slider to a specific page use the following code on a group of anchors with the corresponding page numbers.

	$('#pagination a').click(function() { $('#slider').slider('move', $(this).text()); return false; });

To make the slider keyboard accessible, use the code below.

	$(document).keydown(function(event) {
		if (!event.metaKey) {
			if (event.which == 37) { $('#slider').slider('left'); return false; }
			else if (event.which == 39) { $('#slider').slider('right'); return false; }
		}
	});