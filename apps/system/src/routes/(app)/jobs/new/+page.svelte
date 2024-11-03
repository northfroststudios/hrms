<script lang="ts">
	import { enhance } from '$app/forms';
	import RichText from '$lib/components/ui/rich-text.svelte';
	import { Button, Input, Label, Spinner, Textarea } from 'flowbite-svelte';

	let togglePassword = false;
	let isLoading = false;

	export let form;
	let message = '';
	let field_errors = {
		title: null,
		location: null,
		compensation: null,
		description: null
	};

	$: if (form) {
		message = form.message || '';
		field_errors = { ...field_errors, ...form.field_errors };
	}
</script>

<svelte:head>
	<title>Create a Job Listing | HRMS</title>
</svelte:head>

<section>
	<div class="border-b p-3 lg:p-5">
		<h2 class="font-semibold">Create a Job Posting</h2>
	</div>
	<div class="mx-auto max-w-screen-md py-16 px-8">
		<form
			use:enhance={() => {
				isLoading = true;
				return async ({ update }) => {
					await update();
					isLoading = false;
				};
			}}
			class="space-y-12"
			method="POST"
		>
			<div class="space-y-5">
				<p class="mb-3 text-xs uppercase tracking-wide text-neutral-400">Job Data</p>
				<div>
					<Label class="text-primary-700 space-y-2">
						<span>Title</span>
						<Input size="md" name="title" disabled={isLoading} />
					</Label>
					{#if field_errors.title}
						<small class="mt-2 text-sm text-red-500" id="title-error">{field_errors.title}</small>
					{/if}
				</div>
				<div>
					<Label class="text-primary-700 space-y-2">
						<span>Location</span>
						<Input size="md" name="location" disabled={isLoading} />
					</Label>
					{#if field_errors.location}
						<small class="mt-2 text-sm text-red-500" id="location-error"
							>{field_errors.location}</small
						>
					{/if}
				</div>
				<div>
					<Label class="text-primary-700 space-y-2">
						<span>Compensation</span>
						<Input size="md" name="compensation" disabled={isLoading} />
					</Label>
					{#if field_errors.compensation}
						<small class="mt-2 text-sm text-red-500" id="compensation-error"
							>{field_errors.compensation}</small
						>
					{/if}
				</div>
			</div>

			<div class="space-y-5">
				<p class="mb-3 text-xs uppercase tracking-wide text-neutral-400">Job Details</p>
				<div class="space-y-2">
					<Label class="text-primary-700">
						<span>Description</span>
					</Label>
					<RichText />
					{#if field_errors.description}
						<small class="mt-2 text-sm text-red-500" id="description-error"
							>{field_errors.description}</small
						>
					{/if}
				</div>
			</div>

			<Button type="submit" disabled={isLoading} size="sm">
				{#if isLoading}
					<Spinner class="mr-3" size="4" color="white" />
				{/if}
				{isLoading ? 'Creating Listing...' : 'Create Listing'}
			</Button>
		</form>
	</div>
</section>
