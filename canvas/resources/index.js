import {drawGrid, resizeCanvas} from './components/utils.js';
import {Game} from './components/Game.js';

window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    
    const game = new Game(canvas);

};