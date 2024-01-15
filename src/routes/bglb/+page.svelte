<script lang="ts">
	import { browser } from '$app/environment';
	import Login from '$lib/components/Login.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	let supabaseAuth;
	let currentUser = undefined;
	$: if (!currentUser && supabaseAuth) {
		supabase
			.from('bglb_users')
			.select('*')
			.then(({ data, error }) => {
				if (data.length == 0) {
					supabase
						.from('bglb_users')
						.insert({})
						.then(({ data, error }) => {});
				}
				currentUser = supabaseAuth.user;
			});
	}
</script>

{#if browser}
	<div class="container">
		{#if !supabaseAuth}
			<Login redirectUrl="" bind:supabaseAuth />
		{:else}
			<div class="grid"></div>
		{/if}
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

	.grid {
	}
	.header {
		align-self: center;
	}
</style>
