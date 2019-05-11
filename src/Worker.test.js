import Worker from './Worker';

describe('Worker', () => {

    const worker = new Worker();

    it('Is marked as ready when instantiated', () => {
        expect(worker.ready).toBe(true);    
        expect(worker.timeRemaining).toBe(0);    
    });

    it('Does not respond to work requests when it does not have a step', () => {
        worker.work();
        expect(worker.ready).toBe(true);
        expect(worker.timeRemaining).toBe(0);
    })


    it('Updates time remaining based on unit it is given', () => {
        worker.assignStep('A');
        expect(worker.timeRemaining).toBe(61);
    });

    it('Is marked as not ready when it is busy', () => {
        expect(worker.ready).toBe(false);    
    });


    it('Decrements time remaining when a unit of work is complete', () => {
        worker.work();
        expect(worker.timeRemaining).toBe(60);
    });

    it('Is marked as ready when its time remaining is 0', () => {
        while(worker.timeRemaining > 0){
            worker.work();
        }
        expect(worker.ready).toBe(true);
    });
});