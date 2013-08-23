nscroll
=======

lightweight jquery plugin for "sticky sidebar" - like behaviour for any element

how to use?
-------

using nscroll is really easy.

The easiest way to use nscroll is this:

 ```javascript
$('#mySidebar').nscroll();
 ```
 
You can also select multiple dom elements at once. they will all be nscroll initiated.

You can nest one nscroll element inside another nscroll element. At this time, there's only one nested nscroll element possible.
Infinite nesting will be available at some point in the future.
 
If you have a container which should constrain the movement of the scrolling element, you can define it via the options object.
There are a few things you can adjust to your needs:

 ```javascript
$('#mySidebar').nscroll({
  parent: '#mySidebarParent', // this is the parent within which the scrolling element...scrolls
  offsetY: 24, // use this if you have a fixed header or similar elements which are atop of your scrolling element
  animate: true, // defines if the scrolling should be animated or not
  speed: 1000, // only affects animated nscrolls
  ease: 'swing', // only affects animated nscrolls
  afterScroll: function(){} // this function will be called after the element reached its new position
});
 ```

 examples
 -------

 nscroll is used for the right sidebar on my wordpress powered blog: http://neschkudla.at