<script>
  import ContentPadding from "./ContentPadding.svelte";
  import ContentWidth from "./ContentWidth.svelte";
</script>

<ContentWidth
  padded
  class="relative z-10 h-512 max-w-256 lg:rounded-md mx-auto bg-l0 dark:bg-d1 border-t border-b lg:border border-l2 dark:border-d2"
>
  <slot />
</ContentWidth>
