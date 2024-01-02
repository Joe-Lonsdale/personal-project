<script>
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	export let redirectUrl;
	export let authenticated = false;
	export let supabaseAuth = undefined;
	let email = '';
	let password = '';
	let error = null;
	let loading = false;
	let forgottenPassword = false;
	let sentResetEmail = false;
	let sentSignupEmail = false;
	let rememberMe = false;

	onMount(async () => {
		const { data, error } = await supabase.auth.getSession();
		if (data.session && !error) {
			supabaseAuth = { session: data.session, user: data.session.user };
		}
	});

	async function handleLogin() {
		error = '';
		if (forgottenPassword) {
			handleResetPassword();
			return;
		}
		try {
			loading = true;
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			else {
				supabaseAuth = data;
				authenticated = true;
			}
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	async function handleSignup() {
		try {
			loading = true;
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${$page.url.origin}/${redirectUrl}`
				}
			});
			if (error) throw error;
			else {
				sentSignupEmail = true;
			}
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
	async function handleResetPassword() {
		const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${$page.url.origin}/auth/reset-password/?next=${redirectUrl}`
		});
		if (err) error = err.message;
		else {
			sentResetEmail = true;
		}
	}
</script>

<div class="container">
	{#if sentResetEmail}
		<p>If an account for {email} exists, we've sent you an email to reset your password</p>
	{:else if sentSignupEmail}
		<p>Check your emails for verification to create your account.</p>
	{:else}
		<form on:submit|preventDefault={handleLogin}>
			<input type="email" bind:value={email} required={true} placeholder="Email" />
			{#if !forgottenPassword}
				<input type="password" bind:value={password} required={true} placeholder="Password" />
			{/if}
			{#if error}
				<p style="color: red;">{error}</p>
			{/if}

			<button type="submit" class="login" disabled={loading}
				>{forgottenPassword ? 'Reset Password' : 'Login'}</button
			>
			{#if !forgottenPassword}
				<button type="button" class="signup" on:click={handleSignup} disabled={loading}
					>Sign Up</button
				>
			{/if}
		</form>
		<button
			on:click={() => {
				forgottenPassword = !forgottenPassword;
				error = '';
			}}
			class="forgot-password">{forgottenPassword ? 'Sign in' : 'Forgot password?'}</button
		>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
		padding: 2rem;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		background: #fff;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	input[type='email'],
	input[type='password'],
	button {
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
	}

	button {
		background-color: var(--primary);
		color: white;
		border: none;
		cursor: pointer;
		transition: background-color 0.25s ease;
	}

	button:hover,
	button:focus {
		filter: brightness(105%);
	}

	.forgot-password {
		text-align: right;
		font-size: 1rem;
		margin-top: 1rem;
		padding: unset;
		background-color: unset;
		color: black;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.container {
			width: 90%;
			padding: 1rem;
		}
	}
</style>
