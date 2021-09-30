# JS-Fractals
 Javascript Fractals!
https://trevin-small.github.io/JS-Fractals/

Pretty cool what some circles, recursion, and triginometry can do!!

The mechanics behind JS-Fractals can be broken down into simple rules that are applied recursively.

### First, a center or 'parent' circle is drawn. 
![Initial Circle](https://github.com/Trevin-Small/JS-Fractals/blob/main/Initial_Circle.png)

### Next, 4 children circles centered on the curve of the parent circle are drawn (upwards, rightwards, downwards, leftwards)
![Children Circles](https://github.com/Trevin-Small/JS-Fractals/blob/main/Children.png)

### Each of those children circles draws its own children circles. The direction that its children are drawn in is based upon the direction the previous child was drawn in.
![Children Circles](https://github.com/Trevin-Small/JS-Fractals/blob/main/Second_Children.png)
### The children circles are never drawn in the opposite direction of the previous child. This is to stop messy overlap of circles in the center of the fractal.  
- Ex. Previous child circle was drawn leftward from its parent, so the next children circles are drawn leftward, upward, and downward.   
- Ex. Previous circle was drawn downward from its parent, so the next children circles are drawn leftward, rightward, and downward.  

# Once these circles are drawn, they are all transformed in a circular fashion relative to their parent circle.  
</br>

### The first or center circle is stationary, as a circle rotated about its center does not move.
</br>

### Its children follow the center circles' curve and orbit it. (Here, the children are rotating clockwise)
![Children Circles](https://github.com/Trevin-Small/JS-Fractals/blob/main/First_Rotation.png)

### The children of those children are rotationally transformed twice, as they are moved relative to their parent which was moved relative to the center circle.
![Children Circles](https://github.com/Trevin-Small/JS-Fractals/blob/main/Second_Rotation.png)

This is done recursively, and each subsequent circle moves more and more. This is what causes the chaotic look of the fractal.

- Since sin(x) and cos(x) are used for the rotational transformations, the fractal eventually converges and creates a square-ish shape before moving back into random chaos (or at least what appears to be random chaos but mathematically isnt) 
