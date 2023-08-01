<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../../model";
  import Modal from "../util/modal/Modal.svelte";
  import Button from "../util/modal/Button.svelte";
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
  <h2 class="text-3xl font-bold">Edit task</h2>
  <input
    class="rounded border-2 border-gray-200 p-2 w-full mt-4"
    type="text"
    bind:value={data.title}
  />
  <div class="flex justify-end gap-2 mt-4">
    <Button color="blue" on:click={save}>Save</Button>
    <Button color="red" on:click={close}>Close</Button>
  </div>
</Modal>
