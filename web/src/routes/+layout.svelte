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

	let scrollY = $state(0);
	let compact = $derived(scrollY > 50);
</script>

<svelte:window bind:scrollY />

<div
	class={`fixed top-0 w-full backdrop-blur-2xl pb-2 duration-500 ease-in-out hover:pb-1`}
>
	<div
		class={`px-4 flex flex-row justify-between bg-background-alt overflow-hidden outline-border outline-4 duration-500 ease-in-out hover:outline-primary hover:outline-offset-0 ${compact ? "h-12 outline-offset-4" : "h-24 outline-offset-8"}`}
	>
		<div class="flex flex-col -gap-2 justify-center select-none">
			<a href="/" class="h-5 hover:underline">Torben Flessner</a>
			<p
				class={`duration-500 ease-in-out ${compact ? "h-0 translate-y-5" : "h-5"}`}
			>
				Student @
				<a class="hover:underline" href="https://www.kit.edu/">KIT</a>
			</p>
		</div>
	</div>
</div>

{@render children()}
