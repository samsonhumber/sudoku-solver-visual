<script lang="ts">
    /* Plan Sudoku box (from here)
    - We want to have a condition that turns 0 entries into empty strings (blanks)
    - Enabling smaller possibility boxes would be ideal
    - There should also be some kind of highlight styles when showing a step-by-step solution
    */
	export let example_number: Array<number>
</script>

<section>
    <div class='three-three-box'>
        <div class="cell">{example_number[0]}</div> <div class="cell">{example_number[1]}</div> <div class="cell">{example_number[2]}</div>
		<div class="cell">{example_number[3]}</div> <div class="cell">{example_number[4]}</div> <div class="cell">{example_number[5]}</div>
		<div class="cell">{example_number[6]}</div> <div class="cell">{example_number[7]}</div> <div class="cell">{example_number[8]}</div>
    </div>
</section>

<style>
.three-three-box {
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
div.cell {
  background: rgb(252, 252, 252);
  border: 1px solid rgb(8, 8, 8);
  padding: 10px;
}
  
</style>