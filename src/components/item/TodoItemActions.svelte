<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import type { StatusType } from "../../model";

  const dispatch = createEventDispatcher();

  export let status: StatusType;

  let completed: boolean = false;

  function onDelete() {
    dispatch("delete");
  }

  function onEdit() {
    dispatch("edit");
  }

  function onCompletedChange(_) {
    dispatch("completedChange", completed);
  }

  $: onCompletedChange(completed);
  $: completed = status == "COMPLETED";
</script>

<div>
  <input class="md:hidden" type="checkbox" bind:checked={completed} />
  <button on:click={onEdit}>
    <Icon icon="material-symbols:edit" height={24} />
  </button>
  <button on:click={onDelete}>
    <Icon icon="material-symbols:delete-outline" height={24} />
  </button>
</div>

<style>
  input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
