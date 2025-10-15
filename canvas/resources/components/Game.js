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
            console.log(e.clientX, e.clientY, "->", x, y);

            const gameObject = new GameObject(x, y);
            
            let shape1 = new GameShape('circle', {x:x, y:y, radius:10});
            // shape1.addAnimation(new GameShapeAnimation({duration: 1000, direction: "forward", startDelay: 0, endDelay: 0}));
            gameObject.addShape(shape1);

            let shape2 = new GameShape('circle', {x:x+20, y:y, radius:10});
            shape2.addAnimation(new GameShapeAnimation({
                duration: 1000, 
                direction: GameShapeAnimation.FORWARD,
                startDelay: 0, 
                endDelay: 200
            }));
            gameObject.addShape(shape2);

            let shape3 = new GameShape('circle', {x:x-20, y:y, radius:10});
            shape3.addAnimation(new GameShapeAnimation({
                duration: 1000, 
                direction: GameShapeAnimation.BACKWARD, 
                startDelay: 0, 
                endDelay: 400
            }));
            gameObject.addShape(shape3);

            let shape4 = new GameShape('circle', {x:x, y:y+20, radius:10});
            shape4.addAnimation(new GameShapeAnimation({
                duration: 1000, 
                direction: GameShapeAnimation.FORWARD, 
                startDelay: 0, 
                endDelay: 600
            }));
            gameObject.addShape(shape4);

            let shape5 = new GameShape('circle', {x:x, y:y-20, radius:10});
            shape5.addAnimation(new GameShapeAnimation({
                duration: 1000, 
                direction: GameShapeAnimation.BACKWARD, 
                startDelay: 0, 
                endDelay: 800
            }));
            gameObject.addShape(shape5);

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
