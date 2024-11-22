<svelte:options accessors />

<script>
	import { guesses, target } from '$lib/countdown/stores.js';
	import { getUUID } from '$lib/countdown/utils.js';
	import Number from './../atomic/Number.svelte';
	import Total from './../atomic/Total.svelte';
	import Operator from './../atomic/Operator.svelte';
	export let numberOne = { number: undefined, composite: false, used: false, id: undefined };
	export let numberTwo = { number: undefined, composite: false, used: false, id: undefined };
	export let operator = '';
	export let stage;
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
		numberTwo,
		stage
	};

	$: console.log(numberOne ? true : false);
	$: if (
		numberOne &&
		numberTwo &&
		operator &&
		numberOne.number !== undefined &&
		numberOne.number !== '' &&
		numberTwo.number !== undefined &&
		numberTwo.number !== ''
	) {
		let newTotal = +makeGuess(numberOne.number, numberTwo.number, operator);
		console.log(numberOne, operator, numberTwo, total, prevTotal);
		if (newTotal.toFixed(2) != prevTotal.number || newTotal.toFixed(2) == 0) updateTotal();
	}

	function updateTotal() {
		let new_total = {};
		Object.assign(new_total, total);
		new_total.number = +makeGuess(numberOne.number, numberTwo.number, operator).toFixed(2);
		prevTotal = new_total;

		if (new_total.number < 0 || new_total.number % 1 != 0) {
			new_total.invalid = true;
		} else new_total.invalid = false;
		if (new_total.number == $target) new_total.target = true;
		if ($guesses.filter((x) => x.id == id).length != 0) {
			$guesses = $guesses.map((x) => {
				if (x.id == id) return new_total;
				else return x;
			});
		} else {
			$guesses = [...$guesses, new_total];
		}
		Object.assign(total, new_total);
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
		return 0;
	}

	function deleteGuess() {
		$guesses = $guesses.map((v,i,a) => {return v.id != id});
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
		<button on:click={deleteGuess} class="delete_guess">x</button>
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