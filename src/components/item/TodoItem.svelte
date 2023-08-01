<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../../model";
  import TodoItemActions from "./TodoItemActions.svelte";

  const dispatch = createEventDispatcher();

  export let data: Task;

  function onTitleBlur() {
    dispatch("titleChange");
  }
</script>

<div class="rounded bg-white drop-shadow-md">
  <span
    class:line-through={data.completed}
    contenteditable="true"
    spellcheck="false"
    on:blur={onTitleBlur}
    bind:textContent={data.title}>{data.title}</span
  >
  <TodoItemActions
    on:delete
    on:edit
    on:completedChange
    bind:completed={data.completed}
  />
</div>

<style>
  div {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>
