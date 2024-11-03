<script lang="ts">
	import { cn } from '$lib/cn.js';
	import { fromBaseForm, getTimeAgo } from '$lib/utils';
	import { Button } from 'flowbite-svelte';
	import { Banknote, Clock, MapPin } from 'lucide-svelte';
	import styles from '../[id]/styles.module.css';

	export let data;

	$: ({ data: job_detail } = data.job_detail);
</script>

<svelte:head>
	<title>{job_detail?.title} | HRMS</title>
</svelte:head>

<section>
	<div class="border-b p-3 lg:p-5">
		<h2 class="font-semibold">Job Details</h2>
	</div>
	<div class="px-5 py-10 max-w-screen-xl mx-auto">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="mb-3 flex items-center gap-3 font-semibold lg:text-xl">
					{job_detail?.title}
					<span
						class={cn('rounded-full border px-4 py-1 text-xs font-normal', {
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
							}).format(fromBaseForm(job_detail?.compensation!))}</span
						>
					</div>
				</div>
			</div>
			<div class="flex gap-3 items-center">
				<Button class="sm" outline>Edit Listing</Button>
				<Button class="sm" color="red" outline>Delete Listing</Button>
			</div>
		</div>
        <br>
		<div class={styles.listing}>
			{@html job_detail?.description}
		</div>
	</div>
</section>
