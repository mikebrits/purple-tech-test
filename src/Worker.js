import { getStepValue } from './functions';

export default class Worker {
    timeRemaining = 0;
    ready = true;
    currentStep;

    constructor(onComplete = () => {}, baseTime = 60) {
        this.baseTime = baseTime;
        this.onComplete = onComplete;
    }

    assignStep = step => {
        this.timeRemaining = getStepValue(step, this.baseTime); 
        this.ready = false;
        this.currentStep = step;
    };

    work = () => {
        if (!this.ready) {
            this.timeRemaining--;
            if (this.timeRemaining === 0) {
                this.ready = true;
                this.onComplete(this.currentStep);
            }
        }
        else {
            this.currentStep = null;
        }
    };
}
