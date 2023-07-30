<script lang="ts">
  import { onMount } from "svelte";
  import TodoItemCreate from "./components/item/TodoItemCreate.svelte";
  import TodoItems from "./components/item/TodoItems.svelte";
  import EditTaskModal from "./components/modal/EditTaskModal.svelte";
  import type { Task } from "./model";
  import TaskFile from "./components/file/TaskFile.svelte";

  const LOCAL_STORAGE_ITEMS = "todoItems";

  let items: Task[] = [];

  let editTaskModalVisible = false;
  let editTaskModalData: Task | null = null;

  function onTaskEdit(e: { detail: Task }) {
    editTaskModalData = structuredClone(e.detail);
    editTaskModalVisible = true;
  }

  function onTaskEditSave(e) {
    items = items.map((t: Task) => (t.id === e.detail.id ? e.detail : t));

    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    window.localStorage.setItem(LOCAL_STORAGE_ITEMS, JSON.stringify(items));
  }

  onMount(() => {
    const todoItems = window.localStorage.getItem(LOCAL_STORAGE_ITEMS);
    if (todoItems === null) return;

    try {
      const data: Task[] = JSON.parse(todoItems);
      items = data;
    } catch (e) {
      console.error(e);
    }
  });
</script>

<EditTaskModal
  visible={editTaskModalVisible}
  data={editTaskModalData}
  on:save={onTaskEditSave}
/>
<TodoItems
  bind:items
  on:edit={onTaskEdit}
  on:delete={saveToLocalStorage}
  on:titleChange={saveToLocalStorage}
/>
<TodoItemCreate bind:items on:create={saveToLocalStorage} />
<TaskFile bind:items />
