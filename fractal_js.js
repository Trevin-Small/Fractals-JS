function newFractals() {
    'use strict';
    var raf_ID = 0;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var FILL_PREFIX = 'hsl(';
    var LIGHTING = ', ' + (Math.random() * 15 + 45) + '%, ' + (Math.random() * 15 + 45) + '%)';
    var FPS = 45;
    var IS_STATIC = true;
    var SIN_SIXTY = Math.sqrt(3) / 2;
    var TAN_THIRTY = 1 / Math.sqrt(3);
    var SQRT_TWO = Math.sqrt(2);
    var initialRadiusRatio;
    var prevColor;
    var fractalShape;
    var currentTheta = Math.PI;

    var STROKE_COLOR = 'rgb(255,255,255)';
    var FRACTAL_OPACITY;
    var BACKGROUND_OPACITY;
    var HAS_FILL;
    var HAS_INTERIOR_CHILDREN;
    var ROTATION_DIRECTION;
    var RPS;
    var TRANSLATION_THETA;
    var MIN_RADIUS;
    var RADIUS_COEFFICIENT;


    var shapes = {
        0 : "circle",
        1 : "square",
        2 : "triangle"
    };

    var direction = {
        "initial": 0,
        "up": 1,
        "right": 2,
        "down": 3,
        "left": 4
    };

    function init(parent) {
        randomize();
        resize();
        parent.appendChild(canvas);
        startRender();
        
        window.onresize = function() {
            resize();
        }

        document.addEventListener('keyup', function(evt) {
            if (evt.code === 'Space'){
                if (IS_STATIC) {
                    IS_STATIC = false;
                } else {
                    randomize();
                    IS_STATIC = true;
                    currentTheta = Math.PI;
                }
            }
        });

        canvas.addEventListener('click', function(evt) {
            randomize();
        }, false);
    }

    function randomize() {
        var smallerThan = Math.random() * 0.2 + 0.1;
        var largerThan = Math.random() * 0.25 + 1;
        var initialSize = Math.random() < 0.75 ? smallerThan : largerThan
        initialRadiusRatio = initialSize;
        //STROKE_COLOR = Math.random() < 0.5 ? 'rgb(255,255,255)' : 'rgb(0,0,0)';
        prevColor = (360 * Math.random());
        FRACTAL_OPACITY = Math.random() * 0.5 + 0.35;
        BACKGROUND_OPACITY = 1;
        HAS_FILL = Math.random() < 0.5 ? false : true;
        HAS_INTERIOR_CHILDREN = Math.random() < 0.5 ? true : false;
        ROTATION_DIRECTION = Math.random() < 0.5 ? -1 : 1;
        RPS = ((Math.random() * 0.06) + 0.015) * ROTATION_DIRECTION;
        TRANSLATION_THETA  = ((2 * Math.PI) * RPS) / FPS;
        MIN_RADIUS = (Math.random() * 10) + 7;
        RADIUS_COEFFICIENT = (Math.random() * 0.15) + 0.4;
        fractalShape = Math.round(Math.random() * 1);
    }

    function render() { // Recrusive Animation loop 
        setTimeout(function() {
            raf_ID = window.requestAnimationFrame(render);
            ctx.globalAlpha = BACKGROUND_OPACITY;
            ctx.fillStyle = "rgba(25,25,25)";
            ctx.fillRect(0, 0, width, height);
            renderFractals();
            if (Math.abs(currentTheta + TRANSLATION_THETA) < Math.PI * 2) {
                currentTheta += TRANSLATION_THETA;
            } else {
                currentTheta = 0;
            }
        }, 1000/FPS);
    }

    function startRender() {
        render();
    }

    function stopRender() {
        window.cancelAnimationFrame(raf_ID);
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function renderFractals() {
        ctx.lineWidth = 3;
        ctx.globalAlpha = FRACTAL_OPACITY;
        ctx.strokeStyle = STROKE_COLOR;
        var smallerDimension = width < height ? width : height;
        var initialRadius = smallerDimension * initialRadiusRatio;
        prevColor = drawFractal(width / 2, height / 2, 0, 0, initialRadius, direction["initial"], prevColor);
    }

    function drawFractal(oldX, oldY, parentX, parentY, radius, drawnInDirection, prevColor) {

        var currentX;
        var currentY;

        if (radius > MIN_RADIUS) {

            if (drawnInDirection != 0 && !IS_STATIC) {
                var newPos = circularTranslation(oldX, oldY, parentX, parentY, drawnInDirection);
                currentX = newPos[0];
                currentY = newPos[1];
            } else {
                currentX = oldX;
                currentY = oldY;
            }

            if (currentX > -radius && currentX < width + radius && currentY > -radius && currentY < height + radius) {
                
                if (HAS_FILL) {
                    prevColor += (Math.random() * 2) + 1;
                    if (prevColor == 360) {
                        prevColor = 0;
                    }
                    ctx.fillStyle = FILL_PREFIX + prevColor + LIGHTING;
                }
                
                if (shapes[fractalShape] == "circle") {
                    drawCircle(currentX, currentY, radius);
                } else if (shapes[fractalShape] == "square") {
                    drawSquare(currentX, currentY, radius);
                } else if (shapes[fractalShape] == "triangle") { 
                    drawTriangle(currentX, currentY, radius);
                }

                if (HAS_FILL) {
                    ctx.fill();
                }
            }

            if (HAS_INTERIOR_CHILDREN) {
                drawFractal(currentX + radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                drawFractal(currentX - radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                drawFractal(currentX, currentY + radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                drawFractal(currentX, currentY - radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
            } else {
                switch(drawnInDirection) {
                    case 1: // Drawn upwards
                        drawFractal(currentX + radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(currentX - radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(currentX, currentY - radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break;
                    case 2: // Drawn rightwards
                        drawFractal(currentX + radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(currentX, currentY + radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        drawFractal(currentX, currentY - radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break;
                    case 3: // Drawn downwards
                        drawFractal(currentX + radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(currentX - radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(currentX, currentY + radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        break;
                    case 4: // Drawn leftwards
                        drawFractal(currentX - radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(currentX, currentY + radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        drawFractal(currentX, currentY - radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break;
                    default: // First fractal OR Fractals w/interior children
                        drawFractal(currentX + radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(currentX - radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(currentX, currentY + radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        drawFractal(currentX, currentY - radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break; 
                }
            }
        }
        if (HAS_FILL) {
            return prevColor;
        } else {
            return 0;
        }
    }

    function circularTranslation(xPos, yPos, parentX, parentY, drawnInDirection) {
        var offsetX = Math.abs(parentX - xPos);
        var offsetY = Math.abs(parentY - yPos);
        var radialDistance = Math.sqrt(Math.pow(offsetX,2) + Math.pow(offsetY, 2));
        var angleToPoint;
        switch (drawnInDirection) {
            case 1:
                angleToPoint = Math.PI * 0.5;
                break;
            case 2:
                angleToPoint = Math.PI;
                break;
            case 3:
                angleToPoint = Math.PI * 1.5;
                break;
            case 4:
                angleToPoint = Math.PI * 2;
                break;
        }
        var newAngle = angleToPoint + currentTheta;
        if (parentX - (width / 2) < 10){
        }
        var newX = (Math.cos(newAngle) * radialDistance + parentX);
        var newY = (Math.sin(newAngle) * radialDistance + parentY);
        return [newX, newY];
    }

    function drawCircle(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }

    function drawSquare(x, y, halfWidth) {
        ctx.moveTo(x - halfWidth, y - halfWidth);
        ctx.beginPath();
        ctx.lineTo(x + halfWidth, y - halfWidth);
        ctx.lineTo(x + halfWidth, y + halfWidth);
        ctx.lineTo(x - halfWidth, y + halfWidth);
        ctx.lineTo(x - halfWidth, y - halfWidth);
        ctx.closePath();
        ctx.stroke();
    }

    function drawTriangle(x, y, halfHeight) {
        var sideLength = (halfHeight * 2) / SIN_SIXTY;
        var pointOne = [x, y - halfHeight];
        var pointTwo = [x + sideLength / 2, y + (2 * halfHeight)];
        var pointThree = [pointTwo[0] - sideLength, pointTwo[1]];
        ctx.beginPath();
        ctx.lineTo(pointOne[0], pointOne[1]);
        ctx.lineTo(pointTwo[0], pointTwo[1]);
        ctx.lineTo(pointThree[0], pointThree[1]);
        ctx.closePath();
        ctx.stroke();
    }

    return {
        init: init,
        startRender: startRender, 
        stopRender: stopRender
    };

}

window.onload = function() {
    newFractals().init(document.body);
}
