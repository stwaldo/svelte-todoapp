<script lang="ts">
  import type { Task, TaskColumn } from "../../model";
  import Button from "../util/button/Button.svelte";

  export let columns: TaskColumn[] = [];
  let fileName: string = "";

  let importFiles: FileList;
  let visible = false;

  function save() {
    const string = JSON.stringify(columns);
    const a = document.createElement("a");
    a.href = `data:application/json;charset=utf-8,${string}`;
    a.download = fileName;
    a.click();
  }

  function onFilesChanged(files: FileList) {
    if (files == null) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (typeof e.target.result !== "string") return;
        const data: TaskColumn[] = JSON.parse(e.target.result);
        columns = data;
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsText(files[0]);
  }

  function toggleVisibility() {
    visible = !visible;
  }

  $: onFilesChanged(importFiles);
</script>

<Button on:click={toggleVisibility}>Import & export</Button>

{#if visible}
  <div class="bg-white p-4">
    <input type="text" placeholder="File name" bind:value={fileName} />
    <Button on:click={save}>Save file</Button>
    <div>
      <label class="file-input">
        <input type="file" bind:files={importFiles} />
        Upload a file
      </label>
    </div>
  </div>
{/if}

<style>
  div {
    margin-top: 20px;
  }
</style>
