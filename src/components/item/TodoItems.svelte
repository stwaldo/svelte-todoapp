<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../../model";
  import TodoItem from "./TodoItem.svelte";
  import { dndzone } from "svelte-dnd-action";

  const dispatch = createEventDispatcher();

  export let items: Task[];

  function onDelete(task: Task) {
    dispatch("delete", task);
  }

  function handleDnDConsider(e: { detail: { items: Task[] } }) {
    items = e.detail.items;
  }

  function handleDndFinalize(e: { detail: { items: Task[] } }) {
    items = e.detail.items;
  }

  $: items = items.sort((b, a) => Number(b.completed) - Number(a.completed));
</script>

<div class="flex">
  <div class="flex-1 text-center">Planned</div>
  <div class="flex-1 text-center">In progress</div>
  <div class="flex-1 text-center">Completed</div>
</div>

<div class="flex">
  <div class="flex-1">a</div>
  <div class="flex-1">b</div>
  <div class="flex-1">c</div>
</div>

<div
  class="flex gap-2 flex-col"
  use:dndzone={{ items }}
  on:consider={handleDnDConsider}
  on:finalize={handleDndFinalize}
>
  {#each items as item (item.id)}
    <TodoItem
      bind:data={item}
      on:titleChange
      on:completedChange
      on:edit={() => dispatch("edit", item)}
      on:delete={() => onDelete(item)}
    />
  {/each}
</div>
