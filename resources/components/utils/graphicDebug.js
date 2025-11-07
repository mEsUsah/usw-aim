/**
 * Draw a grid on the canvas.
 * Helps to visualize the coordinate system and scaling.
 * @param CanvasRenderingContext2D ctx 
 * @param Object displayState 
 * @param number minor 
 * @param number major 
 * @param string stroke 
 * @param string fill 
 */
export function drawGrid(ctx, displayState, minor, major, stroke, fill){
    displayState = displayState || {
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

    ctx.save();
    
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.font = "16px Arial";

    // Draw vertical lines
    let startX = -(displayState.offsetX - displayState.offsetX % minor);
    let endX = Math.max(displayState.offsetX + displayState.gameWidth, displayState.gameWidth);
    let startY = -(displayState.offsetY - displayState.offsetY % minor);
    let endY = Math.max(displayState.offsetY + displayState.gameHeight, displayState.gameHeight);
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

    // Draw horizontal lines
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
    ctx.moveTo(0, displayState.gameHeight/2);
    ctx.lineTo(-displayState.offsetX + 10, displayState.gameHeight/2);
    ctx.lineTo(-displayState.offsetX + 10, (displayState.gameHeight/2) - 5);
    ctx.lineTo(-displayState.offsetX, (displayState.gameHeight/2));
    ctx.lineTo(-displayState.offsetX + 10, (displayState.gameHeight/2) + 5);
    ctx.lineTo(-displayState.offsetX + 10, displayState.gameHeight/2);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to right edge
    ctx.beginPath();
    ctx.moveTo(displayState.gameWidth, displayState.gameHeight/2);
    ctx.lineTo(displayState.gameWidth - 10 + displayState.offsetX, displayState.gameHeight/2);
    ctx.lineTo(displayState.gameWidth - 10 + displayState.offsetX, (displayState.gameHeight/2) - 5);
    ctx.lineTo(displayState.gameWidth + displayState.offsetX, (displayState.gameHeight/2));
    ctx.lineTo(displayState.gameWidth - 10 + displayState.offsetX, (displayState.gameHeight/2) + 5);
    ctx.lineTo(displayState.gameWidth - 10 + displayState.offsetX, displayState.gameHeight/2);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to top edge
    ctx.beginPath();
    ctx.moveTo(displayState.gameWidth/2, 0);
    ctx.lineTo(displayState.gameWidth/2, -displayState.offsetY + 10);
    ctx.lineTo((displayState.gameWidth/2) - 5, -displayState.offsetY + 10);
    ctx.lineTo((displayState.gameWidth/2), -displayState.offsetY);
    ctx.lineTo((displayState.gameWidth/2) + 5, -displayState.offsetY + 10);
    ctx.lineTo(displayState.gameWidth/2, -displayState.offsetY + 10);
    ctx.stroke();
    ctx.fill();

    // Draw arrow from viewport to bottom edge
    ctx.beginPath();
    ctx.moveTo(displayState.gameWidth/2, displayState.gameHeight);
    ctx.lineTo(displayState.gameWidth/2, displayState.gameHeight + displayState.offsetY - 10);
    ctx.lineTo((displayState.gameWidth/2) - 5, displayState.gameHeight + displayState.offsetY - 10);
    ctx.lineTo((displayState.gameWidth/2), displayState.gameHeight + displayState.offsetY);
    ctx.lineTo((displayState.gameWidth/2) + 5, displayState.gameHeight + displayState.offsetY - 10);
    ctx.lineTo(displayState.gameWidth/2, displayState.gameHeight + displayState.offsetY - 10);
    ctx.stroke();
    ctx.fill();

    // Draw a red border around the game area
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.fillStyle = "red";
    ctx.strokeRect(20,20, displayState.gameWidth - 40,displayState.gameHeight - 40);
    
    ctx.restore();
}


/** * Draw the current FPS in the upper left corner of the canvas.
 * @param CanvasRenderingContext2D ctx 
 * @param number fps 
 */
export function drawFPS(ctx, fps){
    ctx.save();
        
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("FPS: " + fps, 30, 48);
    
    ctx.restore();
}