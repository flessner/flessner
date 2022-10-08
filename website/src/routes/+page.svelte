<script>
  import ContentRiver from "$com/ContentRiver.svelte";
  import ContentWidth from "$com/ContentWidth.svelte";

  import Icon from "@iconify/svelte";

  const technologies = [
    {
      icon: "simple-icons:javascript",
      name: "JavaScript",
    },
    {
      icon: "simple-icons:python",
      name: "Python",
    },
    {
      icon: "simple-icons:erlang",
      name: "Erlang",
    },
    {
      icon: "simple-icons:svelte",
      name: "Svelte",
    },
    {
      icon: "simple-icons:tailwindcss",
      name: "Tailwind",
    },
    {
      icon: "simple-icons:markdown",
      name: "Markdown",
    },
    {
      icon: "simple-icons:terraform",
      name: "Terraform",
    },
    {
      icon: "simple-icons:amazonaws",
      name: "AWS",
    },
    {
      icon: "simple-icons:cloudflare",
      name: "Cloudflare",
    },
  ];
</script>

<!-- TITLE -->
<ContentWidth class="my-32" wide>
  <h1 class="text-4xl text-center text-d0 dark:text-l0">
    Hey there 👋<br />
    I am a
    <span class="text-clip bg-gradient-36 filter saturate-120">
      Computer Science
    </span>
    student in Karlsruhe
  </h1>
</ContentWidth>

<ContentRiver>
  <!-- PROJECTS -->
  <h2>My Side Projects</h2>

  <!-- TECHNOLOGIES -->
  <h2>My Tech Stack</h2>
  <div class="flex flex-wrap">
    {#each technologies as { icon, name }}
      <div class="w-1/3 py-6">
        <div class="w-16 h-16 my-2 mx-auto select-none">
          <Icon {icon} class="w-full h-full" />
        </div>
        <p class="text-center">{name}</p>
      </div>
    {/each}
  </div>
</ContentRiver>

<div class="h-32" />

<style>
  .text-clip {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
