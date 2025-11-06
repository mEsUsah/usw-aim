import GameShape from "../classes/GameShape.js";
import GameShapeAnimation from "../classes/GameShapeAnimation.js";

/**
 * Adds a cross shape to the specified game object with an animation.
 * @param {Object} game - The game instance.
 * @param {Object} gameObject - The game object the cross shape will be added to.
 */
export function addGameboardCross(game, gameObject){
    const line1 = new GameShape('line', {
        x: game.config.cellPadding - game.config.cellWidth/2,
        y: game.config.cellPadding - game.config.cellHeight/2,
        x2: game.config.cellWidth/2 - game.config.cellPadding,
        y2: game.config.cellHeight/2 - game.config.cellPadding,
        color: "rgba(40, 151, 255, 1)",
        lineWidth: 4,
    });
    line1.addAnimation(new GameShapeAnimation({
        duration: 150,
        direction: GameShapeAnimation.BACKWARD,
    }));
    gameObject.addShape(line1);
    
    const line2 = new GameShape('line', {
        x: game.config.cellPadding - game.config.cellWidth/2,
        y: game.config.cellHeight/2 - game.config.cellPadding,
        x2: game.config.cellWidth/2 - game.config.cellPadding,
        y2: -game.config.cellHeight/2 + game.config.cellPadding,
        color: "rgba(40, 151, 255, 1)",
        lineWidth: 4,
    });
    line2.addAnimation(new GameShapeAnimation({
        duration: 150,
        startDelay: 150
    }));
    gameObject.addShape(line2);
}

/**
 * Adds a circle shape to the specified game object with an animation.
 * @param {Object} game - The game instance.
 * @param {Object} gameObject - The game object the circle shape will be added to.
 */
export function addGameboardCircle(game, gameObject){
    const circle = new GameShape('circle', {
        x: 0,
        y: 0,
        radius: (game.config.cellWidth/2) - game.config.cellPadding,
        color: "rgba(248, 66, 66, 1)",
        lineWidth: 4,
    });
    circle.addAnimation(new GameShapeAnimation({
        duration: 300,
    }));

    gameObject.addShape(circle);
}

/**
 * Creates a text shape for menu options.
 * @param {string} text - The text used to describe the menu option.
 * @returns {GameShape} - The created text shape.
 */
export function menuSelectionText(text){
    return new GameShape('text', {
        x: 0,
        y: 0,
        text: text,
        font: "30px Consolas",
        color: "white",
        align: "left",
        baseline: "middle"
    });
}


/** * Creates an outline shape for menu buttons.
 * @returns {GameShape} - The created outline shape.
 */
export function menuButtonOutline(){
    return new GameShape('rectangle', {
        x: -30,
        y: -30,
        width: 60,
        height: 60,
        color: "gray"
    });
}

/** * Creates a text shape for menu buttons.
 * @param {string} text - The text to be place inside the button.
 * @returns {GameShape} - The created text shape.
 */
export function menuButtonText(text){
    return new GameShape('text', {
        x: 0,
        y: 0,
        text: text,
        font: "30px Consolas",
        color: "white",
        align: "center",
        baseline: "middle"
    });
}

/** * Creates a shape indicating the selected menu option.
 * @returns {GameShape} - The created selected indicator shape.
 */
export function menuSelectedIndicator(){
    return new GameShape('line', {
        x: -20,
        y: 17,
        x2: 20,
        y2: 17,
        color: "red",
        lineWidth: 5,      
        name: 'selected_indicator'
    });
}