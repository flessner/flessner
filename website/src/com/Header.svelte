<script>
  import ContentWidth from "./ContentWidth.svelte";
</script>

<header
  class="sticky top-0 z-100 bg-l0 dark:bg-d1 border-b border-l2 dark:border-d2"
>
  <ContentWidth padded class="h-16 flex justify-between">
    <slot />
  </ContentWidth>
</header>
