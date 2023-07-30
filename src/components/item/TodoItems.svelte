<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../../model";
  import TodoItem from "./TodoItem.svelte";

  const dispatch = createEventDispatcher();

  export let items: Task[];

  function onDelete(task: Task) {
    items = items.filter((t: Task) => t.id != task.id);
  }
</script>

<div>
  {#each items as item (item.id)}
    <TodoItem
      bind:data={item}
      on:edit={() => dispatch("edit", item)}
      on:delete={() => onDelete(item)}
    />
  {/each}
</div>

<style>
  div {
    display: flex;
    gap: 5px;
    flex-direction: column;
  }
</style>
