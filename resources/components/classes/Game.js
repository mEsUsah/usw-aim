import { fix_dpi, clearCanvas, resizeCanvas, updateFrameData } from '../utils/utils.js';
import * as graphicDebug from '../utils/graphicDebug.js' ;
import { getMousePos } from '../utils/mouseUtils.js';
import * as uiMenu from '../ui/uiMenu.js';
import * as uiGameplay from '../ui/uiGameplay.js';
import * as uiPause from '../ui/uiPause.js';
import { handleUserInputs } from '../userInput/userInput.js';
import { handleCpuInput } from '../cpuInput/cpuInput.js'; 
import * as statUtils from '../utils/statUtils.js';

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
    static GAME_TYPE = {
        NORMAL: 0,
        BLOCKED: 1,
    };
    
    static OPPONENT_TYPE = {
        HUMAN: 0,
        CPU: 1,
    };

    static GAME_VIEW = {
        GAMEPLAY: 'gameplay',
        MENU: 'menu',
        PAUSED: 'paused'
    };
    
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

        this.view = Game.GAME_VIEW.MENU;
        this.gameObjects = {
            gameplay: [],
            menu: [],
            paused: []
        };
        this.gameFields = [];
        this.userInputs = [];
        
        fix_dpi(this.canvas);
        
        // Handle window resizing
        window.addEventListener('resize', () =>{
            resizeCanvas(this.ctx, this.displayData);
        });
        
        // Handle mouse clicks and transfer event to game engine
        canvas.addEventListener('click', (event) => {
            const mousePos = getMousePos(event, this.displayData, this.canvas);
            this.userInputs.push({
                type: 'click',
                x: mousePos.x,
                y: mousePos.y
            });
        });
        
        // Initial game state
        this.state = {
            gameType: Game.GAME_TYPE.NORMAL,
            opponentType: Game.OPPONENT_TYPE.HUMAN,
            boardSize: 3,
            winLength: 3,
            currentPlayer: 1,
            occupiedSpaces: 0,
            gameOver: false,
            cpuMoveDelay: 500,
            cpuWaitTime: 500,
            stats: statUtils.getData()
        };
        
        // Initial configuration
        this.config = {};
        this.updateConfig();

        // Setup UI
        uiMenu.create(this);
        uiGameplay.create(this);
        uiPause.create(this);

        // Start the game
        uiGameplay.updateTurnSymbol(this);
        this.start();
    };

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

    resetState(){
        this.state.occupiedSpaces = 0;
        this.state.gameOver = false;
    };

    start(){
        resizeCanvas(this.ctx, this.displayData);
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }; 

    /**
     * The main game loop that updates and renders each game frame.
     * @param {number} timestamp - The current time stamp.
     */
    gameLoop(timestamp) {
        // Update game state
        updateFrameData(timestamp, this.frameData);
        if(!this.state.gameOver && this.state.currentPlayer == 2 && this.state.opponentType === Game.OPPONENT_TYPE.CPU){
            handleCpuInput(this);
        } else {
            handleUserInputs(this);
        }

        // Update animation state
        this.gameObjects[this.view].forEach(gameObject => {
            gameObject.update(this.frameData.deltaTime);
        });

        // Render frame
        clearCanvas(this.ctx, this.displayData);
        if(SHOW_GRID) graphicDebug.drawGrid(this.ctx, this.displayData);
        if(SHOW_FPS) graphicDebug.drawFPS(this.ctx, this.frameData.fps.avg);

        this.gameObjects[this.view].forEach(gameObject => {
            gameObject.draw(this.ctx);
        });

        // Request the next frame
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    };

}
