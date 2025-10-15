/**
 * Draw a grid on the canvas.
 * Helps to visualize the coordinate system and scaling.
 * @param CanvasRenderingContext2D ctx 
 * @param Object displayData 
 * @param number minor 
 * @param number major 
 * @param string stroke 
 * @param string fill 
 */
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

    ctx.save();
    
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.font = "16px Arial";

    // Draw vertical lines
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