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

    addShape(shape) {
        this.shapes.push(shape);
    }

    removeShape(shapeName) {
        const shapeIndex = this.shapes.findIndex(shape => shape.config.name && shape.config.name === shapeName);
        if (shapeIndex !== -1) {
            this.shapes.splice(shapeIndex, 1);
        }
    }

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

    draw(ctx) {
        if(!this.shapes.length) return;
        ctx.save();
        ctx.translate(this.config.x, this.config.y);
        this.shapes.forEach(shape => {
            shape.draw(ctx);
        });
        ctx.restore();
    }

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
