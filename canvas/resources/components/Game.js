import {fix_dpi, drawGrid, drawFPS, clearCanvas} from './utils.js';

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
        this.showFPS = true;
        this.showGrid = true;

        fix_dpi(this.canvas);
        this.start();
    };

    start(){
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        // Update game state
        this.frameData.deltaTime = timestamp - this.frameData.lastTime;
        this.frameData.lastTime = timestamp;
        this.frameData.fps.accum += Math.floor(1000 / this.frameData.deltaTime);
        this.frameData.fps.frames++;
        
        if(this.frameData.fps.frames >= 60){
            this.frameData.fps.avg = Math.floor(this.frameData.fps.accum / this.frameData.fps.frames);
            this.frameData.fps.accum = 0;
            this.frameData.fps.frames = 0;
        }

        
        

        // Render the game state
        clearCanvas(this.ctx);
        if(this.showGrid) drawGrid(this.ctx);
        if(this.showFPS) drawFPS(this.ctx, this.frameData.fps.avg);
    
        // Request the next frame
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    };
}
