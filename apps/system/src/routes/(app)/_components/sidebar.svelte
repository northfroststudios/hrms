<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/cn';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { Puzzle, Menu, X } from 'lucide-svelte';
	import { NAV_LINKS } from './sidebar-links';

	export let user = {
		full_name: '',
		company_name: ''
	};

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<div class="flex flex-col overflow-y-scroll border-b bg-[#fdfdfd] p-3 lg:h-full lg:border-r">
	<div class="space-y-5">
		<div class="flex items-center justify-between gap-2 lg:block">
			<div class="bg-primary-700 w-fit rounded-lg p-2">
				<Puzzle class="size-4 stroke-white" />
			</div>
			<button on:click={toggleMenu} class="block lg:hidden">
				<Menu class="stroke-primary-base" />
			</button>
		</div>
		<div class="hidden space-y-5 lg:block">
			{#each NAV_LINKS as link}
				<div>
					<p class="mb-3 text-xs uppercase tracking-wide text-neutral-400">{link.title}</p>
					<div class="space-y-3">
						{#each link.sub_links as sub_link}
							<div class="hover:text-primary-600 group flex items-center gap-2 transition-colors">
								<svelte:component
									this={sub_link.icon}
									class={cn(
										'group-hover:stroke-primary-600 h-4 w-4 stroke-neutral-500 transition-colors',
										{
											'stroke-primary-700':
												sub_link.href === '/'
													? $page.url.pathname === '/'
													: $page.url.pathname.startsWith(sub_link.href)
										}
									)}
								/>
								<a
									href={sub_link.href}
									class={cn(
										'group-hover:text-primary-600 text-sm text-neutral-500 transition-colors',
										{
											'text-primary-700 font-semibold':
												sub_link.href === '/'
													? $page.url.pathname === '/'
													: $page.url.pathname.startsWith(sub_link.href)
										}
									)}
								>
									{sub_link.name}
								</a>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="hidden w-full lg:mt-auto lg:block">
		<div class="mt-2 w-full">
			<button
				class="relative flex w-full items-center gap-2 rounded bg-stone-100 p-2 transition-colors hover:bg-stone-200"
			>
				<img
					src="https://api.dicebear.com/9.x/open-peeps/svg?seed={user.full_name}"
					alt="avatar"
					class="bg-primary-500 size-8 shrink-0 rounded shadow"
				/>
				<div class="text-start">
					<span class="block text-sm font-semibold">{user.full_name}</span>
					<span class="block text-xs text-stone-500">{user.company_name}</span>
				</div>
			</button>
			<Dropdown class="w-full">
				<DropdownItem>Profile</DropdownItem>
				<DropdownItem>Sign out</DropdownItem>
			</Dropdown>
		</div>
	</div>
</div>
