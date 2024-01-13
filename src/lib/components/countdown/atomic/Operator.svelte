<script>
	export let label = undefined;
	let bgColor = '#75BEDF';
</script>

<div class="rounded-number number" style:--bg={bgColor}>
	<p class="number-text">{label ?? ''}</p>
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
