/**
 * A game object is the basic building block of the game engine. 
 * * It can represent various entities such as boards, buttons, text, and illustrations.
 * * A game object can contain multiple shapes, which combined define its visual representation.
 * @class GameObject
 * @property {Object} config - Configuration object for the game object.
 */
export default class GameObject {
    static VARIANT = {
        BOARD: 1,
        BUTTON: 2,
        TEXT: 3,
        ILLUSTRATION: 4
    };

    
    constructor(config) {
        this.config = config;
        this.shapes = [];
        this.state = {};
    }

    /**
     * Adds a game shape to the game object.
     * @param {GameShape} shape - The shape to add.
     */
    addShape(shape) {
        this.shapes.push(shape);
    }

    /**
     * Removes a game shape from the game object.
     * @param {string} shapeName - The name of the shape to be removed.
     */
    removeShape(shapeName) {
        const shapeIndex = this.shapes.findIndex(shape => shape.config.name && shape.config.name === shapeName);
        if (shapeIndex !== -1) {
            this.shapes.splice(shapeIndex, 1);
        }
    }

    /**
     * Updates all game shapes within the game object.
     * * This is used to manage shape lifetimes and animation progress.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        this.shapes.forEach(shape => {
            shape.update(deltaTime);
        });

        // Remove shapes with longer lifetime than ttl
        this.shapes = this.shapes.filter(shape => {
            if(shape.config.ttl) {
                return shape.lifetime < shape.config.ttl;
            }
            return true;
        });
    }

    /**
     * Draws all game shapes onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if(!this.shapes.length) return;
        ctx.save();
        ctx.translate(this.config.x, this.config.y);
        this.shapes.forEach(shape => {
            shape.draw(ctx);
        });
        ctx.restore();
    }

    /**
     * Checks if a point is colliding with the game object's outline.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {boolean} - True if the point is colliding, false otherwise.
     */
    checkCollision(x, y) {
        if(!this.config.outline) return false;
        
        if (x >= this.config.x - this.config.outline.left &&
            x <= this.config.x + this.config.outline.right &&
            y >= this.config.y - this.config.outline.top &&
            y <= this.config.y + this.config.outline.bottom) {
                return true;
        }
        return false;
    }
}
