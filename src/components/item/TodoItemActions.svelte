<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let completed: boolean = false;

  function onDelete() {
    dispatch("delete");
  }

  function onEdit() {
    dispatch("edit");
  }

  function onCompletedChange(_) {
    dispatch("completedChange");
  }

  $: onCompletedChange(completed);
</script>

<div>
  <input type="checkbox" bind:checked={completed} />
  <button on:click={onEdit}>Edit</button>
  <button on:click={onDelete}>Delete</button>
</div>

<style>
  input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
  }
  div {
    display: flex;
    gap: 10px;
  }
</style>
