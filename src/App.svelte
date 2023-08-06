<script lang="ts">
  import { onMount } from "svelte";
  import TodoItemCreate from "./components/item/TodoItemCreate.svelte";
  import TodoItems from "./components/item/TodoItems.svelte";
  import EditTaskModal from "./components/modal/EditTaskModal.svelte";
  import type { Task, TaskColumn } from "./model";
  import { modals } from "./modals";
  import TaskFileIo from "./components/file/TaskFileIo.svelte";
  import DeleteTaskModal from "./components/modal/DeleteTaskModal.svelte";
  import TodoBoard from "./components/item/board/TodoBoard.svelte";

  const ITEMS_STORAGE_KEY = "todoItems";
  const STATUSES = {
    PLANNED: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
  };

  let items: Task[] = [];

  function onTaskEdit(e: { detail: Task }) {
    modals.editTask.data = structuredClone(e.detail);
    modals.editTask.visible = true;
  }

  function onTaskEditSave(e) {
    const task = e.detail;
    columns[STATUSES[task.status]].items = columns[
      STATUSES[task.status]
    ].items.map((t: Task) => (t.id == e.detail.id ? e.detail : t));
    saveToLocalStorage();
  }

  function startTaskDelete(e: { detail: Task }) {
    modals.deleteTask.data = e.detail;
    modals.deleteTask.visible = true;
  }

  function saveToLocalStorage() {
    window.localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(columns));
  }

  function onTaskDelete() {
    const task = modals.deleteTask.data;
    columns[STATUSES[task.status]].items = columns[
      STATUSES[task.status]
    ].items.filter((i) => i.id != task.id);
    saveToLocalStorage();
  }

  onMount(() => {
    const todoItems = window.localStorage.getItem(ITEMS_STORAGE_KEY);
    if (todoItems === null) return;

    try {
      const data: TaskColumn[] = JSON.parse(todoItems);
      columns = data;
    } catch (e) {
      console.error(e);
    }
  });

  let columns: TaskColumn[] = [
    {
      status: "PLANNED",
      items: [],
    },
    {
      status: "IN_PROGRESS",
      items: [],
    },
    {
      status: "COMPLETED",
      items: [],
    },
  ];
</script>

<body class="bg-blue-100 p-4">
  <div class="mx-auto">
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

    <TodoBoard
      bind:columns
      on:edit={onTaskEdit}
      on:delete={startTaskDelete}
      on:titleChange={saveToLocalStorage}
      on:completedChange={saveToLocalStorage}
      on:reordered={saveToLocalStorage}
    />

    <div class="mt-4">
      <TodoItemCreate bind:items bind:columns on:create={saveToLocalStorage} />
    </div>
    <div class="mt-4">
      <TaskFileIo bind:items />
    </div>
  </div>
</body>
