<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onDelete() {
    dispatch("delete");
  }
</script>

<div>
  <button>Edit</button>
  <button on:click={onDelete}>Delete</button>
</div>

<style>
  div {
    display: flex;
    gap: 10px;
  }
</style>
