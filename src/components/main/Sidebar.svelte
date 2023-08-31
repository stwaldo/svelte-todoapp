<script lang="ts">
  import type { TaskBoard } from "../../model";
  import BoardList from "./BoardList.svelte";

  export let boards: TaskBoard[];
  export let currentBoardId: string;
</script>

<div class="bg-blue-200 p-4">
  <BoardList on:boardCreated bind:boards bind:currentBoardId />
</div>
