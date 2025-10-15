export class GameObject {
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

class GameShapeAnimation {
    static INFINITE = -1;
    constructor(duration, loop, startDelay, deleteTime) {
        this.duration = duration;
        this.progress = 0;
        this.lifetime = 0;
        this.loop = loop; // -1 inifinitely, 0 no loop, n times
        this.loopCount = 1;
        this.startDelay = startDelay || 0;
        this.deleteTime = deleteTime || 0;
    }

    updateProgress(deltaTime) {
        this.progress += deltaTime;
        this.lifetime += deltaTime;

        // Not started yet
        if(this.lifetime < this.startDelay) {
            this.progress = 0;
            return;
        }

        // Looping logic
        if(this.progress > this.duration 
            && (this.loop === GameShapeAnimation.INFINITE || this.loopCount < this.loop)
        ) {
            this.loopCount++;
            this.progress = this.progress % this.duration;
        }

        // Stop at duration if not looping
        if( this.progress > this.duration 
            && this.loop === 0
        ) {
            this.progress = this.duration;
        }        
    }

    getProgress() {
        return this.progress / this.duration;
    }

    getIsPastDeleteTime() {
        if(this.deleteTime > 0 
            && this.lifetime > (this.startDelay + this.deleteTime)
        ) {
            return true;
        }
        return false;
    }
}