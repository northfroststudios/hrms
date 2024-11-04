<script lang="ts">
	import { enhance } from '$app/forms';
	import RichText from '$lib/components/ui/rich-text.svelte';
	import { fromBaseForm } from '$lib/utils.js';
	import { Button, Input, Label, Spinner, Select } from 'flowbite-svelte';
	import ErrorNotice from '../../../../(auth)/_components/error-notice.svelte';

	let isLoading = false;
	let description = '';

	export let form;
	let message = '';
	let field_errors = {
		title: null,
		location: null,
		compensation: null,
		description: null,
		job_type: null
	};

	$: if (form) {
		message = form.message || '';
		field_errors = { ...field_errors, ...form.field_errors };
	}

	export let data;
	$: ({ data: job_detail } = data.job_detail);

	function handleRichTextChange(content: string) {
		description = content;
	}
</script>

<svelte:head>
	<title>Edit a Job Listing | HRMS</title>
</svelte:head>

<section>
	<nav class="p-5" aria-label="Breadcrumb">
		<ol class="flex items-center space-x-2">
			<li>
				<a href="/jobs" class="text-sm font-medium text-gray-500 hover:text-gray-700">Jobs</a>
			</li>
			<li>
				<span class="text-sm font-medium text-gray-500">/</span>
			</li>
			<li>
				<span class="text-sm font-medium text-gray-500">Edit: {job_detail?.title}</span>
			</li>
		</ol>
	</nav>
	<div class="mx-auto max-w-screen-md px-8 py-8">
		{#if message}
			<div class="mb-5">
				<ErrorNotice error={message} />
			</div>
		{/if}
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
						<Input size="md" name="title" disabled={isLoading} value={job_detail?.title} />
					</Label>
					{#if field_errors.title}
						<small class="mt-2 text-sm text-red-500" id="title-error">{field_errors.title}</small>
					{/if}
				</div>
				<div>
					<Label class="text-primary-700 space-y-2">
						<span>Location</span>
						<Input size="md" name="location" disabled={isLoading} value={job_detail?.location} />
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
						<Input
							size="md"
							name="compensation"
							disabled={isLoading}
							value={fromBaseForm(job_detail?.compensation!)}
						/>
					</Label>
					{#if field_errors.compensation}
						<small class="mt-2 text-sm text-red-500" id="compensation-error"
							>{field_errors.compensation}</small
						>
					{/if}
				</div>
				<div>
					<Label class="text-primary-700 space-y-2">
						<span>Job Type</span>
						<Select name="job_type" class="mt-1 block w-full" disabled={isLoading}>
							<option value="fulltime">Full-time</option>
							<option value="parttime">Part-time</option>
							<option value="internship">Internship</option>
							<option value="contract">Contract</option>
							<option value="volunteer">Volunteer</option>
						</Select>
					</Label>
					{#if field_errors.job_type}
						<small class="mt-2 text-sm text-red-500" id="job_type-error"
							>{field_errors.job_type}</small
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
					<RichText value={job_detail?.description} onChange={handleRichTextChange} />
					<!-- Add a hidden input to include the content in the form submission -->
					<Input type="hidden" name="description" value={job_detail?.description} />
					{#if field_errors.description}
						<small class="mt-2 text-sm text-red-500" id="description-error"
							>{field_errors.description}</small
						>
					{/if}
				</div>
			</div>

			<Button type="submit" disabled={isLoading} size="xs">
				{#if isLoading}
					<Spinner class="mr-3" size="4" color="white" />
				{/if}
				{isLoading ? 'Editing Listing...' : 'Edit Listing'}
			</Button>
		</form>
	</div>
</section>
