<script lang="ts">
	import type { Database } from '$lib/supabase/database.types.js';
	import { fromBaseForm, getFirstUUIDPart, getTimeAgo } from '$lib/utils';
	import {
		Button,
		Dropdown,
		DropdownItem,
		Input,
		Radio,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { FolderSearch, MoveUpRight, Search, SlidersHorizontal } from 'lucide-svelte';

	type Jobs = Database['public']['Tables']['jobs']['Row'];

	let searchQuery = '';
	let filterParameter: keyof Jobs = 'title';

	export let data;

	$: ({ data: jobs } = data.jobs);
	$: filteredListings =
		jobs &&
		jobs.filter((listing) =>
			listing[filterParameter].toString().toLowerCase().includes(searchQuery.toLowerCase())
		);
</script>

<svelte:head>
	<title>Job Postings | HRMS</title>
</svelte:head>

<section>
	<div class="border-b p-3 lg:p-5">
		<h2 class="font-semibold">Job Postings</h2>
	</div>
	<div class="my-5 flex items-center justify-between px-5 py-2.5">
		<div class="flex w-[60%] items-center gap-5 lg:w-[40%]">
			<Input
				type="search"
				id="first_name"
				placeholder="Search for a listing"
				size="md"
				bind:value={searchQuery}
			>
				<Search slot="left" class="h-4 w-4" />
			</Input>
			<div>
				<button class="rounded border px-4 py-2 hover:bg-neutral-200">
					<SlidersHorizontal class="size-4" />
				</button>
				<Dropdown>
					<DropdownItem>
						<Radio name="example1" value="title" bind:group={filterParameter}>Search by title</Radio
						>
					</DropdownItem>
					<DropdownItem>
						<Radio name="example1" value="location" bind:group={filterParameter}
							>Search by location</Radio
						>
					</DropdownItem>
				</Dropdown>
			</div>
		</div>
		<div>
			<Button size="sm" href="/jobs/new">Add Listing</Button>
		</div>
	</div>
	{#if filteredListings && filteredListings.length > 0}
		<div>
			<Table hoverable>
				<TableHead>
					<TableHeadCell>#</TableHeadCell>
					<TableHeadCell>Title</TableHeadCell>
					<TableHeadCell>Location</TableHeadCell>
					<TableHeadCell>Compensation</TableHeadCell>
					<TableHeadCell>Date Posted</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each filteredListings as job}
						<TableBodyRow>
							<TableBodyCell
								><a href={`/jobs/${job.id}`} class="hover:text-primary-base flex items-center gap-1"
									>{getFirstUUIDPart(job.id)}<MoveUpRight class="size-3" />
								</a></TableBodyCell
							>
							<TableBodyCell>{job.title}</TableBodyCell>
							<TableBodyCell>{job.location}</TableBodyCell>
							<TableBodyCell>{fromBaseForm(job.compensation)}</TableBodyCell>
							<TableBodyCell>{getTimeAgo(job.created_at)} ago</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-32 text-center">
			<FolderSearch class="stroke-primary-700 size-32" />
			{#if searchQuery}
				<p class="text-lg text-neutral-500">
					{filterParameter === 'title'
						? `No job postings found with title "${searchQuery}"`
						: `No job postings found in location "${searchQuery}"`}
				</p>
			{:else}
				<p class="text-lg text-neutral-500">No job postings available.</p>
			{/if}
		</div>
	{/if}
</section>
