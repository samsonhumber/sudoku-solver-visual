<script lang="ts">
	let puzzle_raw = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]];
	//import Counter from '$lib/Counter.svelte';
	import SudokuBox from '$lib/SudokuBox.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h2>Sudoku puzzle</h2>
	<div class="sudoku-grid">
		<SudokuBox example_number={puzzle_raw[0]}/> <SudokuBox example_number={puzzle_raw[1]}/> <SudokuBox example_number={puzzle_raw[2]}/>
		<SudokuBox example_number={puzzle_raw[3]}/> <SudokuBox example_number={puzzle_raw[4]}/> <SudokuBox example_number={puzzle_raw[5]}/>
		<SudokuBox example_number={puzzle_raw[6]}/> <SudokuBox example_number={puzzle_raw[7]}/> <SudokuBox example_number={puzzle_raw[8]}/>
	</div>
	<br/>
	<button>Solve for me (placeholder)</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	/* (A) CONTAINER */
.sudoku-grid {
  /* (A1) GRID LAYOUT */
  display: grid;
 
  /* (A2) SPECIFY COLUMNS */
  grid-template-columns: auto auto auto;
 
  /* we can also specify exact pixels, percentage, repeat
  grid-template-columns: 50px 100px 150px;
  grid-template-columns: 25% 50% 25%;
  grid-template-columns: 100px 20% auto;
  grid-template-columns: repeat(3, auto); */
}
 
/* (B) GRID CELLS */
/*div.cell {
  background: rgb(252, 252, 252);
  border: 1px solid rgb(8, 8, 8);
  padding: 10px;
}*/
 
/* (C) RESPONSIVE - 1 COLUMN ON SMALL SCREENS */
@media screen and (max-width: 640px) {
	.sudoku-grid { grid-template-columns: 100%; }
}
</style>
