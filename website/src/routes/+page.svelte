<script lang="ts">
    const size = 32;

    // scroll position
    let scrollY = $state(0);

    // mouse position
    let mouseY = $state(-100);
    let mouseX = $state(100);

    function handleMousemove(event: MouseEvent) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function handleTouchmove(event: TouchEvent) {
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
    }
</script>

<svelte:window bind:scrollY />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="relative h-screen w-screen overflow-hidden"
    onmousemove={handleMousemove}
    ontouchmove={handleTouchmove}
>
    {#each [...Array(50).keys()] as x}
        {#each [...Array(50).keys()] as y}
            {@render Pixel(x, y)}
        {/each}
    {/each}
</div>

<!-- pixel component for the header -->
{#snippet Pixel(x: number, y: number)}
    {@const letter = Math.random().toString(36).substring(2, 3)}
    {@const distance = Math.sqrt(
        (mouseY + scrollY - y * size) ** 2 + (mouseX - x * size) ** 2,
    )}

    {@const effect = Math.max(0, 100 - distance)}

    {@const effectX = Math.random() - 0.5}
    {@const effectY = Math.random() - 0.5}

    <div
        class={`absolute z-10 w-[32px] h-[32px] flex items-center justify-center`}
        style={`top: ${y * size - size / 2}px; left: ${x * size - size / 2}px; transform: translate(${effectX * effect}px, ${effectY * effect}px);`}
    >
        <p class="text-foreground/10 font-mono text-xs select-none">{letter}</p>
    </div>
{/snippet}
