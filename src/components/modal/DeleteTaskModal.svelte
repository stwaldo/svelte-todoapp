<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Task } from "../../model";
    import Button from "../util/button/Button.svelte";
    import Modal from "../util/modal/Modal.svelte";

    export let visible = false;
    export let data: Task | null = null;

    const dispatch = createEventDispatcher();

    function close() {
        visible = false;
    }

    function onDelete() {
        dispatch("delete");
        close();
    }
</script>

<Modal customClass="w-full md:w-1/2" bind:visible>
    <p class="text-center text-xl break-words">
        Are you sure you want to delete the task <b>{data.title}</b>?
    </p>
    <div class="flex justify-end gap-2 mt-4">
        <Button color="gray" on:click={close}>Cancel</Button>
        <Button color="red" on:click={onDelete}>Delete</Button>
    </div>
</Modal>
