/**
 * Get mouse position relative to the game screen, accounting for display scaling and offsets.
 * @param {MouseEvent} event - The mouse event.
 * @param {Object} displayState - The display data containing scale and offsets.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @returns {Object} An object with x and y properties representing the mouse position.
 */
export function getMousePos(event, displayState, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / displayState.scale * displayState.devicePixelRatio - displayState.offsetX;
    const y = (event.clientY - rect.top) / displayState.scale * displayState.devicePixelRatio - displayState.offsetY;
    return {
        x: x,
        y: y
    };
}