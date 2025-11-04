import { GAME_MODE } from '../classes/Game.js';
import GameObject from '../classes/GameObject.js';
import * as gameBoard from '../gameBoard.js';
import * as uiMenu from '../ui/uiMenu.js';

export function handleUserInputMenu(game, input){
    game.gameObjects[GAME_MODE.MENU].forEach(gameObject => {
        
        // Check click on start button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'start_button'){
                    game.mode = GAME_MODE.GAMEPLAY;
                    gameBoard.create(game);
                }
                if(gameObject.config.name === 'size_button'){
                    game.state.boardSize = gameObject.config.boardSize;
                    game.updateConfig();

                    // remove existing shape size indicator
                    game.gameObjects[GAME_MODE.MENU].forEach(obj => {
                        if (obj.config.variant == GameObject.VARIANT.BUTTON && obj.config.name === 'size_button') {
                            obj.removeShape('selected_indicator');
                        }
                    });

                    // add shape size indicator
                    gameObject.addShape(uiMenu.getSelectedIndicator());
                }
                if(gameObject.config.name === 'win_length_button'){
                    game.state.winLength = gameObject.config.winLength;
                    game.updateConfig();

                    // remove existing shape win length indicator
                    game.gameObjects[GAME_MODE.MENU].forEach(obj => {
                        if (obj.config.variant == GameObject.VARIANT.BUTTON && obj.config.name === 'win_length_button') {
                            obj.removeShape('selected_indicator');
                        }
                    });

                    // add shape win length indicator
                    gameObject.addShape(uiMenu.getSelectedIndicator());
                }
            }
        }
    });
}