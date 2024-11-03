<script>
	import Sidebar from "./_components/sidebar.svelte";

	export let data;
</script>

<main>
	<section class="bg-white dark:bg-[#121212] h-svh max-h-svh">
		<div class="lg:grid lg:grid-cols-[280px,_1fr] h-full">
			<div class="sticky top-0 lg:h-full w-full">
				<Sidebar user={{
					full_name: data.full_name,
					company_name: data.company_name || "",
				}}/>
			</div>
			<div class="lg:overflow-y-auto">
				<slot />
			</div>
		</div>
	</section>
</main>
