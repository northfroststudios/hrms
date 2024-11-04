<script>
	import Sidebar from "./_components/sidebar.svelte";

	export let data;
</script>

<main>
	<section class="bg-[#f7fafb] h-svh max-h-svh">
		<div class="lg:grid lg:grid-cols-[280px,_1fr] h-full p-2 gap-2">
			<div class="sticky top-0 lg:h-full w-full">
				<Sidebar user={{
					full_name: data.full_name,
					company_name: data.company_name || "",
				}}/>
			</div>
			<div class="lg:overflow-y-auto border rounded-md bg-white">
				<slot />
			</div>
		</div>
	</section>
</main>
