<script lang="ts">
	import Navbar from '$lib/components/shared/navbar.svelte';
import '../app.css';
	let { children } = $props();
</script>

<Navbar/>
{@render children()}
