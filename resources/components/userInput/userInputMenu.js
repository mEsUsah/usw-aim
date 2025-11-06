import { GAME_MODE } from '../classes/Game.js';
import GameObject from '../classes/GameObject.js';
import * as gameBoard from '../gameBoard.js';
import * as uiMenu from '../ui/uiMenu.js';

export function handleUserInputMenu(game, input){
    game.gameObjects[GAME_MODE.MENU].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'start_button'){
                    game.mode = GAME_MODE.GAMEPLAY;
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

function setSelectedIndicator(game, configValue, buttonName){
    game.gameObjects[GAME_MODE.MENU].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON && gameObject.config.name === buttonName) {

            // Remove all existing indicators to avoid duplicates
            gameObject.removeShape('selected_indicator');
            if(gameObject.config[configValue] === game.state[configValue]){
                gameObject.addShape(uiMenu.getSelectedIndicator());
            }
        }
    });
} 