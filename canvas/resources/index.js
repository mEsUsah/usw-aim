import {drawGrid, resizeCanvas} from './components/utils.js';
import {Game} from './components/Game.js';

window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    resizeCanvas(canvas);
    const game = new Game(canvas);

    window.addEventListener('resize', () =>{
        resizeCanvas(canvas);
        drawGrid(ctx);
    });
};