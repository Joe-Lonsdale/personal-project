<script>
	import Guess from './../../lib/components/countdown/composite/Guess.svelte';
	import NumberSet from './../../lib/components/countdown/composite/NumberSet.svelte';
	import Logo from './../../lib/components/countdown/atomic/Logo.svelte';

	let numberSet = [2, 5, 7, 2, 25, 100];
	let target = 305;
	numberSet = numberSet.map((x) => {
		return { number: x, used: false };
	});

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
	<NumberSet numbers={numberSet} {target} />
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
