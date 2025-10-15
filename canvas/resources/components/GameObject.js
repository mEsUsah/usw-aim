import GameShapeAnimation from "./GameShapeAnimation.js";

export default class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.animations = [];
    }

    addAnimation(length, loop, startDelay, deleteTime) {
        const animation = new GameShapeAnimation(length, loop, startDelay, deleteTime);
        this.animations.push(animation);
    }

    deleteCompletedAnimations() {
        this.animations = this.animations.filter(animation => !animation.getIsPastDeleteTime());
    }
}