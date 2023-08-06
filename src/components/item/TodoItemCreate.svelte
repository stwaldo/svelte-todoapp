<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task, TaskColumn } from "../../model";
  import { v4 as uuidv4 } from "uuid";

  const dispatch = createEventDispatcher();

  export let columns: TaskColumn[];

  let title: string = "";

  function onKeyDown(e: KeyboardEvent) {
    if (e.key != "Enter") return;
    if (title === "") return;

    columns[0].items = [
      ...columns[0].items,
      {
        id: uuidv4(),
        title,
        status: "PLANNED",
        description: "",
        tags: [],
      },
    ];

    dispatch("create");
    title = "";
  }
</script>

<input
  type="text"
  bind:value={title}
  on:keydown={onKeyDown}
  placeholder="Create a new task"
/>

<style>
  input {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
