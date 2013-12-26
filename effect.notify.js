/* Event.Notify script.aculo.us plugin v0.3, 2009.03.28
 *
 * Copyright (c) 2009 rrd http://webmania.cc
 *
 * Displays a notification box and hides it after a given time
 *
 * Usage examples:
 *  new Effect.Notify(element);
 *  new Effect.Notify(element, {notify : {bottom : 50, right : 100}, appear: {}, fade : {duration: 5.0}});
 *  You could use all of the parameters of Effect.Fade and Effect.Appear
 *
 *  Valid keys for the notify parameter:
 *  	top or bottom		:		the top or the bottom position of the notification box in pixels
 *  	right or left		:		the right or left position of the notification box in pixels
 *  	delay					:		how long the notification box should be visible in seconds
 *
 *  If you want to add a close button to your notification box you should have a child element with
 *  notifyClose css class name inside of your notification box
*/

Effect.Notify = Class.create(Effect.Base, {
	initialize : function(element) {
		this.element = $(element);
		if (!this.element) throw(Effect._elementDoesNotExistError);
		
		queue = {
						position:'end',
						scope:(this.element.id || 'global'),
						limit: 2
					};
		
		var args = arguments[1];
		
		this.options = {
			notify : {}
			};
		var notify = args ? (args.notify ? $H(args.notify) : $H({top: 15, left : 15})) : $H({top: 15, left : 15});

		var keys = notify.keys();
		var left = keys.indexOf('left');
		left = (left != -1) ? notify.values()[left] + 'px': null;
		var right = keys.indexOf('right');
		right = (right != -1) ? notify.values()[right] + 'px' : null;
		var top = keys.indexOf('top');
		top = (top != -1) ? notify.values()[top] : null;
		var bottom = keys.indexOf('bottom');
		bottom = (bottom != -1) ? notify.values()[bottom] : null;
		this.pos = {
			name : top ? 'top' : 'bottom',
			value : top ? top : bottom
		}
		var delay = keys.indexOf('delay');
		delay = (delay != -1) ? notify.values()[delay] : 3;
	
		this.element.setStyle({
				position	:	'fixed',
				left : left,
				right : right,
				top: top ? top + 'px' : null,
				bottom : bottom ? bottom + 'px' : null,
				zIndex : 99
				});

		this.options.appear = Object.extend({
			queue: queue
		}, (args) ? args.appear : null || { });

	
		this.options.fade = Object.extend({
			queue: queue,
			delay: delay
		}, (args) ? args.fade : null || { });
		
		//if the element has notifyClose class named descendant
		this.element.descendants().each(function(element){
			if(element.hasClassName('notifyClose'))
				Event.observe(element, 'click', this.fadeNow.bindAsEventListener(this));
			}.bind(this));

		this.appear = new Effect.Appear(this.element, this.options.appear);
		this.fade = new Effect.Fade(this.element, this.options.fade);
	},
	
	fadeNow : function(){
		//stop any running effect
		this.appear.cancel();
		this.fade.cancel();
		//immediataly fade out
		new Effect.Fade(this.element);
	}
});
