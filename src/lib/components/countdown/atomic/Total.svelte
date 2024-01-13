<script>
	export let label = '';
	export let used = false;
	export let target = false;
	export let invalid = false;
	let bgColor = '#BA8D52';
	$: if (!target && !invalid) {
		if (used) bgColor = '#7E5116';
		else bgColor = '#BA8D52';
	} else if (target) bgColor = '#55977B';
	else if (invalid) bgColor = '#F26279';
</script>

<div class="total" style:--bg={bgColor} class:total-target={target} class:total-invalid={invalid}>
	<p class="number-text">{label ?? ''}</p>
</div>

<style>
	@import './mixins.css';
</style>
