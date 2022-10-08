<script>
  import ContentPadding from "./ContentPadding.svelte";

  export let full = false;
  export let narrow = false;
  export let tight = false;
  export let wide = false;

  export let padded = false;

  let className = "";
  export { className as class };

  let css = "";
  if (full) {
    css = "w-full";
  } else if (wide) {
    css = "max-w-7xl mx-auto";
  } else if (narrow) {
    css = "max-w-2xl mx-auto";
  } else if (tight) {
    css = "max-w-lg mx-auto";
  } else {
    css = "max-w-5xl mx-auto";
  }
</script>

<div class={css + " " + (padded ? "" : className)}>
  {#if padded}
    <ContentPadding class={className}>
      <slot />
    </ContentPadding>
  {:else}
    <slot />
  {/if}
</div>
