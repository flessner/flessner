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
</script>

<div class="max-w-2xl mx-auto px-2 min-h-screen">
	<div class="h-32 flex flex-row">
		<div class="flex flex-col h-full justify-center">
			<a href="/" class="text-xl hover:underline font-bold">
				Torben Flessner
			</a>
			<p class="text-sm italic">Studying Digital Economics</p>
		</div>
	</div>
	{@render children()}
</div>
