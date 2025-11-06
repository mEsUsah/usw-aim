import GameObject from "../classes/GameObject.js";
import GameShape from "../classes/GameShape.js";
import * as gameplayShapes from '../shapes/gameplayShapes.js';

export function create(game){
    // Menu button
    const menuButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth - 30,
        y: 30,
        name: 'menu_button',
        outline: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    });
    menuButton.addShape(new GameShape('rectangle', {
        x: -20,
        y: -20,
        width: 40,
        height: 40,
        color: "red"
    }));
    menuButton.addShape(new GameShape('rectangle', {
        x: -10,
        y: -10,
        width: 6,
        height: 20,
        color: "red",
        fillColor: "red"
    }));
    menuButton.addShape(new GameShape('rectangle', {
        x: 10,
        y: -10,
        width: -6,
        height: 20,
        color: "red",
        fillColor: "red"
    }));
    game.gameObjects.gameplay.push(menuButton);

    // Player turn indicator
    const turnIndicator = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 30,
        y: 37.5,
        name: 'turn_indicator',
    });
    turnIndicator.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Player:",
        font: "30px Consolas",
        color: "white"
    }));
    game.gameObjects.gameplay.push(turnIndicator);
}

export function updateTurnSymbol(game){
    // Remove existing turn symbol
    game.gameObjects.gameplay = game.gameObjects.gameplay.filter(obj => obj.config.name !== 'turn_symbol');

    // Add new turn symbol
    const turnSymbol = new GameObject({
        variant: GameObject.VARIANT.ILLUSTRATION,
        x: 165,
        y: 30,
        name: 'turn_symbol',
    });

    if(game.state.currentPlayer == 1){
        gameplayShapes.addTurnSymbolCross(turnSymbol);
    } else {
        gameplayShapes.addTurnSymbolCircle(turnSymbol);
    }
    game.gameObjects.gameplay.push(turnSymbol);
}