<script>
	import '../app.css';
</script>

<div class="container">
	<slot />
</div>

<style>
	.container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #2f2f2f;
	}
</style>
