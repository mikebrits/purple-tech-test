/* eslint-disable no-console */
import {findGraphExecutionTime, readFile} from './functions';

readFile('../input.txt').then(data => {
    console.log('\n----------------------------------');
    console.log('Output:', findGraphExecutionTime(data));
    console.log('----------------------------------');
});
