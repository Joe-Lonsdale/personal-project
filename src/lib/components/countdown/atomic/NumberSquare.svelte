<script>
	export let label = undefined;
	export let selected = false;
	export let used = false;
	let bgColor = '#3982A3';
	$: if (used) {
		if (selected) bgColor = '#7E5116';
		else bgColor = '#BA8D52';
	} else {
		if (selected) bgColor = '#004667';
		else bgColor = '#3982A3';
	}
</script>

<div
	class="square-number number"
	class:number-selected={selected}
	style:--bg={bgColor}
	on:click={() => {
		selected = !selected;
	}}
>
	<p class="number-text" class:number-text-selected={selected}>{label ?? ''}</p>
</div>

<style>
	@import './mixins.css';
	.square-number {
		transition: all ease 0.1s;
		-webkit-transition: all ease 0.1s;
		-ms-transition: all ease 0.1s;
	}
</style>
