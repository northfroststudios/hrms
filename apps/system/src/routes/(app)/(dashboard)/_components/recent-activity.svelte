<script lang="ts">
	import { getTimeAgo } from '$lib/utils';
	import { Zap } from 'lucide-svelte';

	type ActivityLog = {
		action: string;
		company_id: string;
		created_at: string;
		id: string;
		user_id: string;
	};

	export let recentActivityLogs: ActivityLog[];
</script>

<div class="col-span-5 rounded-lg border lg:col-span-2">
	<div class="rounded-t-lg p-3">
		<h3 class="font-semibold">Recent Activity</h3>
	</div>
	{#if recentActivityLogs && recentActivityLogs.length > 0}
		<div
			class="flex max-h-72 flex-col gap-3 overflow-y-auto rounded-b-lg border-t bg-[#f7fafb] p-3"
		>
			{#each recentActivityLogs as activity}
				<div class="flex cursor-pointer items-center gap-3">
					<div class="bg-primary-50 rounded-full p-2">
						<Zap class="text-primary-700 size-4" />
					</div>
					<div>
						<p class="text-sm lowercase text-neutral-500">
							<span class="font-semibold capitalize text-black">John Wick</span>
							{activity.action}
						</p>
						<p class="text-xs text-neutral-500">{getTimeAgo(activity.created_at)}</p>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex max-h-72 flex-col gap-3 overflow-y-auto rounded-b-lg border-t bg-[#f7fafb] p-3">
			<p class="text-sm text-neutral-500 text-center">No recent activity logs found</p>
		</div>
	{/if}
</div>
