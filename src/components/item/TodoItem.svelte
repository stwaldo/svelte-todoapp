<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../../model";
  import TodoItemActions from "./TodoItemActions.svelte";

  const dispatch = createEventDispatcher();

  function onTitleBlur() {
    dispatch("titleChange");
  }

  export let data: Task;
</script>

<div>
  <span
    contenteditable="true"
    spellcheck="false"
    on:blur={onTitleBlur}
    bind:textContent={data.title}>{data.title}</span
  >
  <TodoItemActions on:delete on:edit />
</div>

<style>
  div {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>
