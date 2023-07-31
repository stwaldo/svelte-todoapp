<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../../model";
  import Modal from "../util/modal/Modal.svelte";
  const dispatch = createEventDispatcher();

  export let visible = false;
  export let data: Task | null;

  function close() {
    visible = false;
  }

  function save() {
    dispatch("save", data);
    close();
  }
</script>

<Modal bind:visible>
  <h1>Edit task</h1>
  <input type="text" bind:value={data.title} />
  <button on:click={save}>Save</button>
  <button on:click={close}>Close</button>
</Modal>
