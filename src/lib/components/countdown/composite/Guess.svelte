<script>
	import Number from './../atomic/Number.svelte';
	import Total from './../atomic/Total.svelte';
	import Operator from './../atomic/Operator.svelte';
	export let number_one = { number: undefined, composite: false, used: false };
	export let number_two = { number: undefined, composite: false, used: false };
	export let operator = '';
	export let total = { number: undefined, target: false, invalid: false, used: false };

	$: if (number_one.number && number_two.number && operator && operator != '') {
		total.number = makeGuess(number_one.number, number_two.number, operator);
		if (total.number < 0 || total.number % 1 != 0) {
			total.invalid = true;
		} else total.invalid = false;
	}

	export function setNumberOne(num) {
		number_one.number = num;
	}

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
	$: console.log(number_one, number_two, operator, total);
</script>

<div class="container">
	<Number bind:label={number_one.number} composite={number_one.composite} used={number_one.used} />
	<Operator bind:label={operator} />
	<Number bind:label={number_two.number} composite={number_two.composite} used={number_two.used} />
	<Total label={total.number} target={total.target} invalid={total.invalid} used={total.used} />
</div>

<style>
	.container {
		display: inline-flex;
		height: 100px;
		padding: 0px 25px;
		justify-content: center;
		align-items: center;
		gap: 25px;
		border-radius: 25px;
		background: #513953;
	}
</style>
