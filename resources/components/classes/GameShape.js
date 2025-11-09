import GameShapeAnimation from './GameShapeAnimation.js';

/**
 * GameShape represents a drawable shape in the game.
 * It supports various types of shapes including rectangles, circles, lines, polygons, and text.
 * Each shape (except text) can have an associated animation that affects its drawing.
 * @class GameShape
 * @property {string} type - The type of the shape ('rectangle', 'circle', 'line', 'polygon', 'text').
 * @property {Object} config - Configuration object for the shape (position, size, color, fillColor, lineWidth, text).
 */
export default class GameShape {
    constructor(type, config) {
        this.type = type;
        this.config = config;
        this.animation = null;
        this.lifetime = 0;
    }

    /**
     * Adds an animation to the shape.
     * @param {GameShapeAnimation} animation - The animation to add.
     */
    addAnimation(animation) {
        this.animation = animation;
    }

    /**
     * Updates the shape's state, including its lifetime and animation progress.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        this.lifetime += deltaTime;
        if(this.animation) {
            this.animation.updateProgress(deltaTime);
        }
    }
    /**
     * Draws the shape onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        let progress = 1;
        let isVisible = true;
        let direction = GameShapeAnimation.FORWARD;
        if (this.animation) {
            isVisible = this.animation.getIsVisible();
            progress = this.animation.getProgress();
            direction = this.animation.config.direction;
        }
        if(!isVisible) return;

        ctx.save();
        ctx.translate(this.config.x, this.config.y);
        ctx.strokeStyle = this.config.color || "red";
        ctx.lineWidth = this.config.lineWidth || 2;
        
        switch(this.type) {
            case 'rectangle':
                if(this.config.lineWidth) {
                    ctx.lineWidth = this.config.lineWidth;
                }
                ctx.beginPath();
                if(direction === GameShapeAnimation.FORWARD) {
                    ctx.rect(0, 0, this.config.width * progress, this.config.height * progress);
                } else {
                    ctx.rect(this.config.width * (1 - progress), this.config.height * (1 - progress), this.config.width * progress, this.config.height * progress);
                }
                ctx.stroke();

                if(this.config.fillColor) {
                    ctx.fillStyle = this.config.fillColor;
                    ctx.fill();
                }
                break;
            
            case 'circle':
                if(this.config.lineWidth) {
                    ctx.lineWidth = this.config.lineWidth;
                }
                ctx.beginPath();
                if(direction === GameShapeAnimation.FORWARD) {
                    ctx.arc(0, 0, this.config.radius, 0, (2 * Math.PI * progress), false);
                } else {
                    if(progress === 1) progress = 0; // To avoid full circle when finished
                    ctx.arc(0, 0, this.config.radius, (2 * Math.PI * progress), 0, false);
                }
                ctx.stroke();
                break;
            
            case 'line':
                if(this.config.lineWidth) {
                    ctx.lineWidth = this.config.lineWidth;
                }
                ctx.beginPath();
                if(direction === GameShapeAnimation.FORWARD) {
                    ctx.moveTo(0, 0);
                    ctx.lineTo((this.config.x2 - this.config.x) * progress, (this.config.y2 - this.config.y) * progress);
                } else {
                    ctx.moveTo((this.config.x2 - this.config.x) * progress, (this.config.y2 - this.config.y) * progress);
                    ctx.lineTo(this.config.x2 - this.config.x, this.config.y2 - this.config.y);
                }
                ctx.stroke();
                break;

            case 'polygon':
                if(!this.config.points || this.config.points.length < 2) break;
                if(this.config.lineWidth) {
                    ctx.lineWidth = this.config.lineWidth;
                }
                ctx.beginPath();
                ctx.moveTo(this.config.points[0].x, this.config.points[0].y);
                this.config.points.forEach((point, index) => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.closePath();
                ctx.stroke();

                if(this.config.fillColor) {
                    ctx.fillStyle = this.config.fillColor;
                    ctx.fill();
                }
                break;

            case 'text':
                ctx.font = this.config.font || "20px Arial";
                ctx.fillStyle = this.config.color || "black";
                ctx.textAlign = this.config.align || "left";
                ctx.textBaseline = this.config.baseline || "alphabetic";
                ctx.fillText(this.config.text || "", 0, 0);
                break;

            default:
                console.warn(`GameShape.draw() - Unknown shape type: ${this.type}`);
                break;
        }

        ctx.restore();
    }
}