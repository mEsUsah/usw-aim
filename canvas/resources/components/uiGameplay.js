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
}