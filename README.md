# [JS-Fractals](https://trevin-small.github.io/JS-Fractals/) 
<h2 align="center">AWAIT CONVERGENCE</h2>
<h3 align="center">Space/Click for new fractal!</h3>
</br>
## The mechanics behind JS-Fractals can be broken down into simple rules that are applied recursively. 
#### In this example, we will use the circle, but other shapes (just squares for now!) follow the same rules.

### First, a center or 'parent' circle of random size is drawn. 
![Initial Circle](https://github.com/Trevin-Small/JS-Fractals/blob/main/images/Initial_Circle.png)

### Next, 4 children circles of some fractional size of the parent circle are drawn on the parent circle's curve
![Children Circles](https://github.com/Trevin-Small/JS-Fractals/blob/main/images/Children.png)

### Each of those children circles draws its own children circles.
![Children Circles](https://github.com/Trevin-Small/JS-Fractals/blob/main/images/Second_Children.png)
### The children circles may or may not be drawn in the opposite direction of the previous child. This is a randomized characteristic of each fractal.
#### Notice how the first left child circle is missing its right child circle? Since left is opposite of right, this child was not drawn.
- Ex. Previous child circle was drawn leftward from its parent, so the next children circles are drawn leftward, upward, and downward.   
- Ex. Previous circle was drawn downward from its parent, so the next children circles are drawn leftward, rightward, and downward. 
#### However, this does not always hold true. This depends on the random boolean trait, which in the alternate case would draw children in all 4 directions.  

# Once these circles are drawn, they are all transformed in a circular fashion relative to their parent circle.  

### The first or center circle is stationary, as a circle rotated about its center does not move.
### Its children follow the center circles' curve and orbit it. (Here, the children are rotating clockwise)
![Children Circles](https://github.com/Trevin-Small/JS-Fractals/blob/main/images/First_Rotation.png)

### The children of those children are rotationally transformed twice, as they are moved relative to their parent which was moved relative to the center circle.
![Children Circles](https://github.com/Trevin-Small/JS-Fractals/blob/main/images/Second_Rotation.png)

This is done recursively, and each subsequent circle moves more and more. This is what causes the chaotic look of the fractal.

- Since sin(x) and cos(x) are used for the rotational transformations, the fractal eventually converges and creates a square-ish shape before moving back into random chaos (or at least what appears to be random chaos but mathematically isnt) 
