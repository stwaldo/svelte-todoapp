<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import TodoColumn from "./TodoColumn.svelte";

    let columns = [
        {
            id: "PLANNED",
            text: "Planned",
            items: [
                {
                    id: "0",
                    text: "Buy cookies",
                },
            ],
        },
        {
            id: "IN_PROGRESS",
            text: "In progress",
            items: [
                {
                    id: "1",
                    text: "Buy milk",
                },
                {
                    id: "4",
                    text: "Buy water",
                },
            ],
        },
        {
            id: "COMPLETED",
            text: "Completed",
            items: [
                {
                    id: "3",
                    text: "Buy bread",
                },
                {
                    id: "5",
                    text: "Buy apples",
                },
            ],
        },
    ];

    function handleDndConsider(e, i) {
        columns[i].items = e.detail.items;
    }

    function handleDndFinalize(e, i) {
        columns[i].items = e.detail.items;
    }
</script>

<div class="flex gap-2">
    {#each columns as column, i (column.id)}
        <div
            use:dndzone={{ items: column.items }}
            on:consider={(e) => handleDndConsider(e, i)}
            on:finalize={(e) => handleDndFinalize(e, i)}
            class="flex flex-col flex-1 gap-2"
        >
            {#each column.items as item (item.id)}
                <div class="bg-white p-2 rounded shadow border border-black">
                    {item.text}
                </div>
            {/each}
        </div>
    {/each}
</div>
