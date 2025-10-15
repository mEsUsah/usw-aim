import { fix_dpi, clearCanvas, resizeCanvas, updateFrameData } from './utils.js';
import * as graphicDebug from './graphicDebug.js' ;

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
        

        // PoC: Store click locations and draw circles there
        this.clickLocations = [];
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / this.displayData.scale - this.displayData.offsetX;
            const y = (e.clientY - rect.top) / this.displayData.scale - this.displayData.offsetY;
            
            console.log(`Click at canvas coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`);

            this.clickLocations.push({
                x: x,
                y: y
            });
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

        // Render the game state
        clearCanvas(this.ctx, this.displayData);
        if(SHOW_GRID) graphicDebug.drawGrid(this.ctx, this.displayData);
        if(SHOW_FPS) graphicDebug.drawFPS(this.ctx, this.frameData.fps.avg);


        // PoC START: Store click locations and draw circles there
        this.clickLocations.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "red";
            this.ctx.fillStyle = "orange";
            this.ctx.lineWidth  = 10;
            this.ctx.arc(circle.x, circle.y, 10, 0, 2 * Math.PI, false);
            this.ctx.stroke();
            this.ctx.fill();
        });
        // PoC END

        // Request the next frame
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    };
}
