<script lang="ts">
	import '../app.scss';
	import { onMount } from 'svelte';
	
	let { children } = $props();

	onMount(async () => {
		await import('bootstrap/dist/js/bootstrap.bundle.min.js');
	});
</script>

{@render children()}
