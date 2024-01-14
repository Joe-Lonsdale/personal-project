<script>
	import { guesses, target } from './../../../countdown/stores.js';
	import { getUUID } from '$lib/countdown/utils.js';
	import Number from './../atomic/Number.svelte';
	import Total from './../atomic/Total.svelte';
	import Operator from './../atomic/Operator.svelte';
	export let number_one = { number: undefined, composite: false, used: false };
	export let number_two = { number: undefined, composite: false, used: false };
	export let operator = '';
	let prevTotal = undefined;
	let id = getUUID();
	export let total = {
		number: undefined,
		target: false,
		invalid: false,
		used: false,
		composite: true,
		id
	};

	$: if (number_one.number && number_two.number && operator && operator != '') {
		total.number = +makeGuess(number_one.number, number_two.number, operator).toFixed(2);
		if (total.number != prevTotal) {
			if (total.number < 0 || total.number % 1 != 0) {
				total.invalid = true;
			} else total.invalid = false;
			if (total.number == $target) total.target = true;
			$guesses = [...$guesses.filter((x) => x.id != id), total];
			prevTotal = total;
		}
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
		return undefined;
	}
</script>

<div class="container">
	<Number
		bind:label={number_one.number}
		composite={number_one.composite}
		used={number_one.used}
		isNumberSet={false}
		id={undefined}
	/>
	<Operator bind:label={operator} />
	<Number
		bind:label={number_two.number}
		composite={number_two.composite}
		used={number_two.used}
		isNumberSet={false}
		id={undefined}
	/>
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
