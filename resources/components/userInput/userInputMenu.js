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
                    gameBoard.create(game);
                    game.resetState();
                }
                if(gameObject.config.name === 'size_button'){
                    if(gameObject.config.boardSize === game.state.boardSize) return;
                    game.state.boardSize = gameObject.config.boardSize;
                    if(game.state.boardSize < game.state.winLength){
                        game.state.winLength = game.state.boardSize;
                        setWinLengthIndicator(game);
                    }
                    setGameSizeIndicator(game);
                    game.updateConfig();
                }
                if(gameObject.config.name === 'win_length_button'){
                    if(gameObject.config.winLength === game.state.winLength) return;
                    if(gameObject.config.winLength > game.state.boardSize) return;
                    game.state.winLength = gameObject.config.winLength;
                    setWinLengthIndicator(game);
                    game.updateConfig();
                }
            }
        }
    });
}

function setWinLengthIndicator(game){
    const winLength = game.state.winLength;
    game.gameObjects[GAME_MODE.MENU].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if(gameObject.config.name === 'win_length_button' && gameObject.config.winLength === winLength){
                gameObject.addShape(uiMenu.getSelectedIndicator());
            } else if(gameObject.config.name === 'win_length_button'){
                gameObject.removeShape('selected_indicator');
            }
        }
    });
}


function setGameSizeIndicator(game){
    const boardSize = game.state.boardSize;
    game.gameObjects[GAME_MODE.MENU].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if(gameObject.config.name === 'size_button' && gameObject.config.boardSize === boardSize){
                gameObject.addShape(uiMenu.getSelectedIndicator());
            } else if(gameObject.config.name === 'size_button'){
                gameObject.removeShape('selected_indicator');
            }
        }
    });
}   