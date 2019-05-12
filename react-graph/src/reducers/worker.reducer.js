import { WORK, ASSIGN_STEP, INIT_WORKER } from "../actionsTypes";
import uuid from 'uuid';

const defaultState = {
    id: null,
    ready: true,
    timeRemaining: 0,
    currentStep: null,
    onComplete: () => {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_WORKER:
            return {
                ...state,
                id: uuid.v4(),
                onComplete: action.payload.onComplete
            }
        case WORK:

        let timeRemaining = 0

        if(state.timeRemaining > 0){
            timeRemaining = state.timeRemaining - 1;
            if(timeRemaining === 0){
                // This should really be handled elsewhere
                state.onComplete()
            }
        }
        return state.ready ? 
            {
                ...state,
                currentStep: null
            }
            :{
                ...state,
                timeRemaining,
                ready: (timeRemaining === 0),

            };

        case ASSIGN_STEP:
            return {
                ...state,
                ready: true,
                currentStep: action.payload
            }
        
        default:
            return state;
    }
};

export const getStepValue = (char, base = 60) => char.charCodeAt(0) - 65 + 1 + base;