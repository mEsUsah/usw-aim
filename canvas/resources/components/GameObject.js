export default class GameObject {
    static VARIANT = {
        BOARD: 1,
    };

    
    constructor(config) {
        this.config = config;
        this.animations = [];
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
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
}
