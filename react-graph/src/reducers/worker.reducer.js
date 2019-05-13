import { WORK, ASSIGN_STEP, INIT_WORKER, RESET_WORKER } from '../actionsTypes';
import uuid from 'uuid';

const defaultState = {
    id: null,
    timeRemaining: null,
    currentStep: null,
    currentStepValue: null,
    ready: true,
    profilePicture: "",
    name: "",
    history: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_WORKER:
            const {profilePicture, name} = action.payload;
            return {
                ...defaultState,
                ...defaultState,
                id: uuid.v4(),
                profilePicture,
                name
            };

        case WORK:
            return state.ready
                ? state
                : {
                      ...state,
                      timeRemaining: state.timeRemaining - 1,
                  };
        case ASSIGN_STEP:
            return {
                ...state,
                currentStep: action.payload,
                timeRemaining: getStepValue(action.payload),
                ready: false,
                history: [...state.history, action.payload],
                currentStepValue: getStepValue(action.payload)
            };
        case RESET_WORKER:
            return {
                ...state,
                timeRemaining: null,
                currentStep: null,
                ready: true,
                currentStepValue: null,
            };

        default:
            return state;
    }
};

export const getStepValue = (char, base = 0) => char.charCodeAt(0) - 65 + 1 + base;
