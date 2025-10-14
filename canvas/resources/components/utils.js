export const radian = Math.PI / 180;

export function resizeCanvas(ctx, displayData) {
    displayData.scale = Math.min(window.innerWidth / displayData.width, window.innerHeight / displayData.height);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.scale(displayData.scale, displayData.scale);

    displayData.offsetX = Math.floor((window.innerWidth / displayData.scale - displayData.width) / 2);
    displayData.offsetY = Math.floor((window.innerHeight / displayData.scale - displayData.height) / 2);

    ctx.translate(displayData.offsetX, displayData.offsetY);
}

export function fix_dpi(canvas) {
    let dpi = window.devicePixelRatio;
    // Create a style object that returns width and height
    // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
    let style = {
        height() {
            return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
        },
        width() {
            return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
        }
    }
    // Set the correct attributes for a crystal clear image!
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
}

export function clearCanvas(ctx){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawGrid(ctx, minor, major, stroke, fill){
    minor = minor || 10;
    major = major || minor*5;
    stroke = stroke || "#00FF00";
    fill = fill || "#009900";
    ctx.save(); // save the current state of the context before doing something to it.
    
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.font = "16px Arial";

    for(let x = 0; x < ctx.canvas.width; x += minor){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        if(x % major == 0) {
            ctx.lineWidth = 0.5;
            ctx.fillText(x,x,13);
        } else {
            ctx.lineWidth = 0.25;
        }
        ctx.stroke();
    }

    for(let y = 0; y < ctx.canvas.height; y += minor){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        if(y % major == 0){
            ctx.lineWidth = 0.5;
            ctx.fillText(y,0,y+13);
        } else {
            ctx.lineWidth = 0.25;
        }
        ctx.stroke();
    }

    ctx.restore(); //Load the saved state of the canvas from before we did something to it.
}

export function drawFPS(ctx, fps){
    ctx.save();
        
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("FPS: " + fps, 30, 54);
    
    ctx.restore();
}