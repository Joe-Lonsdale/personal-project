<script>
	import Number from './../atomic/Number.svelte';
	import Total from './../atomic/Total.svelte';
	import Operator from './../atomic/Operator.svelte';
	export let number_one = { number: undefined, composite: false, used: false };
	export let number_two = { number: undefined, composite: false, used: false };
	export let operator = '';
	export let total = { number: undefined, target: false, invalid: false, used: false };
</script>

<div class="container">
	<Number label={number_one.number} composite={number_one.composite} used={number_one.used} />
	<Operator label={operator} />
	<Number label={number_two.number} composite={number_two.composite} used={number_two.used} />
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
