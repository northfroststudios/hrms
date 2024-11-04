<script>
	import { cn } from '$lib/cn';
	import {
		BriefcaseBusiness,
		Building2,
		Calendar,
		TrendingDown,
		TrendingUp,
		Users
	} from 'lucide-svelte';

	export let data;
	const stats = [
		{
			title: 'Total Employees',
			value: data.activeMemberships?.length,
			trend: data.trends.employees,
			color: 'text-blue-600',
			icon: Users
		},
		{
			title: 'Open Positions',
			value: data.openPositions?.length,
			trend: data.trends.jobs,
			color: 'text-purple-600',
			icon: BriefcaseBusiness
		},
		{
			title: 'Time Off Requests',
			value: '8',
			trend: '-5',
			color: 'text-orange-600',
			icon: Calendar
		},
		{ title: 'Departments', value: '8', trend: '-5', color: 'text-green-600', icon: Building2 }
	];
</script>

<svelte:head>
	<title>Dashboard | HRMS</title>
</svelte:head>
<section>
	<div class="p-5">
		<h2 class="text-lg font-bold tracking-tight">Dashboard</h2>
		<p class="text-sm text-gray-500">
			{new Date().toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>
	</div>
	<div class="px-5 py-2.5">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each stats as { title, value, trend, color, icon }}
				<div class="rounded-lg bg-[#f7fafb]">
					<div class="rounded-lg border bg-white p-3 shadow-sm">
						<div class="flex items-center gap-2">
							<div class="rounded-full border p-1">
								<svelte:component this={icon} class="size-4  text-gray-500" />
							</div>
							<p class="text-sm font-medium tracking-tight text-gray-600">{title}</p>
						</div>
						<div class="mt-5 flex items-baseline justify-between">
							<p class="text-primary-700 text-3xl font-semibold">{value}</p>
						</div>
					</div>
					<div class="flex items-center justify-between p-3">
						<div class="flex items-center gap-1">
							<svelte:component
								this={trend.startsWith('+') ? TrendingUp : TrendingDown}
								class={cn('size-4', trend.startsWith('+') ? 'text-green-500' : 'text-red-500')}
							/>
							<span
								class={cn('text-sm', trend.startsWith('+') ? 'text-green-500' : 'text-red-500')}
							>
								{trend}
							</span>
						</div>
						<div>
							<p class="text-xs text-gray-500">Compared to last month</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
			<!-- Quick Actions -->
		</div>
	</div>
</section>
