import { fix_dpi, clearCanvas, resizeCanvas, updateFrameData } from './utils.js';
import * as graphicDebug from './graphicDebug.js' ;
import GameObject from './GameObject.js';
import GameShape from './GameShape.js';
import { getMousePos } from './mouseUtils.js';
import GameShapeAnimation from './GameShapeAnimation.js';

const SHOW_FPS = true;
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
        const boardSize = 3;
        for(let i=0; i<boardSize; i++){
            for(let j=0; j<boardSize; j++){
                const gameObject = new GameObject({
                    variant: GameObject.VARIANT.BOARD,
                    x: 80 + i * 150,
                    y: 80 + j * 150,
                    name: `board_${i}_${j}`,
                    outline: {
                        top: 20,
                        left: 20,
                        bottom: 20,
                        right: 20
                    }
                });
                const shape = new GameShape('rectangle', {
                    x: -20,
                    y: -20,
                    width: 40,
                    height: 40,
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
                                    x: -20,
                                    y: -20,
                                    x2: 20,
                                    y2: 20,
                                    color: "yellow",
                                    ttl: 1000 // shape lasts for 1 second
                                }));
                                gameObject.addShape(new GameShape('line', {
                                    x: -20,
                                    y: 20,
                                    x2: 20,
                                    y2: -20,
                                    color: "yellow",
                                    ttl: 1000 // shape lasts for 1 second
                                }));
                            }
                    }
                });
            }
        });
        this.userInputs = [];
    }
}
