# Purple Tech Task

## Running the Project
To get it up and running locally, navigate to the project and run:

    $ git clone https://github.com/mikebrits/purple-tech-test.git
    $ git checkout <Part1 or Part2>
    $ yarn
    $ yarn start
    
This should show some webpack build info, and then the output.

## Part One
**On Branch:** Part1

I decided to do [Day 7](https://adventofcode.com/2018/day/7) of the Advent of Code challenges.  I think it looked more challenging than it actually was.

    Output: JDEKPFABTUHOQSXVYMLZCNIGRW

### Notes
Webpack was probably overkill for this, but for safety sakes (and because it's a good practice exercise to not always let `create-react-app` do all the heavy lifting) I decided to do it from scratch.

This was a fun challenge, but unfortunately not as tough as it seemed on the surface. Once I knew that a dependency graph data structure was needed, it quickly fell into place. The forwards / backwards graphs were a bit of a brain bender, but necessary for efficiency, I believe.

Whenever conducting interviews myself, I will often set challenge that will test a candidates usage of loops: Can you loop? How would you loop this? How expensive would it be to loop this data structure? Is there a way to do it without looping, or only looping once? With this in mind, I set to only do one 'expensive' loop in this exercise, though I suppose there is a `.sort()` in there which could be point for contention. 

## Part Two
**On Branch:** Part2

    Output: 1048

### Notes
I did not realise these challenges came in two parts! For fun, I started doing some of the earlier challenges and I noticed that *they* were all in two parts. So, I came back to this, and true enough, there it was!

Part Two was significantly more challenging than Part One. I was tempted originally to keep it functional, but I thought it would be good to show some OO concepts. This would help to make the code more readable, and also help with debugging, which would be inevitable when dealing with something that modelled multi-threading.  

I have included some optional (albeit hideous) logging, that can be enabled by commenting out the appropriate lines in `GraphTraverser.js`. These should match the formatting given in the examples, but tabbing seems to be quite janky. 

There is a nested loop that I'm not crazy about, but I think it's needed, and should normally be quite performant, as the array it's looping over should always be small. In the real world, we would need to look at the business case and decide on which scenario would be more likely: Lots of waiting 'threads' (horizontal) or long queues (vertical). The code would be adapted accordingly.

## Testing
To see test outputs, run:

    $ yarn test
    
Testing is done using Jest. There is a coverage report in the coverage folder. Most of the lack of coverage is around testing Node's file reading system. I didn't think it was core to this exercise, so I've left it out.


