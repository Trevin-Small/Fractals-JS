# JS-Fractals
 Javascript Fractals!
https://trevin-small.github.io/JS-Fractals/

Pretty cool what some circles, recursion, and triginometry can do!!

The mechanics behind JS-Fractals can be broken down into simple rules that are applied recursively.

First, a center or 'parent' circle is drawn. Next, 4 children circles are drawn (upwards, rightwards, downwards, leftwards) relative to the center circle. These circles are centered on the parent circles curve.

Each of these children circles becomes a parent circle and draws its own children circles. The direction that its children are drawn in is based upon the direction the parent was drawn in.

Ex. Parent circle was drawn leftward from its parent, so children circles are drawn leftward, upward, and downward. 
Ex. Parent circle was drawn downward from its parent, so children circles are drawn leftward, rightward, and downward. 

The children circles are never drawn in the opposite direction of the parent. This is to stop messy overlap of circles in the center of the fractal.

Once these circles are drawn, they are all transformed in a circular fashion relative to their parent circle. 

The first or center circle is stationary, as a circle rotated about its center does not move.

Its children follow the center circles' curve and orbit it.

The children of those children are rotationally transformed twice, as they are moved relative to their parent which was moved relative to the center circle.

This is done recursively, and each subsequent circle moves more and more. This is what causes the chaotic look of the fractal.

Since sin(x) and cos(x) are used for the rotational transformations, the fractal eventually converges and creates a square-ish shape before moving back into random chaos (or at least what appears to be random chaos but mathematically isnt) 
