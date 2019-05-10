import {findStepOrder, readFile} from './functions';

readFile('../input.txt').then(data => {
    console.log(findStepOrder(data));
});
