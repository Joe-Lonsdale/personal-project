<script>
	import { slide } from 'svelte/transition';
	export let label = undefined;
	let bgColor = '#75BEDF';
	let selectOperator = false;

	function toggleState() {
		selectOperator = !selectOperator;
	}

	$: operators = label ? [label] : ['+', '-', 'x', '/'];
</script>

<div class="operator-container">
	{#each operators as operator (operator)}
		<div
			class="squared-operator number"
			style:--bg={bgColor}
			on:click={() => {
				toggleState();
				if (label) label = undefined;
				else label = operator;
			}}
			in:slide
			out:slide={{ duration: 100 }}
		>
			<p class="number-text">{operator ?? ''}</p>
		</div>
	{/each}
</div>

<style>
	@import './mixins.css';
	.rounded-operator {
		border-radius: 25px;
		transition: all ease 0.1s;
		-webkit-transition: all ease 0.1s;
		-ms-transition: all ease 0.1s;
	}

	.operator-container {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		border-radius: 25px;
	}

	.squared-operator {
		display: flex;
		width: 75px;
		height: 75px;
		justify-content: center;
		align-items: center;
		gap: 25px;
		flex-shrink: 0;
		background: #75bedf;
		box-shadow: -2px -2px 4px 0px rgba(0, 0, 0, 0.25) inset;
	}
</style>
