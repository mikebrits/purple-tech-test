import {REMOVE_NODE, NODE_COMPLETE, INIT_GRAPH, ADD_NODE_REF} from '../actionsTypes';
import _ from 'lodash';

const defaultState = {
    originalForward: {},
    originalBackward: {},
    forward: {},
    backward: {},
    nodeRefs: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_GRAPH:
            const [forward, backward] = parseInput(action.payload);
            return { 
                forward, 
                backward, 
                originalForward: forward, 
                originalBackward: backward 
            };
        case REMOVE_NODE:
            return {
                ...state,
                forward: _.omit(state.forward, action.payload),
            };
        case ADD_NODE_REF:
            return {
                ...state,
                nodeRefs: {
                    ...state.nodeRefs,
                    [action.payload.step] : action.payload.node
                }
            }
        case NODE_COMPLETE:
            const step = action.payload;
            const dependencies = state.backward[step];
            let forwardCopy = { ...state.forward };
            dependencies.forEach(dep => {
                forwardCopy[dep] = forwardCopy[dep].filter(item => item !== step);
            });

            return {
                ...state,
                forward: _.omit(state.forward, action.payload),
                // forward: _.mapValues(state.forward, object =>
                //     object.filter(item => item !== action.payload),
                // ),
            };
        default:
            return state;
    }
};

const parseInput = input => {
    const pairs = splitInputToPairs(input);
    // Object listing dependencies
    // {A : ["B"], C: ["B"]} means that A and C depend on B being complete
    let forward = {};

    // Dependency tracker - inverse of forward
    // {B : ["A", "C"]} means B is a required step for A and C
    // This is useful because when we mark a step complete, we don't
    // want to have to traverse the object and the arrays within to find
    // and remove the dependency, we can simply refer to B, and know we need
    // to remove B from the forward of A and C.
    let backward = {};

    // Do as much as you can in a single iteration
    pairs.forEach(([a, b]) => {
        // Check if the element exists, if it does, add it to the array, if not
        // create the array with that one element in it
        // ES6 / React-y inline statement way:
        forward[b] = forward[b] ? [...forward[b], a] : [a];
        // Cleaner to read for beginners:
        if (backward[a]) {
            backward[a] = [...backward[a], b];
        } else {
            backward[a] = [b];
        }

        // Make sure we add the indices for all encountered nodes
        // This ensures that we have a start point, as these may look
        // like {F : []} in the forward
        forward[a] = forward[a] || [];
        backward[b] = backward[b] || [];
    });

    // Because we are returning two objects, they are returned in an array
    // This could also be returned in an object, but gives us less flexible
    // or more tedious naming conventions wherever we use it.
    // Plus this is standard in React hooks now, so hey, let's flaunt it.
    return [forward, backward];
};

// "Step C must be finished before step W can begin." => [["C", "W"]]
export const splitInputToPairs = input => {
    // First, break the input into lines
    const pairs = input.split('\n').map(item => {
        // Turn each line into an array of words
        const arr = item.split(' ');
        // This feels a little hacky. It will work perfectly for the data source
        // provided, but if the steps went into double digits e.g. AA then this approach
        // would fall over. A better way would probably be to have some kind of fancy regex
        // on the string. But at that point I'd just be showing off my google skills.
        return [arr[1], arr[7]];
    });

    return pairs;
};
