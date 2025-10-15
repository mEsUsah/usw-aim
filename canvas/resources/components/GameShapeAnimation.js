export default class GameShapeAnimation {
    static INFINITE = -1;
    static FORWARD = 1;
    static BACKWARD = 2;

    constructor(config) {
        this.config = {};
        this.config.duration = config.duration || 1000;
        this.config.loop = config.loop || 0; // -1 inifinitely, 0 no loop, n times
        this.config.direction = config.direction || GameShapeAnimation.FORWARD;
        this.config.startDelay = config.startDelay || 0;
        
        this.progress = 0;
        this.lifetime = 0;
        this.loopCount = 1;
    }

    updateProgress(deltaTime) {
        this.progress += deltaTime;
        this.lifetime += deltaTime;

        // console.log("Animation progress", this.progress, "/", this.duration, "lifetime", this.lifetime);

        // Not started yet
        if(this.lifetime < this.config.startDelay) {
            if(this.config.direction === GameShapeAnimation.FORWARD) this.progress = 0;
            if(this.config.direction === GameShapeAnimation.BACKWARD) this.progress = this.config.duration;
            return;
        }

        // Looping logic
        if(this.progress > this.config.duration 
            && (this.config.loop === GameShapeAnimation.INFINITE || this.loopCount < this.config.loop)
        ) {
            this.loopCount++;
            this.progress = this.progress % this.config.duration;
        }

        // Stop at duration if not looping
        if( this.progress > this.config.duration
            && this.config.loop === 0
        ) {
            this.progress = this.config.duration;
        }        
    }

    getProgress() {
        
        return this.progress / this.config.duration;
    }
}