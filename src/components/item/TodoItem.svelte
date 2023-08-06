<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../../model";
  import TodoItemActions from "./TodoItemActions.svelte";
  import Tags from "./tag/Tags.svelte";

  const dispatch = createEventDispatcher();

  export let data: Task;

  function onTitleBlur() {
    dispatch("titleChange");
  }
</script>

<div class="rounded bg-white drop-shadow-md border-1 border-black p-4">
  <div class="flex flex-wrap justify-between">
    <span
      class:line-through={data.status === "COMPLETED"}
      contenteditable="true"
      spellcheck="false"
      class="break-all"
      on:blur={onTitleBlur}
      bind:textContent={data.title}
    />
    <TodoItemActions
      on:delete
      on:edit
      on:completedChange
      status={data.status}
    />
  </div>
  <Tags bind:tags={data.tags} />
</div>
