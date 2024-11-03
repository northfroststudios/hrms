<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/cn.js';
	import { fromBaseForm, getTimeAgo } from '$lib/utils';
	import { Button, Modal, Spinner } from 'flowbite-svelte';
	import { Banknote, Clock, MapPin } from 'lucide-svelte';
	import styles from '../[id]/styles.module.css';

	let openDeleteModal = false;
	let isLoading = false;

	export let data;
	$: ({ data: job_detail } = data.job_detail);
</script>

<svelte:head>
	<title>{job_detail?.title} | HRMS</title>
</svelte:head>

<section>
	<div class="border-b p-3 lg:p-5">
		<h2 class="font-bold lg:text-xl tracking-tight">Job Details</h2>
	</div>
	<div class="mx-auto max-w-screen-lg px-5 py-10">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
			<div>
				<h3 class="mb-3 flex items-center gap-3 font-bold lg:text-xl tracking-tight">
					{job_detail?.title}
					<span
						class={cn('rounded-full border px-4 py-1 text-xs font-normal tracking-normal', {
							'border-green-700 bg-green-200 text-green-700': job_detail?.is_published === true,
							'border-red-700 bg-red-200 text-red-700': job_detail?.is_published === false
						})}>• {job_detail?.is_published ? 'Open' : 'Closed'}</span
					>
				</h3>
				<div class="flex items-center gap-5">
					<div class="flex items-center gap-2">
						<Clock class="size-4 stroke-neutral-500" />
						<span class="text-sm text-neutral-500">{getTimeAgo(job_detail?.created_at!)} ago</span>
					</div>
					<div class="flex items-center gap-2">
						<MapPin class="size-4 stroke-neutral-500" />
						<span class="text-sm text-neutral-500">{job_detail?.location}</span>
					</div>
					<div class="flex items-center gap-2">
						<Banknote class="size-4 stroke-neutral-500" />
						<span class="text-sm text-neutral-500"
							>{new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'GHS',
								minimumFractionDigits: 0,
								maximumFractionDigits: 0
							}).format(fromBaseForm(job_detail?.compensation! * 12))}/yr </span
						>
					</div>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<Button type="button" size="xs" outline on:click={() => goto(`/jobs/${job_detail?.id}/edit`)}
					>Edit Listing</Button
				>
				<Button size="xs" color="red" outline on:click={() => (openDeleteModal = true)}
					>Delete Listing</Button
				>
				<Modal title="Delete Listing?" bind:open={openDeleteModal} outsideclose={true}>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						Are you sure you want to delete this listing? This action cannot be undone, and all
						associated data will be permanently removed.
					</p>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						Please confirm if you wish to proceed with deleting this listing. If you are unsure, you
						can cancel this action.
					</p>
					<svelte:fragment slot="footer">
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								isLoading = true;
								return async ({ update }) => {
									await update();
									isLoading = false;
									openDeleteModal = false;
								};
							}}
							class="flex gap-3"
						>
							<Button type="submit" size="xs" color="red" disabled={isLoading}>
								{#if isLoading}
									<Spinner class="mr-3" size="4" color="white" />
								{/if}
								{isLoading ? 'Deleting...' : 'Delete'}
							</Button>
							<Button
								type="button"
								size="xs"
								color="alternative"
								on:click={() => (openDeleteModal = false)}
							>
								Cancel
							</Button>
						</form>
					</svelte:fragment>
				</Modal>
			</div>
		</div>
		<br />
		<div class={styles.listing}>
			{@html job_detail?.description}
		</div>
	</div>
</section>
