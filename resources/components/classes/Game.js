import handleUserInputs  from '../userInput/userInput.js';
import handleCpuInput from '../cpuInput/cpuInput.js'; 
import * as uiMenu from '../ui/uiMenu.js';
import * as uiGameplay from '../ui/uiGameplay.js';
import * as uiPause from '../ui/uiPause.js';
import * as graphicDebug from '../utils/graphicDebug.js' ;
import * as statUtils from '../utils/statUtils.js';
import * as utils from '../utils/utils.js';
import addEventListeners from '../utils/addEventListeners.js';

const SHOW_FPS = false;
const SHOW_GRID = false;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;

/**
 * The main Game class containing the game state, rendering context, the game loop.
 * @class Game
 * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
 */
export default class Game{
    static TYPE = {
        NORMAL: 0,
        BLOCKED: 1,
    };
    
    static OPPONENT = {
        HUMAN: 0,
        CPU: 1,
    };

    static VIEW = {
        GAMEPLAY: 'gameplay',
        MENU: 'menu',
        PAUSED: 'paused'
    };
    
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.displayState = {
            gameWidth: GAME_WIDTH,
            gameHeight: GAME_HEIGHT,
            scale: 1,
            offsetX: 0,
            offsetY: 0,
            screenStartX: 0,
            screenStartY: 0,
            screenEndX: 0,
            screenEndY: 0,
            lastTime: 0,
            deltaTime: 0,
            fps: {
                accum: 0,
                frames: 0,
                avg: 0
            }
        };
        addEventListeners(this);
        
        utils.fix_dpi(this.canvas);
        
        // Initialize game state
        this.state = {
            view: Game.VIEW.MENU,
            userInputs: [],
            gameType: Game.TYPE.NORMAL,
            opponentType: Game.OPPONENT.HUMAN,
            boardSize: 3,
            winLength: 3,
            currentPlayer: 1,
            occupiedSpaces: 0,
            gameOver: false,
            gameFields: [],
            gameObjects: {
                gameplay: [],
                menu: [],
                paused: []
            },
            cpuMoveDelay: 500,
            cpuWaitTime: 500,
            stats: statUtils.getData()
        };
        
        // Initialize configuration
        this.config = {};
        this.updateConfig();

        // Setup UI
        uiMenu.create(this);
        uiGameplay.create(this);
        uiGameplay.updateTurnSymbol(this);
        uiPause.create(this);

        // Start the game
        this.start();
    };

    /**
     * Updates the game configuration based on the current state.
     */
    updateConfig(){
        const boardSize = this.state.boardSize;
        this.config = {
            boardSize: boardSize,
            boardMargin: 60,
            cellWidth: (GAME_WIDTH - 120) / boardSize,
            cellHeight: (GAME_HEIGHT - 120) / boardSize,
            cellPadding: 20
        };
    };

    /**
     * Resets the game state to make it ready for a a new game.
     */
    resetState(){
        this.state.occupiedSpaces = 0;
        this.state.gameOver = false;
    };

    /**
     * Starts the game loop.
     */
    start(){
        utils.resizeCanvas(this.ctx, this.displayState);
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }; 

    /**
     * The main game loop that updates and renders each game frame.
     * @param {number} timestamp - The current time stamp.
     */
    gameLoop(timestamp) {
        // Update game state
        utils.updateFrameData(timestamp, this.displayState);
        if(!this.state.gameOver && this.state.currentPlayer == 2 && this.state.opponentType === Game.OPPONENT.CPU){
            handleCpuInput(this);
        } else {
            handleUserInputs(this);
        }

        // Update animation state
        this.state.gameObjects[this.state.view].forEach(gameObject => {
            gameObject.update(this.displayState.deltaTime);
        });

        // Render frame
        utils.clearCanvas(this.ctx, this.displayState);
        if(SHOW_GRID) graphicDebug.drawGrid(this.ctx, this.displayState);
        if(SHOW_FPS) graphicDebug.drawFPS(this.ctx, this.displayState.fps.avg);

        this.state.gameObjects[this.state.view].forEach(gameObject => {
            gameObject.draw(this.ctx);
        });

        // Request the next frame
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    };

}
