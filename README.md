OpticalLetterSpacing.js
=======================

jQuery Plugin: Tries to add spacing between characters using positive/negative space.

An explanation of how this project came together: http://gaboosh.com/dmi/type1/final_delivery/index.html


Disclaimer
----------

A few important points here:

* The algorithm used in this code is experimental and not perfect by any means. See link above for an explanation of how this came together.
* This is my first jQuery plugin.
* This is my first jQuery experiment that I am placing on GitHub, which means there may be code in there that doesn't make sense as a plugin or an abstracted "class."
* Please feel free to tear apart this code or leave me comments with recommendations.

Usage
-----

The code uses a predetermined number of pixels on each side of each character to measure positive/negative space. Experiment with different values. In this example, it is 30px:

  $( "#page_header" ).opticalSpace(30);
  
Note: since optical letterspacing on lowercase is usually a bad idea, you'll want to stick to uppercase text only here.