/**
 * Get mouse position relative to the game screen, accounting for display scaling and offsets.
 * @param {MouseEvent} event - The mouse event.
 * @param {Object} displayData - The display data containing scale and offsets.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @returns {Object} An object with x and y properties representing the mouse position.
 */
export function getMousePos(event, displayData, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / displayData.scale - displayData.offsetX;
    const y = (event.clientY - rect.top) / displayData.scale - displayData.offsetY;
    return {
        x: x,
        y: y
    };
}