import { fix_dpi, clearCanvas, resizeCanvas, updateFrameData } from './utils.js';
import * as graphicDebug from './graphicDebug.js' ;
import GameObject from './GameObject.js';
import GameShape from './GameShape.js';
import { getMousePos } from './mouseUtils.js';
import GameShapeAnimation from './GameShapeAnimation.js';

const SHOW_FPS = false;
const SHOW_GRID = true;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;

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

        this.gameMode = 'gameplay'; // other modes could be 'menu', 'paused', etc.
        this.gameObjects = {
            gameplay: [],
            menu: [],
            paused: []
        };
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
        
        // PoC: Add game objects with shapes as a grid
        this.gameConfig = {
            boardSize: 5,
            boardMargin: 60,
            cellWidth: (GAME_WIDTH - 120) / 5,
            cellHeight: (GAME_HEIGHT - 120) / 5,
            cellPadding: 10
        };


        for(let i=0; i<this.gameConfig.boardSize; i++){
            for(let j=0; j<this.gameConfig.boardSize; j++){
                const gameObject = new GameObject({
                    variant: GameObject.VARIANT.BOARD,
                    x: this.gameConfig.cellWidth/2 + i*this.gameConfig.cellWidth + this.gameConfig.boardMargin,
                    y: this.gameConfig.cellHeight/2 + j * this.gameConfig.cellHeight + this.gameConfig.boardMargin,
                    name: `board_${i}_${j}`,
                    outline: {
                        top: this.gameConfig.cellHeight/2,
                        left: this.gameConfig.cellWidth/2,
                        bottom: this.gameConfig.cellHeight/2,
                        right: this.gameConfig.cellWidth/2
                    }
                });
                const shape = new GameShape('rectangle', {
                    x: -this.gameConfig.cellWidth/2,
                    y: -this.gameConfig.cellHeight/2,
                    width: this.gameConfig.cellWidth,
                    height: this.gameConfig.cellHeight,
                    color: "red"
                });
                gameObject.addShape(shape);
                this.gameObjects.gameplay.push(gameObject);
            }
        }
        

        this.start();
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
                this.gameObjects[this.gameMode].forEach(gameObject => {
                    if (gameObject.config.variant == GameObject.VARIANT.BOARD && gameObject.config.outline) {
                        if (input.x >= gameObject.config.x - gameObject.config.outline.left &&
                            input.x <= gameObject.config.x + gameObject.config.outline.right &&
                            input.y >= gameObject.config.y - gameObject.config.outline.top &&
                            input.y <= gameObject.config.y + gameObject.config.outline.bottom) {
                                console.log(`Clicked on ${gameObject.config.name}`);
                                gameObject.addShape(new GameShape('line', {
                                    x: this.gameConfig.cellPadding - this.gameConfig.cellWidth/2,
                                    y: this.gameConfig.cellPadding - this.gameConfig.cellHeight/2,
                                    x2: this.gameConfig.cellWidth/2 - this.gameConfig.cellPadding,
                                    y2: this.gameConfig.cellHeight/2 - this.gameConfig.cellPadding,
                                    color: "yellow",
                                }));
                                gameObject.addShape(new GameShape('line', {
                                    x: this.gameConfig.cellPadding - this.gameConfig.cellWidth/2,
                                    y: this.gameConfig.cellHeight/2 - this.gameConfig.cellPadding,
                                    x2: this.gameConfig.cellWidth/2 - this.gameConfig.cellPadding,
                                    y2: -this.gameConfig.cellHeight/2 + this.gameConfig.cellPadding,
                                    color: "yellow",
                                }));
                        }
                    }
                });
            }
        });
        this.userInputs = [];
    }
}
