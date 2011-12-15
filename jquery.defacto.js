/**
 * jQuery.defacto is a plugin for default text. It is an extraction of some functions written at A + L DESIGN 
 * for the purpose of providing default text to input fields that needed it. The plugin has a built-in password
 * type changer that is cross-browser (and jQuery, of course) compliant, as well as provisions to change the color
 * of the default text.
 *
 * @author Tom Scott <tom@aplusldesign.com> & Mike Dombrowski <mike@aplusldesign.com>
 */ 
$.fn.defacto = function() {
	/**
	 * Container for functions
	 *
	 * @param {jQuery}  o - DOM element
	 * @param {Options} c - config settings
	 * @constructor
	 */
	var DefaultInput = function(o, c) {
		var self = this;
		
		/**
		 * Binds all events and constructs the plugin.
		 *
		 * @constructor
		 */
		this.bind = function() {
			var v = o.attr('value');
			
			o.data('default', v)
			o.bind('focus',function() { self.clear(); })
			o.bind('blur',function() { self.replace(); });
			
			if (c.defaultColor) {
				o.css({color: c.defaultColor});
			}
		};
		
		/**
		 * Toggles typed text and default text.
		 */
		this.replace = function() {
			var v = o.attr('value');
			var d = o.data('default');
			var p = o.hasClass('password');
			
			if (v=='') o.attr('value',d);
			if (p && v=='') {
				if (c.defaultColor) {
					var tClone = o.clone().attr('type','text').css({color: c.defaultColor}); 
				} else {
					var tClone = o.clone().attr('type','text');
				}
				var tClone =  o.clone().attr('type','text');
				o.replaceWith(tClone);
				tClone.bind('focus',function() { clearText($(this)); }).data('default',d).attr('value',d).blur();
			}
		};
		
		/**
		 * Clears the input's default text to prepare for typing.
		 */
		this.clear = function() {
			var v = o.attr('value');
			var d = o.data('default');
			var p = (o.hasClass('password') || (o.attr('type') == 'password'));
			
			if (v==d) o.attr('value','');
			if (p) {
				var pClone = o.clone().attr('type','password').css({color: o.data('color')});
				o.replaceWith(pClone)
				pClone.bind('blur',function() { replaceText($(this)); }).data('default',d).focus();
			}
		};
		
		this.bind();
	};
	
	/**
	 * Runtime
	 */
	return this.each(function(options) {
		var element = $(this);
		var testInput = document.createElement('input');
		
		var config = {
			defaultColor: '',
			dimColor: '',
			dimmer: false
		};
		
		$.fn.extend(config, options);
		
		// only run if HTML5 placeholder="" works, and the element has a placeholder
		if (!('placeholder' in testInput) && !element.attr('placeholder')) {
			var di = new DefaultInput(element, config);
		}
	});
};