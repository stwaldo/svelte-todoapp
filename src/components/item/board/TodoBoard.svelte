<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { StatusType, Task, TaskColumn } from "../../../model";
    import TodoColumn from "./TodoColumn.svelte";

    const dispatch = createEventDispatcher();

    export let columns: TaskColumn[] = [
        {
            status: "PLANNED",
            items: [],
        },
        {
            status: "IN_PROGRESS",
            items: [],
        },
        {
            status: "COMPLETED",
            items: [],
        },
    ];

    function onDelete(task: Task) {
        dispatch("delete", task);
    }

    function onTaskCompletedChange(task: Task, completed: boolean) {
        if (completed) {
            moveTaskByStatus(task, "COMPLETED");
        } else {
            moveTaskByStatus(task, "IN_PROGRESS");
        }

        dispatch("update");
    }

    function moveTaskByStatus(task: Task, status: StatusType) {
        let columnFrom = columns.find((c) => c.status == task.status);
        let columnTo = columns.find((c) => c.status == status);

        columnFrom.items = columnFrom.items.filter((i) => i.id != task.id);
        columnTo.items.push(task);
        task.status = status;
        columns = columns;
    }
</script>

<div class="flex flex-col md:flex-row gap-2 mt-2">
    {#each columns as column, i (column.status)}
        <TodoColumn
            bind:column
            on:titleChange
            on:update
            on:edit={(e) => dispatch("edit", e.detail)}
            on:delete={(e) => onDelete(e.detail)}
            on:completedChange={(e) =>
                onTaskCompletedChange(e.detail.task, e.detail.completed)}
        />
    {/each}
</div>
