import {findStepOrder, readFile} from './functions';

readFile('../input.txt').then(data => {
    console.log('\n----------------------------------');
    console.log('Output:', findStepOrder(data));
    console.log('----------------------------------');
});
