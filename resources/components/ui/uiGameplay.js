import GameObject from "../classes/GameObject.js";
import * as gameplayShapes from '../shapes/gameplayShapes.js';
import * as commonShapes from "../shapes/commonShapes.js";

/**
 * Creates and adds gameplay UI elements to the game.
 * @param {Game} game - The game instance.
 */
export function create(game){
    // Menu button
    const menuButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth - 30,
        y: 30,
        name: 'pause_button',
        outline: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    });
    commonShapes.addPauseButton(menuButton);
    game.state.gameObjects.gameplay.push(menuButton);

    // Player turn indicator
    const turnIndicator = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 30,
        y: 37.5,
        name: 'turn_indicator',
    });
    gameplayShapes.addTurnIndicator(turnIndicator);
    game.state.gameObjects.gameplay.push(turnIndicator);
}

/**
 * Updates the turn symbol in the gameplay UI to reflect the current player.
 * @param {Game} game - The game instance.
 */
export function updateTurnSymbol(game){
    // Remove existing turn symbol
    game.state.gameObjects.gameplay = game.state.gameObjects.gameplay.filter(obj => obj.config.name !== 'turn_symbol');

    // Add new turn symbol
    const turnSymbol = new GameObject({
        variant: GameObject.VARIANT.ILLUSTRATION,
        x: 165,
        y: 30,
        name: 'turn_symbol',
    });

    if(game.state.currentPlayer == 1){
        gameplayShapes.addTurnSymbolCross(turnSymbol);
    } else {
        gameplayShapes.addTurnSymbolCircle(turnSymbol);
    }
    game.state.gameObjects.gameplay.push(turnSymbol);
}