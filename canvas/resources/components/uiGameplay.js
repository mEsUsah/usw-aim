import GameObject from "./GameObject.js";
import GameShape from "./GameShape.js";

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
    
    if(game.gameState.currentPlayer == 1){
        turnSymbol.addShape(new GameShape('line', {
            x: -15,
            y: -15,
            x2: 15,
            y2: 15,
            color: "rgba(40, 151, 255, 1)",
            lineWidth: 4,
        }));
        turnSymbol.addShape(new GameShape('line', {
            x: 15,
            y: -15,
            x2: -15,    
            y2: 15,
            color: "rgba(40, 151, 255, 1)",
            lineWidth: 4,
        }));
    } else {
        turnSymbol.addShape(new GameShape('circle', {
            x: 0,
            y: 0,
            radius: 15,
            color: "rgba(248, 66, 66, 1)",
            lineWidth: 4,
        }));
    }
    game.gameObjects.gameplay.push(turnSymbol);
}