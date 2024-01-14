<script>
	import Number from './../atomic/Number.svelte';
	import Total from './../atomic/Total.svelte';
	import { numbers, target } from '$lib/stores.js';
</script>

<div class="container">
	{#each $numbers as number}
		<Number label={number.number} used={number.used} />
	{/each}
	<Total label={$target} target={true} />
</div>

<style>
	.container {
		display: inline-flex;
		height: 100px;
		padding: 0px 25px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 25px;
		background: #513953;
	}
</style>
