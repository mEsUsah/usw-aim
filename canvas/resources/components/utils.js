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

export function clearCanvas(ctx, displayData){
    ctx.clearRect(-displayData.offsetX, 
                    -displayData.offsetY, 
                    displayData.width + displayData.offsetX * 2, 
                    displayData.height + displayData.offsetY * 2
                );
}

export function drawGrid(ctx, displayData, minor, major, stroke, fill){
    displayData = displayData || {
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        width: 800,
        height: 800
    };
    minor = minor || 10;
    major = major || minor*5;
    stroke = stroke || "#00FF00";
    fill = fill || "#009900";

    ctx.save(); // save the current state of the context before doing something to it.
    
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.font = "16px Arial";

    
    let startX = -(displayData.offsetX - displayData.offsetX % minor);
    let endX = Math.max(displayData.offsetX + displayData.width, displayData.width);
    let startY = -(displayData.offsetY - displayData.offsetY % minor);
    let endY = Math.max(displayData.offsetY + displayData.height, displayData.height);
    for(let x = startX; x < endX; x += minor){
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        if(x % major == 0) {
            ctx.lineWidth = 0.5;
            ctx.fillText(x,x,13);
        } else {
            ctx.lineWidth = 0.25;
        }
        ctx.stroke();
    }

    
    for(let y = startY; y < endY; y += minor){
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        if(y % major == 0){
            ctx.lineWidth = 0.5;
            ctx.fillText(y,0,y+13);
        } else {
            ctx.lineWidth = 0.25;
        }
        ctx.stroke();
    }

    // Draw arrow from viewport to left edge
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.lineWidth = 2;
    ctx.moveTo(0, displayData.height/2);
    ctx.lineTo(-displayData.offsetX + 10, displayData.height/2);
    ctx.lineTo(-displayData.offsetX + 10, (displayData.height/2) - 5);
    ctx.lineTo(-displayData.offsetX, (displayData.height/2));
    ctx.lineTo(-displayData.offsetX + 10, (displayData.height/2) + 5);
    ctx.lineTo(-displayData.offsetX + 10, displayData.height/2);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to right edge
    ctx.beginPath();
    ctx.moveTo(displayData.width, displayData.height/2);
    ctx.lineTo(displayData.width - 10 + displayData.offsetX, displayData.height/2);
    ctx.lineTo(displayData.width - 10 + displayData.offsetX, (displayData.height/2) - 5);
    ctx.lineTo(displayData.width + displayData.offsetX, (displayData.height/2));
    ctx.lineTo(displayData.width - 10 + displayData.offsetX, (displayData.height/2) + 5);
    ctx.lineTo(displayData.width - 10 + displayData.offsetX, displayData.height/2);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to top edge
    ctx.beginPath();
    ctx.moveTo(displayData.width/2, 0);
    ctx.lineTo(displayData.width/2, -displayData.offsetY + 10);
    ctx.lineTo((displayData.width/2) - 5, -displayData.offsetY + 10);
    ctx.lineTo((displayData.width/2), -displayData.offsetY);
    ctx.lineTo((displayData.width/2) + 5, -displayData.offsetY + 10);
    ctx.lineTo(displayData.width/2, -displayData.offsetY + 10);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to bottom edge
    ctx.beginPath();
    ctx.moveTo(displayData.width/2, displayData.height);
    ctx.lineTo(displayData.width/2, displayData.height + displayData.offsetY - 10);
    ctx.lineTo((displayData.width/2) - 5, displayData.height + displayData.offsetY - 10);
    ctx.lineTo((displayData.width/2), displayData.height + displayData.offsetY);
    ctx.lineTo((displayData.width/2) + 5, displayData.height + displayData.offsetY - 10);
    ctx.lineTo(displayData.width/2, displayData.height + displayData.offsetY - 10);
    ctx.stroke();
    ctx.fill();

    // Draw a red border around the game area
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.fillStyle = "red";
    ctx.strokeRect(20,20, displayData.width - 40,displayData.height - 40);
    

    ctx.restore(); //Load the saved state of the canvas from before we did something to it.
}

export function drawFPS(ctx, fps){
    ctx.save();
        
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("FPS: " + fps, 30, 48);
    
    ctx.restore();
}