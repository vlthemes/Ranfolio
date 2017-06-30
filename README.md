# Ranfolio
Ranfolio is a simple jQuery plugin which allowed to make creative portfolio. Good luck!

### HTML Markup

For using Ranfolio you need to add basic HTML Markup. You just need to create `div` which contain `a` elements with `data-ranfolio-image-src` attribute.

```html
<div class="vl-example-ranfolio">
	<a href="#" data-ranfolio-image-src="dist/image/1.jpg">Iarerom</a>
	<a href="#" data-ranfolio-image-src="dist/image/2.jpg">Gan</a>
	<a href="#" data-ranfolio-image-src="dist/image/3.jpg">Dvethane</a>
	<a href="#" data-ranfolio-image-src="dist/image/4.jpg">Masom</a>
	<a href="#" data-ranfolio-image-src="dist/image/5.jpg">Pokite</a>
	<a href="#" data-ranfolio-image-src="dist/image/6.jpg">Nelofa</a>
	<a href="#" data-ranfolio-image-src="dist/image/7.jpg">Rdeyoma</a>
	<a href="#" data-ranfolio-image-src="dist/image/8.jpg">Qushan</a>
</div>
```

### Call Ranfolio Plugin

To call Ranfolio plugin you need to call `ranfolio()` method in .js file, to your element with menu HTML Markup. Like this:

```javascript
$(document).ready(function(){
    $(".vl-example-ranfolio").ranfolio();
});
```

### Methods
You can use Ranfolio with methods. If you just call `ranfolio()` it initiate portfolio on your HTML Markup. You can call `ranfolio("destroy")` to clear your html from Ranfolio classes and delete functionality.

### Options
To customise your Ranfolio you can call it with options:

```javascript
$(".vl-example-ranfolio").ranfolio({
  imageWidthInterval: [16, 33], //Maximum width of the image when hovering in percent (min, max)
  delimiter: "/" //Delimiter between links
  debug: false //Debug mode
});
```
