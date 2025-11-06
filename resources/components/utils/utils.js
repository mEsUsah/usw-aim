export const radian = Math.PI / 180;

/**
 * Resize the canvas to fit the window while maintaining aspect ratio and updates displayData with scale and offsets.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Object} displayData - The display data containing game dimensions and offsets.
 */
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

/**
 * Fix the DPI of the canvas for crisp rendering on high-DPI displays.
 * @param {HTMLCanvasElement} canvas 
 */
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

/**
 * Clear all graphics on the entire canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Object} displayData - The display data containing screen bounds and offsets.
 */
export function clearCanvas(ctx, displayData){
    ctx.clearRect(
        displayData.screenStartX, 
        displayData.screenStartY, 
        displayData.gameWidth + displayData.offsetX * 2, // width of clerar area
        displayData.gameHeight + displayData.offsetY * 2 // height of clear area
    );
}

/**
 * Update frame data including delta time since last frame and FPS.
 * @param {number} timestamp - The current timestamp.
 * @param {Object} frameData - The frame data object to be updated.
 */
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

