<script>
  import "virtual:windi.css";
  import "../app.css";

  import Header from "$com/Header.svelte";
  import Footer from "$com/Footer.svelte";

  import Icon from "@iconify/svelte";

  import { onMount } from "svelte";
  import { darkMode } from "../site";
  import { get } from "svelte/store";

  onMount(() => {
    // dark mode handling
    darkMode.subscribe((value) => {
      localStorage.setItem("darkMode", value);
      if (value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });

    console.log(typeof get(darkMode));
    darkMode.set(get(darkMode));
  });
</script>

<Header>
  <p class="my-auto text-d0 dark:text-l0 font-semibold">Torben Flessner</p>
  <div
    class="w-8 h-8 my-auto cursor-pointer"
    on:click={() => darkMode.set(!$darkMode)}
  >
    {#if !$darkMode}
      <Icon icon="line-md:moon-filled-alt-loop" class="w-full h-full" />
    {:else}
      <Icon icon="line-md:sunny-filled-loop" class="w-full h-full" />
    {/if}
  </div>
</Header>

<slot />

<Footer>
  <div class="h-32" />
</Footer>
