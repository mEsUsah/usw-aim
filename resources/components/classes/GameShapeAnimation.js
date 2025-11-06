/**
 * GameShapeAnimation manages the animation state of a game shape.
 * It handles progress, looping, direction, and timing of the animation.
 * @class GameShapeAnimation
 * @property {Object} config - Configuration object for the animation.
 */
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

    /**
     * Updates the animation progress based on the elapsed time.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    updateProgress(deltaTime) {
        this.progress += deltaTime;
        this.lifetime += deltaTime;

        // Not started yet
        if(this.lifetime < this.config.startDelay) {
            this.progress = 0;
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

    /**
     * Gets the current progress of the animation as a value between 0 and 1.
     * @returns {number} The current progress of the animation.
     */
    getProgress() {
        return this.progress / this.config.duration;
    }
}