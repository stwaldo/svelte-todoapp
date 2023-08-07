<script lang="ts">
    import { onMount } from "svelte";
    import { v4 as uuidv4 } from "uuid";
    import TodoItemCreate from "./components/item/TodoItemCreate.svelte";
    import EditTaskModal from "./components/modal/EditTaskModal.svelte";
    import type { Task, TaskBoard } from "./model";
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

    let currentBoardId: string = uuidv4();
    let currentBoard: TaskBoard | null;

    let boards: TaskBoard[] = [
        {
            id: currentBoardId,
            name: "Default Board",
            columns: [
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
            ],
        },
    ];

    function onTaskEdit(e: { detail: Task }) {
        modals.editTask.data = structuredClone(e.detail);
        modals.editTask.visible = true;
    }

    function onTaskEditSave(e: { detail: Task }) {
        const board = boards.find((l) => l.id == currentBoardId);
        const task = e.detail;
        board.columns[STATUSES[task.status]].items = board.columns[
            STATUSES[task.status]
        ].items.map((t: Task) => (t.id == e.detail.id ? e.detail : t));
        currentBoard = getCurrentBoard(currentBoardId);
        saveToLocalStorage();
    }

    function startTaskDelete(e: { detail: Task }) {
        modals.deleteTask.data = e.detail;
        modals.deleteTask.visible = true;
    }

    function saveToLocalStorage() {
        window.localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(boards));
    }

    function onTaskDelete() {
        const board = boards.find((l) => l.id == currentBoardId);
        const task = modals.deleteTask.data;
        board.columns[STATUSES[task.status]].items = board.columns[
            STATUSES[task.status]
        ].items.filter((i) => i.id != task.id);
        currentBoard = getCurrentBoard(currentBoardId);
        saveToLocalStorage();
    }

    onMount(() => {
        const todoItems = window.localStorage.getItem(ITEMS_STORAGE_KEY);
        if (todoItems === null) return;

        try {
            const data: TaskBoard[] = JSON.parse(todoItems);
            boards = data;
            currentBoardId = data[0].id;
        } catch (e) {
            console.error(e);
        }
    });

    function getCurrentBoard(currentBoardId: string) {
        return boards.find((b) => b.id == currentBoardId);
    }

    $: currentBoard = getCurrentBoard(currentBoardId);
</script>

<body class="bg-blue-100 p-4">
    <select>
        {#each boards as board}
            <option value={board.id}>{board.name}</option>
        {/each}
    </select>
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

        {#if currentBoard}
            <TodoBoard
                bind:columns={currentBoard.columns}
                on:edit={onTaskEdit}
                on:update={saveToLocalStorage}
                on:delete={startTaskDelete}
                on:titleChange={saveToLocalStorage}
                on:completedChange={saveToLocalStorage}
            />

            <div class="mt-4">
                <TodoItemCreate
                    bind:columns={currentBoard.columns}
                    on:create={saveToLocalStorage}
                />
            </div>
            <div class="mt-4">
                <TaskFileIo bind:columns={currentBoard.columns} />
            </div>
        {/if}
    </div>
</body>
