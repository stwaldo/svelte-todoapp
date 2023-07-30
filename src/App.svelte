<script lang="ts">
  import TodoItemCreate from "./components/item/TodoItemCreate.svelte";
  import TodoItems from "./components/item/TodoItems.svelte";
  import EditTaskModal from "./components/modal/EditTaskModal.svelte";
  import type { Task } from "./model";

  let items: Task[] = [];

  let editTaskModalVisible = false;
  let editTaskModalData: Task | null = null;

  function onTaskEdit(e: { detail: Task }) {
    editTaskModalData = structuredClone(e.detail);
    editTaskModalVisible = true;
  }

  function onTaskEditSave(e) {
    items = items.map((t: Task) => (t.id === e.detail.id ? e.detail : t));
  }
</script>

<EditTaskModal
  visible={editTaskModalVisible}
  data={editTaskModalData}
  on:save={onTaskEditSave}
/>
<TodoItems bind:items on:edit={onTaskEdit} />
<TodoItemCreate bind:items />
