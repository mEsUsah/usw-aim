import { fix_dpi, clearCanvas, resizeCanvas, updateFrameData } from './utils.js';
import * as graphicDebug from './graphicDebug.js' ;
import GameObject from './GameObject.js';
import GameShape from './GameShape.js';
import { getMousePos } from './mouseUtils.js';
import * as uiMenu from './uiMenu.js';
import * as uiGameplay from './uiGameplay.js';
import * as uiPause from './uiPause.js';
import * as gameBoard from './gameBoard.js';    

const SHOW_FPS = false;
const SHOW_GRID = false;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;
const GAME_MODE = {
    GAMEPLAY: 'gameplay',
    MENU: 'menu',
    PAUSED: 'paused'
};

export class Game{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.frameData = {
            lastTime: 0,
            deltaTime: 0,
            fps: {
                accum: 0,
                frames: 0,
                avg: 0
            }
        };
        this.displayData = {
            gameWidth: GAME_WIDTH,
            gameHeight: GAME_HEIGHT,
            scale: 1,
            offsetX: 0,
            offsetY: 0,
            screenStartX: 0,
            screenStartY: 0,
            screenEndX: 0,
            screenEndY: 0
        };

        this.gameMode = GAME_MODE.MENU;
        this.gameObjects = {
            gameplay: [],
            menu: [],
            paused: []
        };
        this.userInputs = [];
        this.playerTurn = 1;
        uiGameplay.updateTurnSymbol(this);
        
        fix_dpi(this.canvas);
        
        window.addEventListener('resize', () =>{
            resizeCanvas(this.ctx, this.displayData);
        });
        
        canvas.addEventListener('click', (event) => {
            const mousePos = getMousePos(event, this.displayData, this.canvas);
            this.userInputs.push({
                type: 'click',
                x: mousePos.x,
                y: mousePos.y
            });
        });
        
        this.boardSize = 4;
        this.gameConfig = this.config();

        uiMenu.create(this);
        uiGameplay.create(this);
        uiPause.create(this);

        this.start();
    };

    config(){
        return {
                boardSize: this.boardSize,
                boardMargin: 60,
                cellWidth: (GAME_WIDTH - 120) / this.boardSize,
                cellHeight: (GAME_HEIGHT - 120) / this.boardSize,
                cellPadding: 20
            };
    };

    start(){
        resizeCanvas(this.ctx, this.displayData);
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }; 

    gameLoop(timestamp) {
        // Update game state
        updateFrameData(timestamp, this.frameData);
        this.handleUserInputs();

        // Update animations
        this.gameObjects[this.gameMode].forEach(gameObject => {
            gameObject.update(this.frameData.deltaTime);
        });

        // Render the game state
        clearCanvas(this.ctx, this.displayData);
        if(SHOW_GRID) graphicDebug.drawGrid(this.ctx, this.displayData);
        if(SHOW_FPS) graphicDebug.drawFPS(this.ctx, this.frameData.fps.avg);

        // Draw game objects
        this.gameObjects[this.gameMode].forEach(gameObject => {
            gameObject.draw(this.ctx);
        });

        // Request the next frame
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    };


    handleUserInputs() {
        this.userInputs.forEach(input => {
            if(input.type == 'click') { 
                switch(this.gameMode) {
                    case GAME_MODE.GAMEPLAY:
                        this.gameObjects[GAME_MODE.GAMEPLAY].forEach(gameObject => {
                            // Check clock on board cells
                            if (gameObject.config.variant == GameObject.VARIANT.BOARD) {
                                if (gameObject.checkCollision(input.x, input.y) && gameObject.state.occupiedBy == null) {
                                    gameObject.state.occupiedBy = this.playerTurn; 

                                    if(this.playerTurn === 1){
                                        gameObject.addShape(new GameShape('line', {
                                            x: this.gameConfig.cellPadding - this.gameConfig.cellWidth/2,
                                            y: this.gameConfig.cellPadding - this.gameConfig.cellHeight/2,
                                            x2: this.gameConfig.cellWidth/2 - this.gameConfig.cellPadding,
                                            y2: this.gameConfig.cellHeight/2 - this.gameConfig.cellPadding,
                                            color: "rgba(40, 151, 255, 1)",
                                            lineWidth: 4,
                                        }));
                                        gameObject.addShape(new GameShape('line', {
                                            x: this.gameConfig.cellPadding - this.gameConfig.cellWidth/2,
                                            y: this.gameConfig.cellHeight/2 - this.gameConfig.cellPadding,
                                            x2: this.gameConfig.cellWidth/2 - this.gameConfig.cellPadding,
                                            y2: -this.gameConfig.cellHeight/2 + this.gameConfig.cellPadding,
                                            color: "rgba(40, 151, 255, 1)",
                                            lineWidth: 4,
                                        }));
                                        this.playerTurn = 2;
                                    } else {
                                        gameObject.addShape(new GameShape('circle', {
                                            x: 0,
                                            y: 0,
                                            radius: (this.gameConfig.cellWidth/2) - this.gameConfig.cellPadding,
                                            color: "rgba(248, 66, 66, 1)",
                                            lineWidth: 4,
                                        }));
                                        this.playerTurn = 1;
                                    }
                                    uiGameplay.updateTurnSymbol(this);
                                }
                            }

                            // Check click on menu button
                            if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
                                if (gameObject.checkCollision(input.x, input.y)) {
                                    if(gameObject.config.name === 'menu_button'){
                                        this.gameMode = GAME_MODE.PAUSED;
                                    }
                                }
                            }
                            
                        });
                        break;

                    case GAME_MODE.PAUSED:
                        this.gameObjects[GAME_MODE.PAUSED].forEach(gameObject => {
                            // Check click on continue button
                            if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
                                if (gameObject.checkCollision(input.x, input.y)) {
                                    if(gameObject.config.name === 'continue_button'){
                                        this.gameMode = GAME_MODE.GAMEPLAY;
                                    }
                                }
                            }
                            // Check click on stop button
                            if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
                                if (gameObject.checkCollision(input.x, input.y)) {
                                    if(gameObject.config.name === 'stop_button'){
                                        this.gameMode = GAME_MODE.MENU;
                                    }
                                }
                            }
                        });
                        break;

                    case GAME_MODE.MENU:
                        this.gameObjects[GAME_MODE.MENU].forEach(gameObject => {
                            // Check click on start button
                            if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
                                if (gameObject.checkCollision(input.x, input.y)) {
                                    if(gameObject.config.name === 'start_button'){
                                        this.gameMode = GAME_MODE.GAMEPLAY;
                                        gameBoard.create(this);
                                    }
                                }
                            }
                        });
                        break;
                    
                    default:
                        break;
                }
            }
        });
        this.userInputs = [];
    };
}
