import GameObject from "../classes/GameObject.js";
import * as pauseShapes from "../shapes/pauseShapes.js";
import * as commonShapes from "../shapes/commonShapes.js";

/**
 * Creates and adds pause UI elements to the game.
 * @param {Game} game - The game instance.
 */
export function create(game){
    const continueButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth - 30,
        y: 30,
        name: 'continue_button',
        outline: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    });
    commonShapes.addPlayButton(continueButton);
    game.state.gameObjects.paused.push(continueButton);

    const stopButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth - 80,
        y: 30,
        name: 'stop_button',
        outline: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    });
    commonShapes.addStopButton(stopButton);
    game.state.gameObjects.paused.push(stopButton);

    const pauseText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: game.displayData.gameWidth / 2,
        y: game.displayData.gameHeight / 2,
        name: 'pause_text',
    });
    pauseShapes.addPauseText(pauseText);
    game.state.gameObjects.paused.push(pauseText);
}