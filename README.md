# sudoku-solver-visual
25/08/22:
I got a little bit of the placeholder UI up, naturally the button doesn't do anything yet, and it still looks very 'Svelte default', but that can be done later.

I feel a bit crazy starting this off in TypeScript, as well as the unfamiliar Svelte, but experience tells me that tackling messy Codewars tasks can often lead to unwanted type mixing.

The main solving algorithm needs to be sorted, and that should be done a step at a time. Because of the quite obvious input and outputs (a 9x9 array), this can be done by test-driven development.

20/08/22:
Solve sudokus using methods that a human might use - the idea is that a page will visually display the steps you take. </br>

I feel that Svelte is an ideal framework to write this in, not only to learn about a new tech, but because it is highly memory efficient and can run the web application faster, which should help with doing a lot of little client-side actions, as the visualiser is attempting to do. </br>

So let's get on with it!
