import Game from './components/classes/Game.js';

window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);
};