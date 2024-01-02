<script lang="ts">
	import { browser } from '$app/environment';
	import Login from '$lib/components/Login.svelte';
	let supabaseAuth;
</script>

{#if browser}
	<div class="container">
		<Login redirectUrl="" bind:supabaseAuth />
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
	}
	.header {
		align-self: center;
	}
</style>
