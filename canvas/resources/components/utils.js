export const radian = Math.PI / 180;

export function resizeCanvas(ctx, displayData) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Set scale to fit the game area within the canvas while maintaining aspect ratio
    displayData.scale = Math.min(ctx.canvas.width / displayData.gameWidth, ctx.canvas.height / displayData.gameHeight);
    ctx.scale(displayData.scale, displayData.scale);

    // Center the game area within the canvas
    displayData.offsetX = Math.floor((ctx.canvas.width / displayData.scale - displayData.gameWidth) / 2);
    displayData.offsetY = Math.floor((ctx.canvas.height / displayData.scale - displayData.gameHeight) / 2);
    ctx.translate(displayData.offsetX, displayData.offsetY);

    // Update screen bounds coordinates
    displayData.screenStartX = -displayData.offsetX;
    displayData.screenStartY = -displayData.offsetY;
    displayData.screenEndX = displayData.offsetX * 2 + displayData.gameWidth;
    displayData.screenEndY = displayData.offsetY * 2 + displayData.gameHeight;
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
    ctx.clearRect(
        displayData.screenStartX, 
        displayData.screenStartY, 
        displayData.gameWidth + displayData.offsetX * 2, // width of clerar area
        displayData.gameHeight + displayData.offsetY * 2 // height of clear area
    );
}

export function updateFrameData(timestamp, frameData){
    frameData.deltaTime = timestamp - frameData.lastTime;
    frameData.lastTime = timestamp;
    frameData.fps.accum += Math.floor(1000 / frameData.deltaTime);
    frameData.fps.frames++;

    if(frameData.fps.frames >= 60){
        frameData.fps.avg = Math.floor(frameData.fps.accum / frameData.fps.frames);
        frameData.fps.accum = 0;
        frameData.fps.frames = 0;
    }
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
    let endX = Math.max(displayData.offsetX + displayData.gameWidth, displayData.gameWidth);
    let startY = -(displayData.offsetY - displayData.offsetY % minor);
    let endY = Math.max(displayData.offsetY + displayData.gameHeight, displayData.gameHeight);
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
    ctx.moveTo(0, displayData.gameHeight/2);
    ctx.lineTo(-displayData.offsetX + 10, displayData.gameHeight/2);
    ctx.lineTo(-displayData.offsetX + 10, (displayData.gameHeight/2) - 5);
    ctx.lineTo(-displayData.offsetX, (displayData.gameHeight/2));
    ctx.lineTo(-displayData.offsetX + 10, (displayData.gameHeight/2) + 5);
    ctx.lineTo(-displayData.offsetX + 10, displayData.gameHeight/2);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to right edge
    ctx.beginPath();
    ctx.moveTo(displayData.gameWidth, displayData.gameHeight/2);
    ctx.lineTo(displayData.gameWidth - 10 + displayData.offsetX, displayData.gameHeight/2);
    ctx.lineTo(displayData.gameWidth - 10 + displayData.offsetX, (displayData.gameHeight/2) - 5);
    ctx.lineTo(displayData.gameWidth + displayData.offsetX, (displayData.gameHeight/2));
    ctx.lineTo(displayData.gameWidth - 10 + displayData.offsetX, (displayData.gameHeight/2) + 5);
    ctx.lineTo(displayData.gameWidth - 10 + displayData.offsetX, displayData.gameHeight/2);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to top edge
    ctx.beginPath();
    ctx.moveTo(displayData.gameWidth/2, 0);
    ctx.lineTo(displayData.gameWidth/2, -displayData.offsetY + 10);
    ctx.lineTo((displayData.gameWidth/2) - 5, -displayData.offsetY + 10);
    ctx.lineTo((displayData.gameWidth/2), -displayData.offsetY);
    ctx.lineTo((displayData.gameWidth/2) + 5, -displayData.offsetY + 10);
    ctx.lineTo(displayData.gameWidth/2, -displayData.offsetY + 10);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to bottom edge
    ctx.beginPath();
    ctx.moveTo(displayData.gameWidth/2, displayData.gameHeight);
    ctx.lineTo(displayData.gameWidth/2, displayData.gameHeight + displayData.offsetY - 10);
    ctx.lineTo((displayData.gameWidth/2) - 5, displayData.gameHeight + displayData.offsetY - 10);
    ctx.lineTo((displayData.gameWidth/2), displayData.gameHeight + displayData.offsetY);
    ctx.lineTo((displayData.gameWidth/2) + 5, displayData.gameHeight + displayData.offsetY - 10);
    ctx.lineTo(displayData.gameWidth/2, displayData.gameHeight + displayData.offsetY - 10);
    ctx.stroke();
    ctx.fill();

    // Draw a red border around the game area
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.fillStyle = "red";
    ctx.strokeRect(20,20, displayData.gameWidth - 40,displayData.gameHeight - 40);
    

    ctx.restore(); //Load the saved state of the canvas from before we did something to it.
}

export function drawFPS(ctx, fps){
    ctx.save();
        
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("FPS: " + fps, 30, 48);
    
    ctx.restore();
}