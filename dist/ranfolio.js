/*! 
Copyright (c) 2017 by VLThemes
Product: https://github.com/vlthemes/Ranfolio
Author: https://github.com/vlthemes/
License: MIT https://opensource.org/licenses/MIT
*/

(function($) {
	"use strict";
	var methods = {
		init: function(options) {
			var $root = $(this);
			var hovered = null;
			var settings = $.extend({
				randomWidth: true, //Random image width
				randomInterval: [16, 33], //Maximum width of the image when hovering in percent (min, max)
				randomPosition: true, //Random position on screen
				showCounter: true, //Show counters before link element
				delimiter: "", //Delimiter between links,
				duration: 400 //Duration of appearing of the picture
			}, options);
			return this.each(function() {
				var initMethods = {
					init: function() {
						var $main = $(this);
						initMethods.prepareRanfolio.apply($main);
						initMethods.buildRanfolio.apply($main);
						if("" != settings.delimiter){
							initMethods.addDelimiter.apply($main);
						}
						initMethods.changeLinkColor.apply($main);
					},
					prepareRanfolio: function(){
						var self = $(this);
						self.addClass('vl-ranfolio');
						self.wrapInner('<div class="vl-ranfolio-inner">');
						self.find('a').addClass('vl-ranfolio-link');
						self.append('<div class="vl-ranfolio-image"><img src="" alt=""></div>');
						if(true == settings.showCounter){
							self.addClass('vl-ranfolio-counter');
						}
					},
					changeLinkColor: function(){
						var self = $(this),
							linkElement = self.find('a.vl-ranfolio-link');
						linkElement.each(function(){
							var color = $(this).data('color');
							if(color){
								$(this).on({
									mouseenter: function(){
										if(color){
											$(this).attr('style', 'color: '+ color + ';');
										}
									},
									mouseleave: function(){
										$(this).attr('style', '');
									}
								});
							}
						});
					},
					buildRanfolio: function(){
						var self = $(this),
							linkElement = self.find('a.vl-ranfolio-link'),
							image = self.find('.vl-ranfolio-image img');
						linkElement.on('mouseenter', function(){
							self.addClass('hovered');
							var src = $(this).data('image'),
								parentW = self.width(),
								parentH = self.height();
							if(src != hovered){
								image.attr('src', src);
								hovered = src;
								if(true == settings.randomWidth){
									var randomWidth = Math.floor(Math.random() * (settings.randomInterval[1] - settings.randomInterval[0] + 1)) + settings.randomInterval[0];
									image.css('max-width', randomWidth + '%');
								}
								image.on('load', function() {
									if(true == settings.randomPosition){
										var imgW = image.width(),
											imgH = image.height(),
											posx = (Math.random() * (parentW - imgW)).toFixed(),
											posy = (Math.random() * (parentH - imgH)).toFixed();
										image.css({
											'position': 'absolute',
											'top': posy + 'px',
											'left': posx + 'px'
										});
									}
								});
							}
							image.stop().animate({
								opacity: 1
							}, settings.duration);
						});
						linkElement.on('mouseleave', function(){
							self.removeClass('hovered');
							image.stop().animate({
								opacity: 0
							}, 0);
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
			this.removeClass('vl-ranfolio vl-ranfolio-counter hovered');
			this.find('a').removeClass('vl-ranfolio-link').attr('style', '');
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