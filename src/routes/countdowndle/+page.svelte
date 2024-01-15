<script>
	import { browser } from '$app/environment';
	import Guess from '$lib/components/countdown/composite/Guess.svelte';
	import NumberSet from '$lib/components/countdown/composite/NumberSet.svelte';
	import Logo from '$lib/components/countdown/atomic/Logo.svelte';
	import { numbers, target, guesses } from '$lib/countdown/stores.js';
	import { generateNumberSet } from '$lib/countdown/utils';
	$numbers = generateNumberSet([2, 5, 7, 2, 25, 100]);
	$target = 305;
	let guessContainer;
	let guessIds = [];
	$: newestGuess = $guesses.at(-1);
	$: if (newestGuess && !newestGuess.invalid) {
		if (!guessIds.includes(newestGuess.id)) {
			guessIds.push(newestGuess.id);
			if (newestGuess.number == $target) {
			} else {
				const element = new Guess({
					target: document.getElementsByClassName('guess-container')[0]
				});
			}
		}
	} else newestGuess = undefined;

	$: console.log($guesses);
</script>

{#if browser}
	<div class="container">
		<Logo />
		<NumberSet />
		<div class="guess-container" bind:this={guessContainer}>
			<Guess />
		</div>
	</div>
{/if}

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
