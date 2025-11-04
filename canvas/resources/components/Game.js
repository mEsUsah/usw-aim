import { fix_dpi, clearCanvas, resizeCanvas, updateFrameData } from './utils.js';
import * as graphicDebug from './graphicDebug.js' ;
import { getMousePos } from './mouseUtils.js';
import * as uiMenu from './uiMenu.js';
import * as uiGameplay from './uiGameplay.js';
import * as uiPause from './uiPause.js';

import { handleUserInputs } from './userInput.js';

const SHOW_FPS = false;
const SHOW_GRID = false;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;
export const GAME_MODE = {
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
        this.gameFields = [];
        this.userInputs = [];
        
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
        
        this.state = {
            boardSize: 3,
            currentPlayer: 1
        };
        this.gameConfig = this.config();

        // Setup UI
        uiMenu.create(this);
        uiGameplay.create(this);
        uiPause.create(this);

        // Start the game
        uiGameplay.updateTurnSymbol(this);
        this.start();
    };

    config(){
        const boardSize = this.state.boardSize;
        return {
                boardSize: boardSize,
                boardMargin: 60,
                cellWidth: (GAME_WIDTH - 120) / boardSize,
                cellHeight: (GAME_HEIGHT - 120) / boardSize,
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
        handleUserInputs(this);

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
}
