import { INIT_MANAGER, INIT_WORKER, WORK, ASSIGN_STEP } from "../actionsTypes";
import workerReducer from './worker.reducer';
import _ from 'lodash';

const defaultState = {
    workers : [],
    isBusy: true,
    hasFreeWorker : true
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_MANAGER:
            const {workerCount, onComplete} = action.payload;
            let workers = [];
            for(let i = 0; i < workerCount; i++){
                workers[i] = workerReducer(null, {
                    type: INIT_WORKER,
                    payload: {
                        onComplete
                    }
                });
            }

            return {
                ...state,
                workers
            }
        case ASSIGN_STEP:
            if(!state.hasFreeWorker)
                return state;
            let isAssigned = false;
            return {
                ...state,
                workers : state.workers.map((worker) => {
                    if(!isAssigned && worker.ready){
                        isAssigned = true;
                        return workerReducer(worker, action);
                    }
                    return worker;
                })
            };
        case WORK:
        
            return {
                ...state,
                workers : state.workers.map(worker => workerReducer(worker, action)),
                hasFreeWorker: !!_.find(state.workers, 'ready')
            };
            
        default:
            return state;
    }
};