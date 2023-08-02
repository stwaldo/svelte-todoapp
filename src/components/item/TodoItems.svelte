<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../../model";
  import TodoItem from "./TodoItem.svelte";

  const dispatch = createEventDispatcher();

  export let items: Task[];

  function onDelete(task: Task) {
    dispatch("delete", task);
  }

  function getLists(items: Task[]) {
    return [
      items.filter((i) => !i.completed),
      items.filter((i) => i.completed),
    ];
  }

  $: items = items.sort((b, a) => Number(b.completed) - Number(a.completed));
  $: lists = getLists(items);
</script>

<div class="flex gap-8 flex-col">
  {#each lists as list}
    {#if list.length > 0}
      <div class="flex gap-2 flex-col">
        {#each list as item (item.id)}
          <TodoItem
            bind:data={item}
            on:titleChange
            on:completedChange
            on:edit={() => dispatch("edit", item)}
            on:delete={() => onDelete(item)}
          />
        {/each}
      </div>
    {/if}
  {/each}
</div>
