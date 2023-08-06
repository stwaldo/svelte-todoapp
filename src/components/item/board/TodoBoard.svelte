<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { createEventDispatcher } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import TodoColumn from "./TodoColumn.svelte";
  import type { StatusType, Task, TaskColumn } from "../../../model";
  import TodoItem from "../TodoItem.svelte";

  const dispatch = createEventDispatcher();

  const STATUSES: Record<StatusType, string> = {
    PLANNED: "Planned",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
  };

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

  function handleDndConsider(e, i, status) {
    columns[i].items = e.detail.items;
  }

  function handleDndFinalize(e, i, status) {
    columns[i].items = e.detail.items;
    if (e.detail.info.trigger == "droppedIntoZone") {
      const task = e.detail.items.find((t) => t.id == e.detail.info.id);
      task.status = status;
    }

    dispatch("reordered");
  }
</script>

<div class="flex">
  {#each Object.keys(STATUSES) as status}
    <div class="flex-1 text-2xl font-bold text-center">
      {STATUSES[status]}
    </div>{/each}
</div>

<div class="flex gap-2 mt-2">
  {#each columns as column, i (column.status)}
    <div
      use:dndzone={{ items: column.items }}
      on:consider={(e) => handleDndConsider(e, i, column.status)}
      on:finalize={(e) => handleDndFinalize(e, i, column.status)}
      class="flex flex-col flex-1 gap-2"
    >
      {#each column.items as item (item.id)}
        <TodoItem
          bind:data={item}
          on:titleChange
          on:on:completedChange
          on:completedChant
          on:edit={() => dispatch("edit", item)}
          on:delete={() => onDelete(item)}
        />
      {/each}
    </div>
  {/each}
</div>
