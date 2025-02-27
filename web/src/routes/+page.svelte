<script lang="ts">
    const size = 32;
    const offsetX = Math.round((Math.random() - 2) * size);
    const offsetY = Math.round((Math.random() - 2) * size);

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
</script>

<svelte:head>
    <title>Torben Flessner</title>
</svelte:head>

<svelte:body
    onmousemove={handleMove}
    ontouchmove={handleMove}
    bind:clientHeight
    bind:clientWidth
/>

<div class="flex flex-col gap-4">
    <p>
        I didn't have the time to write something interesting here yet.
        <br />
        I hope to address this in the coming months.
    </p>
    <p>- February 2024</p>

    <p>
        -
        <a
            href="mailto:torben@flessner.dev"
            class="text-primary hover:underline"
        >
            Email
        </a>
        <br />
        -
        <a
            href="https://github.com/flessner"
            class="text-primary hover:underline"
        >
            GitHub
        </a>
    </p>
</div>

<div class="fixed top-0 left-0 w-full h-full -z-20">
    {#each [...Array(amountX).keys()] as x}
        {#each [...Array(amountY).keys()] as y}
            {@render Pixel(x, y)}
        {/each}
    {/each}
</div>

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
        <p class="text-base-foreground/5 font-mono text-xs select-none">
            {letter}
        </p>
    </div>
{/snippet}
