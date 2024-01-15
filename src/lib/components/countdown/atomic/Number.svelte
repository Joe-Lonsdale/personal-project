<script>
	import { numbers, guesses } from '$lib/countdown/stores.js';
	import { slide } from 'svelte/transition';
	export let label = '';
	export let id;
	export let used = false;
	export let composite = false;
	export let isNumberSet = false;
	let prevIdSelected = undefined;
	let bgColor = '#3982A3';
	$: if (isNumberSet) {
		if (used) bgColor = '#004667';
		else bgColor = '#3982A3';
	} else {
		if (composite) bgColor = '#BA8D52';
		else bgColor = '#3982A3';
	}
	let selectNumber = false;

	let numberSet = [];
	$: if ($guesses && $numbers) {
		if (!selectNumber) {
			if (id) {
				numberSet = [...$numbers, ...$guesses].filter((x) => x.id == id);
				label = numberSet[0].number;
			} else {
				numberSet = [{ number: label, id, used, composite }];
			}
		} else updateNumberSet();
	}
	function updateNumberSet() {
		if (!isNumberSet) {
			let currentGuess = $guesses.filter((x) => {
				return x.numberOne.id == id || x.numberTwo.id == id;
			})[0];
			numberSet = [
				...$numbers.filter((x) => !x.used),
				...$guesses
					.filter((x) => !x.used)
					.filter((x) => currentGuess == undefined || x.stage > currentGuess.stage)
			];
		} else numberSet = [...$numbers.filter((x) => !x.used), ...$guesses.filter((x) => !x.used)];
	}
	function toggleState(id) {
		if (selectNumber) {
			$numbers = $numbers.map((x) => {
				if (x.id == id && !x.used) x.used = true;
				else if (x.id == prevIdSelected) x.used = false;
				return x;
			});
			$guesses = $guesses.map((x) => {
				if (x.id == id && !x.used) x.used = true;
				else if (x.id == prevIdSelected) x.used = false;
				return x;
			});
		}
		updateNumberSet();
		selectNumber = !selectNumber;
	}

	function getBGColor(number) {
		if (number.composite) {
			return '#BA8D52';
		} else {
			return '#3982A3';
		}
	}
</script>

{#if !isNumberSet}
	<div class="number-container">
		{#each numberSet as number (number.id)}
			<div
				class="{!selectNumber ? 'rounded-number' : 'squared-number'} number"
				style:--bg={getBGColor(number)}
				style:z-index={selectNumber ? 2 : 1}
				on:click={() => {
					if (label || label == '') label = undefined;
					else {
						label = number.number;
						id = number.id;
						composite = number.composite;
						used = number.used;
					}
					toggleState(number.id);
					prevIdSelected = number.id;
				}}
				in:slide
				out:slide={{ duration: 100 }}
			>
				<p class="number-text" class:number-text-used={used}>{number.number ?? ''}</p>
			</div>
		{/each}
	</div>
{:else}
	<div class="rounded-number number" class:number-used={used} style:--bg={bgColor}>
		<p class="number-text" class:number-text-used={used}>{label ?? ''}</p>
	</div>
{/if}

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
