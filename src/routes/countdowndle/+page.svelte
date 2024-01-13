<script>
	import Guess from './../../lib/components/countdown/composite/Guess.svelte';
	import NumberSet from './../../lib/components/countdown/composite/NumberSet.svelte';

	let numberSet = [2, 5, 7, 2, 25, 100];
	let target = 305;
	numberSet = numberSet.map((x) => {
		return { number: x, used: false };
	});
</script>

<div class="container">
	<NumberSet numbers={numberSet} {target} />
</div>

<style>
	.container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
