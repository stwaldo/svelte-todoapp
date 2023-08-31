<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { TaskBoard } from "../../model";
  import { v4 as uuidv4 } from "uuid";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let boards: TaskBoard[];
  export let currentBoardId: string;

  let createBoardName: string | null = null;
  let createBoardInput: HTMLInputElement | null = null;

  function selectBoard(id: string) {
    currentBoardId = id;
  }

  function startCreateBoard() {
    createBoardName = "";
    setTimeout(() => {
      createBoardInput.focus();
    }, 5);
  }

  function createBoardKeydown(e: KeyboardEvent) {
    if (e.key != "Enter") return;

    boards = [
      ...boards,
      {
        id: uuidv4(),
        name: createBoardName,
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

    dispatch("boardCreated");
    createBoardName = null;
  }

  function onCreateBoardBlur() {
    createBoardName = null;
  }
</script>

<div class="mt-4 flex flex-col gap-2">
  <div class="flex items-center gap-2">
    <h2 class="text-2xl font-bold">My Boards</h2>
    <span class="cursor-pointer" on:click={startCreateBoard}>
      <Icon icon="material-symbols:add-circle-rounded" width={24} />
    </span>
  </div>
  <div class="mt-4 flex flex-col gap-2 w-52">
    {#each boards as board}
      <div
        class="bg-blue-300 p-2 cursor-pointer rounded-md text-white {currentBoardId ==
        board.id
          ? 'bg-blue-500'
          : 'bg-blue-400'}"
        on:click={() => selectBoard(board.id)}
      >
        {board.name}
      </div>
    {/each}
    {#if createBoardName != null}
      <div class="w-full">
        <input
          type="text"
          bind:value={createBoardName}
          bind:this={createBoardInput}
          on:blur={onCreateBoardBlur}
          on:keydown={createBoardKeydown}
        />
      </div>
    {/if}
  </div>
</div>
