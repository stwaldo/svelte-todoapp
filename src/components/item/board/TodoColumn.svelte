<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import TodoItem from "../TodoItem.svelte";
    import type { StatusType, TaskColumn } from "../../../model";
    import { createEventDispatcher } from "svelte";

    const STATUSES: Record<StatusType, string> = {
        PLANNED: "Planned",
        IN_PROGRESS: "In progress",
        COMPLETED: "Completed",
    };

    const dispatch = createEventDispatcher();

    export let column: TaskColumn;

    function handleDndConsider(e) {
        column.items = e.detail.items;
    }

    function handleDndFinalize(e) {
        column.items = e.detail.items;
        if (e.detail.info.trigger == "droppedIntoZone") {
            const task = e.detail.items.find((t) => t.id == e.detail.info.id);
            task.status = column.status;
        }

        dispatch("update");
    }
</script>

<div class="flex flex-col flex-1">
    <h2 class="text-2xl font-bold text-center">
        {STATUSES[column.status]}
    </h2>
    <div
        use:dndzone={{ items: column.items, dropTargetStyle: {} }}
        on:consider={(e) => handleDndConsider(e)}
        on:finalize={(e) => handleDndFinalize(e)}
        class="mt-2 flex flex-col flex-1 gap-2 py-4"
    >
        {#each column.items as item (item.id)}
            <TodoItem
                bind:data={item}
                on:titleChange
                on:completedChange={(e) =>
                    dispatch("completedChange", {
                        task: item,
                        completed: e.detail,
                    })}
                on:edit={() => dispatch("edit", item)}
                on:delete={() => dispatch("delete", item)}
            />
        {/each}
    </div>
</div>
