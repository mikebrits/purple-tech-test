import Clock from './Clock';

describe('Clock', () => {
    

    it('increments the total per tick', () => {
        let countTracker = 0;
        const onTick = (count) => {
            let stopCount = 0;
            if(count === 10){
                stopCount = clock.stop();
            
            }
            countTracker++;
            expect(countTracker).toBe(count);
            
        }
        const clock = new Clock(onTick);
        clock.start();


    });

    it('stops executing when the stop command is issued', () => {
        const clock = new Clock(() => {});

    });
})