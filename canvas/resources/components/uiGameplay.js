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
    menuButton.addShape(new GameShape('line', {
        x: -12,
        y: -10,
        x2: 12,
        y2: -10,
        color: "red"
    }));
    menuButton.addShape(new GameShape('line', {
        x: -12,
        y: 0,
        x2: 12,
        y2: 0,
        color: "red"
    }));
    menuButton.addShape(new GameShape('line', {
        x: -12,
        y: 10,
        x2: 12,
        y2: 10,
        color: "red"
    }));
    game.gameObjects.gameplay.push(menuButton);
}