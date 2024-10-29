<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Label, Spinner } from 'flowbite-svelte';
	import { Puzzle } from 'lucide-svelte';
	import ErrorNotice from '../_components/error-notice.svelte';
	import SuccessNotice from '../_components/success-notice.svelte';

	let isLoading = false;

	export let form;
	$: ({ message, field_errors, success } = form ?? {
		message: '',
		field_errors: {
			email: null
		},
		success: ''
	});
</script>

<svelte:head>
	<title>HRMS | Forgot Password</title>
</svelte:head>

<section class="min-h-screen w-full">
	<div class="flex items-center justify-center border-b p-5">
		<a href="/"><Puzzle class="stroke-primary-700" /></a>
	</div>
	<div class="w-full py-16">
		<div class="mx-auto max-w-lg space-y-5 px-6">
			<div>
				<h3 class="styled-heading text-2xl font-semibold text-primary-700">
					Forgot your password?
				</h3>
				<p class="mt-2 text-neutral-500">
					No worries. Provide your email, and we will send you reset instructions.
				</p>
			</div>
			{#if message}
				<ErrorNotice error={message} />
			{/if}
			{#if success}
				<SuccessNotice message={success} />
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
					<Button class="w-full" type="submit" disabled={isLoading}>
						{#if isLoading}
							<Spinner class="mr-3" size="4" color="white" />
						{/if}
						{isLoading ? 'Sending Reset Instructions...' : 'Send Reset Instructions'}
					</Button>
					<a href="/login" class="inline-block text-sm text-primary-700 hover:underline"
						>I remember my password</a
					>
				</form>
			</div>
		</div>
	</div>
</section>
