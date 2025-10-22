export function getMousePos(evt, displayData, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = (evt.clientX - rect.left) / displayData.scale - displayData.offsetX;
    const y = (evt.clientY - rect.top) / displayData.scale - displayData.offsetY;
    return {
        x: x,
        y: y
    };
}