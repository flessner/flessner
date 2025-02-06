<script lang="ts">
    import { onMount } from "svelte";

    const { data } = $props();
    const { size, offsetX, offsetY } = data;

    // dynamic state
    let clientHeight = $state(0);
    let clientWidth = $state(0);

    let amountX = $derived(Math.floor(clientWidth / size) + 4);
    let amountY = $derived(Math.floor(clientHeight / size) + 4);

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

        // reset if 1000ms have passed
        lastMove = Date.now();
        setTimeout(() => {
            if (Date.now() - lastMove > 495) {
                mouseX = -500;
                mouseY = -500;
            }
        }, 500);
    }

    // prevent scrolling on body - fixes mobile scrolling
    onMount(() => {
        const body = document.querySelector("body");
        body.classList.add("overflow-hidden");

        return () => {
            body.classList.remove("overflow-hidden");
        };
    });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="relative h-[100svh] w-screen overflow-hidden"
    onmousemove={handleMove}
    ontouchmove={handleMove}
    bind:clientHeight
    bind:clientWidth
>
    <div class="relative h-full w-full overflow-scroll z-100">
        <!-- TBD content that needs to be scrolled -->
    </div>
    {#each [...Array(amountX).keys()] as x}
        {#each [...Array(amountY).keys()] as y}
            {@render Pixel(x, y)}
        {/each}
    {/each}
</div>

<!-- pixel component for the header -->
{#snippet Pixel(x: number, y: number)}
    {@const letter = Math.random().toString(36).substring(2, 3)}
    {@const distance = Math.sqrt(
        (mouseY - y * size - offsetY) ** 2 + (mouseX - x * size - offsetX) ** 2,
    )}

    {@const effect = Math.max(0, 100 - distance)}

    {@const effectX = Math.random() - 0.5}
    {@const effectY = Math.random() - 0.5}

    <div
        class={`absolute z-10 w-[32px] h-[32px] flex items-center justify-center duration-200`}
        style={`top: ${y * size - size / 2 + offsetY}px; left: ${x * size - size / 2 + offsetX}px; transform: translate(${effectX * effect}px, ${effectY * effect}px);`}
    >
        <p class="text-foreground/10 font-mono text-xs select-none">{letter}</p>
    </div>
{/snippet}
