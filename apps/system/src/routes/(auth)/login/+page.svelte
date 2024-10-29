<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Label, Spinner } from 'flowbite-svelte';
	import { Eye, EyeOff, Puzzle } from 'lucide-svelte';
	import ErrorNotice from '../_components/error-notice.svelte';

	let togglePassword = false;
	let isLoading = false;

	export let form;
	$: ({ message, field_errors } = form ?? {
		message: '',
		field_errors: {
			email: null,
			password: null
		}
	});
</script>

<svelte:head>
	<title>HRMS | Login</title>
</svelte:head>

<section class="min-h-screen w-full">
	<div class="flex items-center justify-center border-b p-5">
		<a href="/"><Puzzle class="stroke-primary-700" /></a>
	</div>
	<div class="w-full py-16">
		<div class="mx-auto max-w-lg space-y-5 px-6">
			<div>
				<h3 class="styled-heading text-2xl font-semibold text-primary-700">Welcome back!</h3>
				<p class="mt-2 text-neutral-500">Log in to continue to HRMS</p>
			</div>
			{#if message}
				<ErrorNotice error={message} />
			{/if}
			<div>
				<form
					use:enhance={() => {
						isLoading = true;

						return async ({ update }) => {
							await update();
							isLoading = false;
						};
					}}
					class="space-y-5"
					method="POST"
					action="?/login"
				>
					<div>
						<Label class="space-y-2 text-primary-700">
							<span>Email</span>
							<Input size="md" name="email" disabled={isLoading} />
						</Label>
						{#if field_errors?.email}
							<small class="mt-2 text-sm text-red-500" id="email-error">{field_errors?.email}</small
							>
						{/if}
					</div>

					<div>
						<Label class="mb-2 text-primary-700">
							<span>Password</span>
						</Label>
						<Input
							id="show-password"
							type={togglePassword ? 'text' : 'password'}
							size="md"
							name="password"
							disabled={isLoading}
						>
							<button
								slot="right"
								on:click={(event) => {
									event.preventDefault();
									togglePassword = !togglePassword;
								}}
								type="button"
								class="focus:outline-none"
								disabled={isLoading}
							>
								{#if togglePassword}
									<Eye class="h-5 w-5" />
								{:else}
									<EyeOff class="h-5 w-5" />
								{/if}
							</button>
						</Input>
						{#if field_errors?.password}
							<small class="mt-2 text-sm text-red-500" id="password-error"
								>{field_errors?.password}</small
							>
						{/if}
					</div>
					<a href="/forgot-password" class="inline-block text-sm text-primary-700 hover:underline"
						>Forgot Password?</a
					>
					<Button class="w-full" type="submit" disabled={isLoading}>
						{#if isLoading}
							<Spinner class="mr-3" size="4" color="white" />
						{/if}
						{isLoading ? 'Signing In...' : 'Sign In'}
					</Button>
					<p class="text-sm text-neutral-500">
						By signing in, you agree to the <a
							href="/terms"
							class="text-primary-700 hover:underline">Terms of Service</a
						>
						and
						<a href="/privacy" class="text-primary-700 hover:underline">Privacy Policy</a>.
					</p>
					<span class="inline-block text-sm text-neutral-500"
						>Don't have an account? <a href="/register" class="text-primary-700 hover:underline"
							>Sign Up</a
						></span
					>
				</form>
			</div>
		</div>
	</div>
</section>
