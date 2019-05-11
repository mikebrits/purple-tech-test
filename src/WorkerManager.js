import Worker from './Worker';

export default class WorkerManager{
    workers = [];

    constructor(workerCount = 0, onStepComplete = () => {}){

        for(let i =0; i < workerCount + 1; i++){
            this.workers[i] = new Worker(onStepComplete);
        }
    }

    getAvailableWorkers = () => {
        return this.workers.filter((item) => item.ready);
    }

    work = () => {
        this.workers.forEach(worker => worker.work());
    }

    assignStep = (step) => {
        const w = this.getAvailableWorkers()[0];
        if(w){
            w.assignStep(step);
            return true;
        }
        return false;
    }

}