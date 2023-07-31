<script lang="ts">
  import { onMount } from "svelte";
  import TodoItemCreate from "./components/item/TodoItemCreate.svelte";
  import TodoItems from "./components/item/TodoItems.svelte";
  import EditTaskModal from "./components/modal/EditTaskModal.svelte";
  import type { Task } from "./model";
  import { modals } from "./modals";
  import TaskFileIo from "./components/file/TaskFileIo.svelte";

  const ITEMS_STORAGE_KEY = "todoItems";

  let items: Task[] = [];

  function onTaskEdit(e: { detail: Task }) {
    modals.editTask.data = structuredClone(e.detail);
    modals.editTask.visible = true;
  }

  function onTaskEditSave(e) {
    items = items.map((t: Task) => (t.id === e.detail.id ? e.detail : t));

    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    window.localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  }

  onMount(() => {
    const todoItems = window.localStorage.getItem(ITEMS_STORAGE_KEY);
    if (todoItems === null) return;

    try {
      const data: Task[] = JSON.parse(todoItems);
      items = data;
    } catch (e) {
      console.error(e);
    }
  });
</script>

<div class="bg-gray-100 p-4">
  <EditTaskModal
    visible={modals.editTask.visible}
    data={modals.editTask.data}
    on:save={onTaskEditSave}
  />
  <TodoItems
    bind:items
    on:edit={onTaskEdit}
    on:delete={saveToLocalStorage}
    on:titleChange={saveToLocalStorage}
    on:completedChange={saveToLocalStorage}
  />
  <TodoItemCreate bind:items on:create={saveToLocalStorage} />
  <TaskFileIo bind:items />
</div>
