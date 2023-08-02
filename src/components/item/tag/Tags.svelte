<script lang="ts">
  import type { TagData } from "../../../model";
  import Tag from "./Tag.svelte";
  import { v4 as uuidv4 } from "uuid";

  export let editing: boolean = false;
  export let tags: TagData[];

  let adding: boolean = false;
  let addInput: HTMLInputElement;

  let tagName: string = "";

  function addTag() {
    adding = true;
    setTimeout(() => {
      addInput.focus();
    }, 5);
  }

  function onTagDelete(tag: TagData) {
    tags = tags.filter((t) => t.id != tag.id);
  }

  function generateRandomColor() {
    /**
     * @copyright CC-by-sa 4.0x https://stackoverflow.com/a/5092846
     * */
    return ((Math.random() * 0xffffff) << 0).toString(16);
  }

  function onInputKeyDown(e: KeyboardEvent) {
    if (e.key != "Enter") return;

    tags = [
      ...tags,
      {
        id: uuidv4(),
        name: tagName,
        color: `#${generateRandomColor()}`,
      },
    ];

    tagName = "";
  }

  function onLostFocus() {
    adding = false;
  }
</script>

<div class="flex flex-wrap gap-1 mt-1 items-center">
  {#each tags as tag (tag.id)}
    <Tag bind:data={tag} {editing} on:delete={() => onTagDelete(tag)} />
  {/each}
  {#if editing}
    {#if adding}
      <input
        type="text"
        bind:value={tagName}
        on:blur={onLostFocus}
        on:keydown={onInputKeyDown}
        bind:this={addInput}
        class="h-4 w-14"
      />
    {/if}
    <span class="cursor-pointer" on:click={addTag}>+</span>
  {/if}
</div>
