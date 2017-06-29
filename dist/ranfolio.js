(function($) {
	"use strict";
	var methods = {
		init: function(options) {
			var $root = $(this);
			var settings = $.extend({
				imageWidthInterval: [16, 33], //Maximum width of the image when hovering in percent (min, max)
				delimiter: "/", //Delimiter between links,
				debug: true //Debug mode
			}, options);
			return this.each(function() {
				var initMethods = {
					init: function() {
						var $main = $(this);
						initMethods.prepareRanfolio.apply($main);
						initMethods.buildRanfolio.apply($main);
						initMethods.addDelimiter.apply($main);
					},
					prepareRanfolio: function(){
						var self = $(this);
						self.addClass('vl-ranfolio');
						self.wrapInner('<div class="vl-ranfolio-inner">');
						self.find('a').addClass('vl-ranfolio-link');
						self.append('<div class="vl-ranfolio-image"></div>');
					},
					buildRanfolio: function(){
						var self = $(this),
							linkElement = self.find('a.vl-ranfolio-link'),
							imageContainer = self.find('.vl-ranfolio-image');
						linkElement.each(function(){
							var el = $(this),
								imageSrc = el.data('ranfolio-image-src');
							el.on({
								mouseenter: function(){
									self.addClass('hovered');
									var randomWidth = Math.floor(Math.random() * (settings.imageWidthInterval[1] - settings.imageWidthInterval[0] + 1)) + settings.imageWidthInterval[0],
										appendedImage = imageContainer.append('<img src="'+imageSrc+'" alt="'+el.text()+'" style="max-width:' + randomWidth + '%;">').end().find('img'),
										parentW = self.width(),
										parentH = self.height();
									if (typeof imagesLoaded !== 'undefined') {
										appendedImage.imagesLoaded(function() {
											var imgW = appendedImage.width(),
												imgH = appendedImage.height(),
												posx = (Math.random() * (parentW - imgW)).toFixed(),
												posy = (Math.random() * (parentH - imgH)).toFixed();
											appendedImage.css({
												'top': posy + 'px',
												'left': posx + 'px',
												'visibility': 'visible'
											});
										}).progress(function(instance, image) {
											var result = image.isLoaded ? 'loaded' : 'broken';
											settings.debug ? console.log('Image is ' + result + ' for ' + image.img.src) : '';
										});					
									}else{
										appendedImage.on('load', function() {
											var imgW = appendedImage.width(),
												imgH = appendedImage.height(),
												posx = (Math.random() * (parentW - imgW)).toFixed(),
												posy = (Math.random() * (parentH - imgH)).toFixed();
											appendedImage.css({
												'top': posy + 'px',
												'left': posx + 'px',
												'visibility': 'visible'
											});
										});						
									}
								},
								mouseleave: function(){
									self.removeClass('hovered');
									imageContainer.empty();
								}
							});
						});
					},
					addDelimiter: function() {
						var self = $(this),
							linkElement = self.find('.vl-ranfolio-link:not(:last-of-type)');
						$('<span class="vl-ranfolio-delimiter">'+settings.delimiter+'</span>').insertAfter(linkElement);
					}
				};
				initMethods.init.apply(this);
			});
		},
		destroy: function() {
			this.removeClass('vl-ranfolio hovered');
			this.find('a').removeClass('vl-ranfolio-link');
			this.find('.vl-ranfolio-image').remove();
			this.find('.vl-ranfolio-delimiter').remove();
		}
	};
	$.fn.ranfolio = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method: " + method + " does not exists. jQuery.ranfolio");
		}
	};
})(jQuery);