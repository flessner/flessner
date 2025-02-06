<script lang="ts">
    import { onMount } from "svelte";

    const size = 32;

    // scroll position
    let scrollY = $state(0);

    // mouse position
    let mouseY = $state(-500);
    let mouseX = $state(-500);

    let lastMove = $state(Date.now());
    function handleMove(event: MouseEvent | TouchEvent) {
        if (event instanceof MouseEvent) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        } else if (event instanceof TouchEvent) {
            mouseX = event.touches[0].clientX;
            mouseY = event.touches[0].clientY;
        }

        // keep track of last move
        lastMove = Date.now();

        // reset if 1000ms have passed
        setTimeout(() => {
            if (Date.now() - lastMove > 990) {
                mouseX = -500;
                mouseY = -500;
            }
        }, 1000);
    }

    // prevent scrolling
    onMount(() => {
        const body = document.querySelector("body");
        body.classList.add("overflow-hidden");

        return () => {
            body.classList.remove("overflow-hidden");
        };
    });
</script>

<svelte:window bind:scrollY />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="relative h-[100svh] w-screen overflow-hidden"
    onmousemove={handleMove}
    ontouchmove={handleMove}
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
        class={`absolute z-10 w-[32px] h-[32px] flex items-center justify-center duration-200`}
        style={`top: ${y * size - size / 2}px; left: ${x * size - size / 2}px; transform: translate(${effectX * effect}px, ${effectY * effect}px);`}
    >
        <p class="text-foreground/10 font-mono text-xs select-none">{letter}</p>
    </div>
{/snippet}
