import { fix_dpi, clearCanvas, resizeCanvas, updateFrameData } from './utils.js';
import * as graphicDebug from './graphicDebug.js' ;
import { GameObject } from './GameObject.js';

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
            console.log(e.clientX, e.clientY, "->", x, y);

            const gameObject = new GameObject(x, y);
            gameObject.addAnimation(1000, -1); // 1 second animation, no loop
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
            gameObject.animations.forEach(animation => {
                animation.updateProgress(this.frameData.deltaTime);
            });
        });
        // PoC END



        // Render the game state
        clearCanvas(this.ctx, this.displayData);
        if(SHOW_GRID) graphicDebug.drawGrid(this.ctx, this.displayData);
        if(SHOW_FPS) graphicDebug.drawFPS(this.ctx, this.frameData.fps.avg);


        // PoC START: Store click locations and draw circles there
        this.gameObjects.forEach(gameObject => {
            gameObject.animations.forEach(animation => {
                const progress = animation.getProgress();
                const endAngle = progress * 2 * Math.PI;
                this.ctx.beginPath();
                this.ctx.strokeStyle = "red";
                this.ctx.fillStyle = "orange";
                this.ctx.lineWidth  = 2;
                this.ctx.arc(gameObject.x, gameObject.y, 10, 0, endAngle, false);
                this.ctx.stroke();
            });
        });
        // PoC END

        // Request the next frame
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    };
}
