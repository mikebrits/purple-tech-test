# Purple Tech Task

I decided to do [Day 7](https://adventofcode.com/2018/day/7) of the Advent of Code challenges.  I think it looked more challenging than it actually was.

To get it up and running locally, navigate to the project and run:

    $ yarn
    $ yarn start
    
This should show some webpack build info, and then the output:

    Output: JDEKPFABTUHOQSXVYMLZCNIGRW
Which tested positive on the site, first time (there was an audible sigh of relief).

## Testing
To see test outputs, run:

    $ yarn test
    
Testing is done using Jest.

## Notes
Webpack was probably overkill for this, but for safety sakes (and because it's good practice to not always let create-react-app do all the heavy lifting) I decided to do it from scratch.

This was a fun challenge, but unfortunately not as tough as it seemed on the surface. Once I knew that a dependency graph data structure was needed, it quickly fell into place. The forwards / backwards graphs were a bit of a brain bender, but necessary for efficiency, I believe.

Whenever conducting interviews myself, I will often set challenge that will test a candidates usage of loops: Can you loop? How would you loop this? How expensive would it be to loop this data structure? Is there a way to do it without looping, or only looping once? With this in mind, I set to only do one 'expensive' loop in this exercise, though I suppose there is a `.sort()` in there which could be point for contention. 

Anywho, thanks for taking the time to read this, and I hope the comments in the code explain the algorithm clearly enough, as well as demonstrate a few more examples and styles of writing code. Also, if there is a better / simpler way to do this, please let me know; I'm all for learning.