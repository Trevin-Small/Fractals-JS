var Fractals = (function newFractals() {
    'use strict';
    var raf_ID = 0;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var FILL_PREFIX = 'hsl(';
    var LIGHTING = ', ' + (Math.random() * 15 + 45) + '%, ' + (Math.random() * 15 + 45) + '%)';
    var FPS = 45;
    var RPS = 0.2;
    var TRANSLATION_THETA  = ((2 * Math.PI) * RPS) / FPS;
    var MIN_OFFSET_VAL = 0.000001;
    var MIN_RADIUS = 25;
    var RADIUS_COEFFICIENT = 0.65;
    var prevColor = 0; //(360 * Math.random());
    var currentTheta = 0;

    var direction = {
        "initial": 0,
        "up": 1,
        "right": 2,
        "down": 3,
        "left": 4
    };

    function init(parent) {
        resize();
        parent.appendChild(canvas);
        
        window.onresize = function() {
            stopRender();
            resize();
            startRender();
        }

        startRender();

    }

    function staticRender() { // Use if you want a static (unchanging) fractal
        ctx.clearRect(0, 0, width, height);
        renderFractals();
    }

    function render() { // Recrusive Animation loop 
        setTimeout(function() {
            raf_ID = window.requestAnimationFrame(render);
            ctx.fillStyle = "rgba(25,25,25)";
            ctx.fillRect(0, 0, width, height);
            renderFractals();
            if (currentTheta + TRANSLATION_THETA < Math.PI * 2) {
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
        ctx.globalAlpha = 0.60;
        ctx.strokeStyle = 'rgb(255,255,255)';
        var smallerDimension = width < height ? width : height;
        var initialRadius = smallerDimension / 6;
        prevColor = drawFractal(width / 2, height / 2, 0, 0, initialRadius, direction["initial"], prevColor);
    }

    function drawFractal(oldX, oldY, parentX, parentY, radius, drawnInDirection, prevColor) {

        var currentX;
        var currentY;

        if (radius > MIN_RADIUS) {

            if (drawnInDirection != 0) {
                var newPos = circularTranslation(oldX, oldY, parentX, parentY, drawnInDirection);
                currentX = newPos[0];
                currentY = newPos[1];
            } else {
                currentX = oldX;
                currentY = oldY;
            }

            // Uncomment to make static --> Used for making sure you arent going crazy 
            /*
            currentX = oldX;
            currentY = oldY;
            */

            if (currentX > 0 && currentX < width && currentY > 0 && currentY < height) {
                /*
                prevColor += (Math.random() * 5);
                if (prevColor >= 355) {
                    prevColor = 0;
                }
                */
                ctx.fillStyle = FILL_PREFIX + prevColor + LIGHTING;
                ctx.beginPath();
                ctx.arc(currentX, currentY, radius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
                //ctx.fill();

                switch(drawnInDirection) {
                    case 0: // First fractal
                        drawFractal(currentX + radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(currentX - radius, currentY, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(currentX, currentY + radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        drawFractal(currentX, currentY - radius, oldX, oldY, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break;
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
                    default:
                        break;
                }
            }
        }
        //return prevColor;
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
        console.log(newAngle);
        }
        var newX = (Math.cos(newAngle) * radialDistance + parentX);
        var newY = (Math.sin(newAngle) * radialDistance + parentY);
        return [newX, newY];
    }

    return {
        init: init,
        startRender: startRender, 
        stopRender: stopRender
    };

})();

window.onload = function() {
    Fractals.init(document.body);
}