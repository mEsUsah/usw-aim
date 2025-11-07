import Game from '../classes/Game.js';
import GameObject from '../classes/GameObject.js';
import * as gameBoard from '../utils/gameBoard.js';
import * as menuShapes from '../shapes/menuShapes.js';

/** * Handles user inputs specific to the menu view.
 * @param {Game} game - The game instance.
 * @param {Object} input - The user input data (click coordinates).
 */
export default function handleUserInputMenu(game, input){
    game.state.gameObjects[Game.VIEW.MENU].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'start_button'){
                    game.state.view = Game.VIEW.GAMEPLAY;
                    game.resetState();
                    gameBoard.create(game);
                }
                if(gameObject.config.name === 'size_button'){
                    if(gameObject.config.boardSize === game.state.boardSize) return;
                    game.state.boardSize = gameObject.config.boardSize;
                    if(game.state.boardSize < game.state.winLength){
                        game.state.winLength = game.state.boardSize;
                        setSelectedIndicator(game, 'winLength', 'win_length_button');
                    }
                    setSelectedIndicator(game, 'boardSize', 'size_button');
                    setDisabledGameLengthOverlay(game);
                    game.updateConfig();
                }
                if(gameObject.config.name === 'win_length_button'){
                    if(gameObject.config.winLength === game.state.winLength) return;
                    if(gameObject.config.winLength > game.state.boardSize) return;
                    game.state.winLength = gameObject.config.winLength;
                    setSelectedIndicator(game, 'winLength', 'win_length_button');
                    game.updateConfig();
                }
                if(gameObject.config.name === 'game_type_button'){
                    game.state.gameType = gameObject.config.gameType;
                    setSelectedIndicator(game, 'gameType', 'game_type_button');
                }
                if(gameObject.config.name === 'player_2_type_button'){
                    game.state.opponentType = gameObject.config.opponentType;
                    setSelectedIndicator(game, 'opponentType', 'player_2_type_button');
                }
            }
        }
    });
}

/** Sets a selected indicator on the appropriate button in the menu.
 * @param {Game} game - The game instance.
 * @param {string} configValue - The configuration value to check (e.g., 'boardSize', 'winLength').
 * @param {string} buttonName - The name of the GameObject to update.
 */
function setSelectedIndicator(game, configValue, buttonName){
    game.state.gameObjects[Game.VIEW.MENU].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON && gameObject.config.name === buttonName) {

            // Remove all existing indicators to avoid duplicates
            gameObject.removeShape('selected_indicator');
            if(gameObject.config[configValue] === game.state[configValue]){
                gameObject.addShape(menuShapes.selectedIndicator());
            }
        }
    });
} 

/**
 * Sets a disabled overlay for the game length buttons with a size greater than the board size.
 * @param {Game} game - The game instance.
 */
function setDisabledGameLengthOverlay(game){
    game.state.gameObjects[Game.VIEW.MENU].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON && gameObject.config.name === 'win_length_button') {

            // Remove all existing overlays to avoid duplicates
            gameObject.removeShape('disabled_overlay');
            if(gameObject.config.winLength > game.state.boardSize){
                gameObject.addShape(menuShapes.disabledOverlay());
            }
        }
    });
}