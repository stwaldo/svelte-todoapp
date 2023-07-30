<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onDelete() {
    dispatch("delete");
  }

  function onEdit() {
    dispatch("edit");
  }
</script>

<div>
  <button on:click={onEdit}>Edit</button>
  <button on:click={onDelete}>Delete</button>
</div>

<style>
  div {
    display: flex;
    gap: 10px;
  }
</style>
