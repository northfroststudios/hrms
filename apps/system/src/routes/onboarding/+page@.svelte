<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Helper, Input, Label, Radio, Spinner } from 'flowbite-svelte';
	import { Puzzle } from 'lucide-svelte';
	import { Dropzone } from 'flowbite-svelte';
	import ErrorNotice from '../(auth)/_components/error-notice.svelte';

	export let form;
	let isLoading = false;
	let company_status = '';

	let value: string[] = [];
	const dropHandle = (event: DragEvent) => {
		value = [];
		event.preventDefault();
		if (!event.dataTransfer) return;

		if (event.dataTransfer.items) {
			[...event.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					if (file) {
						value.push(file.name);
						value = value;
					}
				}
			});
		} else {
			[...event.dataTransfer.files].forEach((file, i) => {
				value = [...value, file.name];
			});
		}
	};

	const handleChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const files = input.files;
		if (files && files.length > 0) {
			value = [...value, files[0].name];
		}
	};

	const showFiles = (files: string[]) => {
		if (files.length === 1) return files[0];
		let concat = '';
		files.map((file) => {
			concat += file;
			concat += ',';
			concat += ' ';
		});

		if (concat.length > 40) concat = concat.slice(0, 40);
		concat += '...';
		return concat;
	};

	$: ({ field_errors, message } = form ?? {
		message: '',
		field_errors: {
			company_code: null,
			company_name: null,
			company_logo: null
		}
	});
</script>

<svelte:head>
	<title>HRMS | Onboarding</title>
</svelte:head>

<section class="bg-white">
	<div class="flex items-center justify-center border-b p-5">
		<a href="/"><Puzzle class="stroke-primary-700" /></a>
	</div>
	<br>
	<div class="max-w-xl mx-auto">
		<div>
			<h3 class="styled-heading text-2xl font-semibold">Welcome to HRMS!</h3>
			<p class="mt-2 text-neutral-400">Let's get you started.</p>
		</div>
		<br>
		<div class="space-y-5">
			{#if message}
				<ErrorNotice error={message} />
			{/if}
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
				enctype="multipart/form-data"
			>
				<div>
					<Label class="text-primary-base space-y-3">
						<span>Employment Status</span>
						<Radio bind:group={company_status} value="employer">
							I'm registering as a company representative
						</Radio>
						<Radio bind:group={company_status} value="employee">
							I'm an employee joining my company
						</Radio>
					</Label>
					<Helper id="helper-checkbox-text" class="text-primary-400 mt-3">
						Choose the appropriate option based on your role within the company.
					</Helper>
				</div>
				{#if company_status === 'employer'}
					<div class="space-y-5">
						<div>
							<Label class="text-primary-base space-y-2">
								<span>Company Name</span>
								<Input size="md" name="company_name" />
							</Label>
							{#if field_errors?.company_name}
								<small class="mt-2 text-sm text-red-500" id="company_name-error">
									{field_errors?.company_name}
								</small>
							{/if}
							<Helper id="helper-checkbox-text" class="text-primary-400 mt-2">
								A company will be created with this name after you complete onboarding.
							</Helper>
						</div>
						<div>
							<Label class="text-primary-base space-y-2">
								<span>Company Logo</span>
								<Dropzone
									id="dropzone"
									name="company_logo"
									on:drop={dropHandle}
									on:dragover={(event) => {
										event.preventDefault();
									}}
									on:change={handleChange}
								>
									<svg
										aria-hidden="true"
										class="mb-3 h-10 w-10 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
										/></svg
									>
									{#if value.length === 0}
										<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span class="font-semibold">Click to upload</span> or drag and drop
										</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											SVG, PNG, JPG or GIF (MAX. 800x400px)
										</p>
									{:else}
										<p>{showFiles(value)}</p>
									{/if}
								</Dropzone>
							</Label>
							{#if field_errors?.company_logo}
								<small class="mt-2 text-sm text-red-500" id="company_logo-error">
									{field_errors?.company_logo}
								</small>
							{/if}
						</div>
					</div>
				{/if}
				{#if company_status === 'employee'}
					<div>
						<div>
							<Label class="text-primary-base space-y-2">
								<span>Company Code</span>
								<Input size="md" name="company_code" />
							</Label>
							{#if field_errors?.company_code}
								<small class="mt-2 text-sm text-red-500" id="company_code-error">
									{field_errors?.company_code}
								</small>
							{/if}
							<Helper id="helper-checkbox-text" class="text-primary-400 mt-2">
								Enter the company code provided by your company.
							</Helper>
						</div>
					</div>
				{/if}
				<Button class="w-full" type="submit" disabled={isLoading}>
					{#if isLoading}
						<Spinner class="mr-3" size="4" color="white" />
					{/if}
					{isLoading ? 'Completing Onboarding...' : 'Complete Onboarding'}
				</Button>
			</form>
		</div>
	</div>
</section>
