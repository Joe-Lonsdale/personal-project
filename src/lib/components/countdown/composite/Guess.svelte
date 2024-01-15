<script>
	import { guesses, target } from '$lib/countdown/stores.js';
	import { getUUID } from '$lib/countdown/utils.js';
	import Number from './../atomic/Number.svelte';
	import Total from './../atomic/Total.svelte';
	import Operator from './../atomic/Operator.svelte';
	export let numberOne = { number: undefined, composite: false, used: false, id: undefined };
	export let numberTwo = { number: undefined, composite: false, used: false, id: undefined };
	export let operator = '';
	let prevTotal = { number: undefined };
	let id = getUUID();
	export let total = {
		number: undefined,
		target: false,
		invalid: false,
		used: false,
		composite: true,
		id,
		numberOne,
		numberTwo
	};
	$: if (
		numberOne &&
		numberTwo &&
		operator &&
		numberOne.number &&
		numberTwo.number &&
		+makeGuess(numberOne.number, numberTwo.number, operator).toFixed(2) != prevTotal.number
	) {
		updateTotal();
	}

	function updateTotal() {
		total.number = +makeGuess(numberOne.number, numberTwo.number, operator).toFixed(2);
		prevTotal = total;

		if (total.number < 0 || total.number % 1 != 0) {
			total.invalid = true;
		} else total.invalid = false;
		if (total.number == $target) total.target = true;
		if ($guesses.filter((x) => x.id == id).length != 0) {
			$guesses = $guesses.map((x) => {
				if (x.id == id) return total;
				else return x;
			});
		} else {
			$guesses = [...$guesses, total];
		}
	}

	function makeGuess(num_one, num_two, operator) {
		console.log(num_one, num_two, operator);
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
		return 0;
	}
</script>

<div class="container">
	{#key $guesses}
		<Number
			bind:label={numberOne.number}
			bind:composite={numberOne.composite}
			bind:used={numberOne.used}
			isNumberSet={false}
			bind:id={numberOne.id}
		/>
		<Operator bind:label={operator} />
		<Number
			bind:label={numberTwo.number}
			bind:composite={numberTwo.composite}
			bind:used={numberTwo.used}
			isNumberSet={false}
			bind:id={numberTwo.id}
		/>
		<Total
			bind:label={total.number}
			target={total.target}
			bind:invalid={total.invalid}
			bind:used={total.used}
		/>
	{/key}
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
