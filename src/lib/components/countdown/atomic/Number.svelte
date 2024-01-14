<script>
	import { numbers } from '$lib/stores.js';
	import { slide } from 'svelte/transition';
	export let label = '';
	export let used = false;
	export let composite = false;
	let bgColor = '#3982A3';
	$: if (composite) {
		if (used) bgColor = '#7E5116';
		else bgColor = '#BA8D52';
	} else {
		if (used) bgColor = '#004667';
		else bgColor = '#3982A3';
	}
	let selectNumber = false;
	$: numberSet = selectNumber
		? $numbers.map((x) => {
				return { number: x.number, id: getUUID() };
			})
		: [{ number: label, id: getUUID() }];

	$: console.log(numberSet);

	function toggleState() {
		selectNumber = !selectNumber;
	}
	function getUUID() {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}
</script>

<div class="number-container">
	{#each numberSet as number (number.id)}
		<div
			class="squared-number number"
			class:number-used={used}
			style:--bg={bgColor}
			on:click={() => {
				if (label || label == '') label = undefined;
				else label = number.number;
				toggleState();
			}}
			in:slide
			out:slide={{ duration: 100 }}
		>
			<p class="number-text" class:number-text-used={used}>{number.number ?? ''}</p>
		</div>
	{/each}
</div>

<style>
	@import './mixins.css';
	.rounded-number {
		border-radius: 25px;
		transition: all ease 0.1s;
		-webkit-transition: all ease 0.1s;
		-ms-transition: all ease 0.1s;
	}

	.squared-number {
		transition: all ease 0.1s;
		-webkit-transition: all ease 0.1s;
		-ms-transition: all ease 0.1s;
	}

	.number-container {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		border-radius: 25px;
		overflow: hidden;
	}
</style>
