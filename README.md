effect.notify
=============

Event.Notify script.aculo.us extension

This is a minimalist user notifiation effect.

Displays a notification box and hides it after a given time or when it is closed.

### Usage examples

 *  new Effect.Notify(element);
 *  new Effect.Notify(element, {notify : {bottom : 50, right : 100}, appear: {}, fade : {duration: 5.0}});
 *  You could use all of the parameters of Effect.Fade and Effect.Appear

### Valid keys for the notify parameter

 *  	top or bottom		:		the top or the bottom position of the notification box in pixels
 *  	right or left		:		the right or left position of the notification box in pixels
 *  	delay					:		how long the notification box should be visible in seconds

If you want to add a close button to your notification box you should have a child element with "notifyClose" css class name inside of your notification box.
