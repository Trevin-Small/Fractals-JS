var Fractals = (function newFractals() {
    'use strict';
    var raf_ID = 0;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var FILL_PREFIX = 'hsl(';
    var LIGHTING = ', ' + (Math.random() * 15 + 45) + '%, ' + (Math.random() * 15 + 45) + '%)';
    var FPS = 30;
    var MIN_RADIUS = 20;
    var RADIUS_COEFFICIENT = 0.65;
    var prevColor = (360 * Math.random());

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
        var smallerDimension = width < height ? width : height;
        var initialRadius = smallerDimension / 6;
        prevColor = drawFractal(width / 2, height / 2, initialRadius, direction["initial"], prevColor);
    }

    function drawFractal(x, y, radius, drawnInDirection, prevColor) {
        if (radius > MIN_RADIUS) {
            if (x > 0 && x < width && y > 0 && y < height) {
                prevColor += (Math.random() * 5);
                if (prevColor >= 355) {
                    prevColor = 0;
                }
                ctx.fillStyle = FILL_PREFIX + prevColor + LIGHTING;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();

                switch(drawnInDirection) {
                    case 0: // First fractal
                        drawFractal(x + radius, y, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(x - radius, y, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(x, y + radius, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        drawFractal(x, y - radius, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break;
                    case 1: // Drawn upwards
                        drawFractal(x + radius, y, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(x - radius, y, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(x, y - radius, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break;
                    case 2: // Drawn rightwards
                        drawFractal(x + radius, y, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(x, y + radius, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        drawFractal(x, y - radius, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break;
                    case 3: // Drawn downwards
                        drawFractal(x + radius, y, radius * RADIUS_COEFFICIENT, direction["right"], prevColor);
                        drawFractal(x - radius, y, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(x, y + radius, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        break;
                    default: // Drawn leftwards
                        drawFractal(x - radius, y, radius * RADIUS_COEFFICIENT, direction["left"], prevColor);
                        drawFractal(x, y + radius, radius * RADIUS_COEFFICIENT, direction["down"], prevColor);
                        drawFractal(x, y - radius, radius * RADIUS_COEFFICIENT, direction["up"], prevColor);
                        break;
                }
            }
        }
        return prevColor;
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