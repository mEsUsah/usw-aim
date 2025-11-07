import GameShape from "../classes/GameShape.js";

/** 
 * Adds the game title to a game object.
 * @param {GameObject} gameObject - The game object the title will be added to.
 */
export function addTitle(gameObject){
    gameObject.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Noughts and Crosses",
        font: "60px Consolas",
        color: "white",
        align: "center",
        baseline: "middle"
    }));
    gameObject.addShape(new GameShape('line', {
        x: -350,
        y: 35,
        x2: 350,
        y2: 35,
        color: "white",
        lineWidth: 3,      
    }));
    gameObject.addShape(new GameShape('text', {
        x: 0,
        y: 60,
        text: "Stanley Skarshaug - USW student 23092388",
        font: "20px Consolas",
        color: "gray",
        align: "center",
        baseline: "middle"
    }));
}

/** 
 * Adds a start large play button shape to a game object.
 * @param {GameObject} gameObject - The game object the start button will be added to.
 */
export function addStartButton(gameObject){
    gameObject.addShape(new GameShape('rectangle', {
        x: -60,
        y: -60,
        width: 120,
        height: 120,
        color: "red"
    }));
    gameObject.addShape(new GameShape('polygon', {
        x: -0,
        y: -0,
        points: [
            {x: -30, y: -40},
            {x: 40, y: 0},
            {x: -30, y: 40}
        ],
        color: "red",
        fillColor: "red"
    }));
}


/**
 * Creates a text shape for menu options.
 * @param {string} text - The text used to describe the menu option.
 * @returns {GameShape} - The created text shape.
 */
export function selectionText(text){
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
export function buttonOutline(){
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
export function buttonText(text){
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
export function selectedIndicator(){
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

export function disabledOverlay(){
    return new GameShape('rectangle', {
        x: -25,
        y: -25,
        width: 50,
        height: 50,
        color: "#00000088",
        fillColor: "#000000aa",
        name: 'disabled_overlay'
    });
}


/** * Adds a stats text shape to a game object.
 * @param {GameObject} gameObject - The game object the stats text will be added to.
 * @param {Object} stats - The stats data to display.
 */
export function addStatsText(gameObject, stats){
    const statsString = `Games Played: ${stats.gamesPlayed} | Wins: ${stats.gamesWon} | Losses: ${stats.gamesLost} | Draws: ${stats.gamesDrawn}`;
    gameObject.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: statsString,
        font: "16px Consolas",
        color: "white",
        align: "center",
        baseline: "middle",
        name: 'stats_text'
    }));
}