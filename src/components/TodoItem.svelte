<script lang="ts">
  import type { Task } from "../model";
  import TodoItemActions from "./TodoItemActions.svelte";

  export let data: Task;
</script>

<div>
  <span contenteditable="true" bind:textContent={data.title}>{data.title}</span>
  <TodoItemActions on:delete />
</div>

<style>
  div {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>
