import * as mouseUtils from './mouseUtils.js';

/**
 * Sets up all event listeners for the game.
 * @param {Game} game 
 */
export default function addEventListeners(game) {
    // Handle window resizing
    window.addEventListener('resize', () =>{
        utils.resizeCanvas(game.ctx, game.displayState);
    });

    // Handle mouse clicks and transfer event to game engine
    game.canvas.addEventListener('click', (event) => {
        const mousePos = mouseUtils.getMousePos(event, game.displayState, game.canvas);
        game.state.userInputs.push({
            type: 'click',
            x: mousePos.x,
            y: mousePos.y
        });
    });
}