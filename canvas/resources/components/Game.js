import {fix_dpi, drawGrid, drawFPS, clearCanvas, resizeCanvas} from './utils.js';

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
            scale: 1,
            offsetX: 0,
            offsetY: 0,
            width: GAME_WIDTH,
            height: GAME_HEIGHT
        };


        fix_dpi(this.canvas);

        window.addEventListener('resize', () =>{
            resizeCanvas(this.ctx, this.displayData);
        });

        this.start();
    };

    start(){
        resizeCanvas(this.ctx, this.displayData);
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }; 

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
        clearCanvas(this.ctx, this.displayData);
        if(SHOW_GRID) drawGrid(this.ctx, this.displayData);
        if(SHOW_FPS) drawFPS(this.ctx, this.frameData.fps.avg);
    
        // Request the next frame
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    };
}
