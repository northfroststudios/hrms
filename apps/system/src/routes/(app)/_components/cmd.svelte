<script lang="ts">
	import { goto } from '$app/navigation';
	import { Command } from 'cmdk-sv';
	import { BriefcaseBusiness, Calendar, DollarSign, History, UserPlus } from 'lucide-svelte';

	let isOpen = false;

	type CommandItem = {
		title: string;
		href: string;
		icon: typeof BriefcaseBusiness;
	};

	type CommandGroup = {
		label: string;
		items: CommandItem[];
	};

	const commandGroups: CommandGroup[] = [
		{
			label: 'Jobs',
			items: [
				{ title: 'Create a Job Listing', href: '/jobs/new', icon: BriefcaseBusiness },
				{ title: 'View All Jobs', href: '/jobs', icon: BriefcaseBusiness }
			]
		},
		{
			label: 'HR',
			items: [
				{ title: 'New Employee Onboarding', href: '/jobs/new', icon: UserPlus },
				{ title: 'Time Off Requests', href: '/jobs', icon: Calendar }
			]
		},
		{
			label: 'Payroll',
			items: [
				{ title: 'Process Payroll', href: '/payroll/process', icon: DollarSign },
				{ title: 'View Payroll History', href: '/payroll/history', icon: History }
			]
		}
	];

	function toggleDialog() {
		isOpen = !isOpen;
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			toggleDialog();
		}
	}

	function handleSelect(href?: string) {
		isOpen = false;
		if (href) {
			goto(href);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<button
	on:click={toggleDialog}
	class="flex w-full items-center justify-between gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-500 hover:bg-stone-50"
>
	<span>Search...</span>
	<span class="rounded border px-1 text-xs">⌘K</span>
</button>

<Command.Dialog
	label="Command Menu"
	open={isOpen}
	onOpenChange={(open) => (isOpen = open)}
	class="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-stone-200 bg-white p-2 shadow-2xl"
>
	<Command.Input
		class="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
		placeholder="Type a command or search..."
	/>
	<Command.List class="mt-5 max-h-[300px] overflow-y-auto">
		<Command.Empty class="py-6 text-center text-sm text-stone-500">No results found.</Command.Empty>

		{#each commandGroups as group}
			<Command.Group>
				<div class="mb-2 px-4 text-xs font-medium uppercase tracking-wide text-neutral-400">
					{group.label}
				</div>
				{#each group.items as item}
					<Command.Item
						onSelect={() => handleSelect(item.href)}
						class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm text-stone-900 hover:bg-stone-100"
					>
						<svelte:component this={item.icon} class="size-4 text-gray-500" />
						{item.title}
					</Command.Item>
				{/each}
			</Command.Group>
			<br />
		{/each}
	</Command.List>
</Command.Dialog>

