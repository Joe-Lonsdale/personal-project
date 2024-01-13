<script>
	export let label = undefined;
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
</script>

<div
	class="rounded-number number"
	class:number-used={used}
	style:--bg={bgColor}
	on:click={() => {
		used = !used;
	}}
>
	<p class="number-text" class:number-text-used={used}>{label ?? ''}</p>
</div>

<style>
	@import './mixins.css';
	.rounded-number {
		border-radius: 25px;
		transition: all ease 0.1s;
		-webkit-transition: all ease 0.1s;
		-ms-transition: all ease 0.1s;
	}
</style>
