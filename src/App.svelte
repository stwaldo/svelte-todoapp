<script lang="ts">
  import { onMount } from "svelte";
  import TodoItemCreate from "./components/item/TodoItemCreate.svelte";
  import TodoItems from "./components/item/TodoItems.svelte";
  import EditTaskModal from "./components/modal/EditTaskModal.svelte";
  import type { Task } from "./model";
  import { modals } from "./modals";
  import TaskFileIo from "./components/file/TaskFileIo.svelte";
  import DeleteTaskModal from "./components/modal/DeleteTaskModal.svelte";
  import TodoBoard from "./components/item/board/TodoBoard.svelte";

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

  function startTaskDelete(e: { detail: Task }) {
    modals.deleteTask.data = e.detail;
    modals.deleteTask.visible = true;
  }

  function saveToLocalStorage() {
    window.localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  }

  function onTaskDelete() {
    items = items.filter((i) => i.id != modals.deleteTask.data.id);
    saveToLocalStorage();
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
    bind:visible={modals.editTask.visible}
    bind:data={modals.editTask.data}
    on:save={onTaskEditSave}
  />

  <DeleteTaskModal
    bind:visible={modals.deleteTask.visible}
    bind:data={modals.deleteTask.data}
    on:delete={onTaskDelete}
  />

  <!-- <TodoItems
    bind:items
    on:edit={onTaskEdit}
    on:delete={startTaskDelete}
    on:titleChange={saveToLocalStorage}
    on:completedChange={saveToLocalStorage}
  /> -->

  <TodoBoard />

  <div class="mt-4">
    <TodoItemCreate bind:items on:create={saveToLocalStorage} />
  </div>
  <div class="mt-4">
    <TaskFileIo bind:items />
  </div>
</div>
