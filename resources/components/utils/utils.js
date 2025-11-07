export const radian = Math.PI / 180;

/**
 * Resize the canvas to fit the window while maintaining aspect ratio and updates displayState with scale and offsets.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Object} displayState - The display data containing game dimensions and offsets.
 */
export function resizeCanvas(ctx, displayState) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Set scale to fit the game area within the canvas while maintaining aspect ratio
    displayState.scale = Math.min(ctx.canvas.width / displayState.gameWidth, ctx.canvas.height / displayState.gameHeight);
    ctx.scale(displayState.scale, displayState.scale);

    // Center the game area within the canvas
    displayState.offsetX = Math.floor((ctx.canvas.width / displayState.scale - displayState.gameWidth) / 2);
    displayState.offsetY = Math.floor((ctx.canvas.height / displayState.scale - displayState.gameHeight) / 2);
    ctx.translate(displayState.offsetX, displayState.offsetY);

    // Update screen bounds coordinates
    displayState.screenStartX = -displayState.offsetX;
    displayState.screenStartY = -displayState.offsetY;
    displayState.screenEndX = displayState.offsetX * 2 + displayState.gameWidth;
    displayState.screenEndY = displayState.offsetY * 2 + displayState.gameHeight;
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
 * @param {Object} displayState - The display data containing screen bounds and offsets.
 */
export function clearCanvas(ctx, displayState){
    ctx.clearRect(
        displayState.screenStartX, 
        displayState.screenStartY, 
        displayState.gameWidth + displayState.offsetX * 2, // width of clerar area
        displayState.gameHeight + displayState.offsetY * 2 // height of clear area
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

