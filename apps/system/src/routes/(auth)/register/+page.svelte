<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Label, Spinner } from 'flowbite-svelte';
	import { Eye, EyeOff, Puzzle } from 'lucide-svelte';
	import ErrorNotice from '../_components/error-notice.svelte';

	let togglePassword = false;
	let toggleConfirmPassword = false;
	let isLoading = false;

	export let form;
	$: ({ message, field_errors } = form ?? {
		message: '',
		field_errors: {
			name: null,
			email: null,
			password: null,
			confirm_password: null
		}
	});
</script>

<svelte:head>
	<title>HRMS | Create an account</title>
</svelte:head>

<section class="min-h-screen w-full">
	<div class="flex items-center justify-center border-b p-5">
		<a href="/"><Puzzle class="stroke-primary-700" /></a>
	</div>
	<div class="w-full py-16">
		<div class="mx-auto max-w-lg space-y-5 px-6">
			<div>
				<h3 class="styled-heading text-primary-700 text-2xl font-semibold">Welcome to HRMS!</h3>
				<p class="mt-2 text-neutral-500">Create an account to use HRMS</p>
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
					action="?/register"
				>
					<div>
						<Label class="text-primary-700 space-y-2">
							<span>Full Name</span>
							<Input size="md" name="name" disabled={isLoading} />
						</Label>
						{#if field_errors?.name}
							<small class="mt-2 text-sm text-red-500" id="name-error">{field_errors?.name}</small>
						{/if}
					</div>
					<div>
						<Label class="text-primary-700 space-y-2">
							<span>Email</span>
							<Input size="md" name="email" disabled={isLoading} />
						</Label>
						{#if field_errors?.email}
							<small class="mt-2 text-sm text-red-500" id="email-error">{field_errors?.email}</small
							>
						{/if}
					</div>
					<div>
						<Label class="text-primary-700 mb-2">
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
					<div>
						<Label class="text-primary-700 mb-2">
							<span>Confirm Password</span>
						</Label>
						<Input
							id="show-confirm-password"
							type={toggleConfirmPassword ? 'text' : 'password'}
							size="md"
							name="confirm_password"
							disabled={isLoading}
						>
							<button
								slot="right"
								on:click={(event) => {
									event.preventDefault();
									toggleConfirmPassword = !toggleConfirmPassword;
								}}
								type="button"
								class="focus:outline-none"
								disabled={isLoading}
							>
								{#if toggleConfirmPassword}
									<Eye class="h-5 w-5" />
								{:else}
									<EyeOff class="h-5 w-5" />
								{/if}
							</button>
						</Input>
						{#if field_errors?.confirm_password}
							<small class="mt-2 text-sm text-red-500" id="confirm_password-error"
								>{field_errors?.confirm_password}</small
							>
						{/if}
					</div>
					<Button class="w-full" type="submit" disabled={isLoading}>
						{#if isLoading}
							<Spinner class="mr-3" size="4" color="white" />
						{/if}
						{isLoading ? 'Signing Up...' : 'Sign Up'}
					</Button>
					<p class="text-sm text-neutral-500">
						By signing up, you agree to the <a
							href="/terms"
							class="text-primary-700 hover:underline">Terms of Service</a
						>
						and
						<a href="/privacy" class="text-primary-700 hover:underline">Privacy Policy</a>.
					</p>
					<span class="inline-block text-sm text-neutral-500"
						>Already have an account? <a href="/login" class="text-primary-700 hover:underline"
							>Sign In</a
						></span
					>
				</form>
			</div>
		</div>
	</div>
</section>
