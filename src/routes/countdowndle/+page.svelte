<script>
	import Guess from './../../lib/components/countdown/composite/Guess.svelte';
	import NumberSet from './../../lib/components/countdown/composite/NumberSet.svelte';
	import Logo from './../../lib/components/countdown/atomic/Logo.svelte';
	import { numbers, target } from '$lib/stores.js';
	$numbers = [
		{ number: 2 },
		{ number: 5 },
		{ number: 7 },
		{ number: 2 },
		{ number: 25 },
		{ number: 100 }
	];
	$target = 305;

	let guesses = [];

	function makeGuess(num_one, num_two, operator) {
		switch (operator) {
			case '+':
				return num_one + num_two;
			case '-':
				return num_one - num_two;
			case 'x':
				return num_one * num_two;
			case '/':
				return num_one / num_two;
		}
	}
</script>

<div class="container">
	<Logo />
	<NumberSet />
	<div class="guess-container">
		<Guess />
	</div>
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
		gap: 30px;
	}
	.guess-container {
		display: flex;
		padding: 25px;
		flex-direction: column;
		align-items: center;
		border-radius: 25px;
		background: #513953;
	}
</style>
