<script lang="ts">
	import { browser } from "$app/environment";
	import { beforeNavigate, afterNavigate } from "$app/navigation";
	import posthog from "posthog-js";
	import "../app.css";

	const { children } = $props();

	// count page views for posthog
	if (browser) {
		beforeNavigate(() => posthog.capture("$pageleave"));
		afterNavigate(() => posthog.capture("$pageview"));
	}

	// scroll position
	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<div
	class={`absolute z-50 top-0 h-20 w-full duration-300 pointer-events-none ${scrollY > 1 ? "backdrop-blur-2xl" : ""}`}
>
	<div class="h-full max-w-xl mx-auto px-4 flex flex-row">
		<a href="/" class="my-auto pointer-events-auto">flessner.dev</a>
	</div>
</div>

{@render children()}
