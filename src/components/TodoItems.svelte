<script lang="ts">
  import type { Task } from "../model";
  import TodoItem from "./TodoItem.svelte";

  function onDelete(task: Task) {
    items = items.filter((t: Task) => t.id != task.id);
  }

  let items: Task[] = [
    {
      id: "1",
      title: "Buy some cookies",
      completed: false,
    },
    {
      id: "2",
      title: "Buy some milk",
      completed: false,
    },
    {
      id: "3",
      title: "mow the lawn",
      completed: false,
    },
  ];
</script>

<div>
  {#each items as item (item.id)}
    <TodoItem bind:data={item} on:delete={() => onDelete(item)} />
  {/each}
</div>

<style>
  div {
    display: flex;
    gap: 5px;
    flex-direction: column;
  }
</style>
