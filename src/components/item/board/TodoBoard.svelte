<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { createEventDispatcher } from "svelte";
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

  function handleDndConsider(e, i, status) {
    columns[i].items = e.detail.items;
  }

  function handleDndFinalize(e, i, status) {
    columns[i].items = e.detail.items;
    if (e.detail.info.trigger == "droppedIntoZone") {
      const task = e.detail.items.find((t) => t.id == e.detail.info.id);
      task.status = status;
    }

    dispatch("update");
  }
</script>

<div class="flex flex-col md:flex-row gap-2 mt-2">
  {#each columns as column, i (column.status)}
    <div class="flex flex-col flex-1">
      <h2 class="text-2xl font-bold text-center">{STATUSES[column.status]}</h2>
      <div
        use:dndzone={{ items: column.items }}
        on:consider={(e) => handleDndConsider(e, i, column.status)}
        on:finalize={(e) => handleDndFinalize(e, i, column.status)}
        class="mt-2 flex flex-col flex-1 gap-2 py-4"
      >
        {#each column.items as item (item.id)}
          <TodoItem
            bind:data={item}
            on:titleChange
            on:completedChange={(e) => onTaskCompletedChange(item, e.detail)}
            on:edit={() => dispatch("edit", item)}
            on:delete={() => onDelete(item)}
          />
        {/each}
      </div>
    </div>
  {/each}
</div>
