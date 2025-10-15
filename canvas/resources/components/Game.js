import { fix_dpi, clearCanvas, resizeCanvas, updateFrameData } from './utils.js';
import * as graphicDebug from './graphicDebug.js' ;
import GameObject from './GameObject.js';
import GameShape from './GameShape.js';
import GameShapeAnimation from './GameShapeAnimation.js';

const SHOW_FPS = true;
const SHOW_GRID = true;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

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
        
        fix_dpi(this.canvas);
        
        window.addEventListener('resize', () =>{
            resizeCanvas(this.ctx, this.displayData);
        });
        

        // PoC: Add animated circles where the user clicks
        this.gameObjects = [];
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / this.displayData.scale - this.displayData.offsetX;
            const y = (e.clientY - rect.top) / this.displayData.scale - this.displayData.offsetY;

            const gameObject = new GameObject(x, y);

            const shape1 = new GameShape('line', {
                x: x + 100, 
                y: y - 100, 
                x2: x, 
                y2: y, 
            });
            const animation1 = new GameShapeAnimation({
                duration: 100, // 1 second
                startDelay: 0,
                direction: GameShapeAnimation.FORWARD,
                loop: false
            });
            shape1.addAnimation(animation1);
            gameObject.addShape(shape1);
            
            const shape2 = new GameShape('line', {
                x: x, 
                y: y - 10, 
                x2: x, 
                y2: y, 
            });
            const animation2 = new GameShapeAnimation({
                duration: 1, // 1 second
                startDelay: 100,
                direction: GameShapeAnimation.FORWARD,
                loop: false
            });
            shape2.addAnimation(animation2);
            gameObject.addShape(shape2);

            const shape3 = new GameShape('line', {
                x: x +10, 
                y: y , 
                x2: x, 
                y2: y, 
            });
            const animation3 = new GameShapeAnimation({
                duration: 1, // 1 second
                startDelay: 100,
                direction: GameShapeAnimation.FORWARD,
                loop: false
            });
            shape3.addAnimation(animation3);
            gameObject.addShape(shape3);

            this.gameObjects.push(gameObject);
        });
        // PoC END

        this.start();
    };

    start(){
        resizeCanvas(this.ctx, this.displayData);
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }; 

    gameLoop(timestamp) {
        // Update game state
        updateFrameData(timestamp, this.frameData);

        // PoC: Update animations
        this.gameObjects.forEach(gameObject => {
            gameObject.update(this.frameData.deltaTime);
        });
        // PoC END



        // Render the game state
        clearCanvas(this.ctx, this.displayData);
        if(SHOW_GRID) graphicDebug.drawGrid(this.ctx, this.displayData);
        if(SHOW_FPS) graphicDebug.drawFPS(this.ctx, this.frameData.fps.avg);


        // PoC START: Store click locations and draw circles there
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(this.ctx);
        });
        // PoC END

        // Request the next frame
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    };
}
