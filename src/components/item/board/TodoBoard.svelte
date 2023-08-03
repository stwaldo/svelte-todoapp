<script lang="ts">
  import { dndzone } from "svelte-dnd-action";

  let columns = [
    {
      id: "PLANNED",
      text: "Planned",
      items: [
        {
          id: "0",
          text: "Buy some milk",
        },
      ],
    },
    {
      id: "IN_PROGRESS",
      text: "In progress",
      items: [
        {
          id: "1",
          text: "Buy some cheese",
        },
        {
          id: "2",
          text: "Go to work",
        },
      ],
    },
    {
      id: "COMPLETED",
      text: "Completed",
      items: [
        {
          id: "3",
          text: "Buy some cookies",
        },
        {
          id: "4",
          text: "Jump around",
        },
      ],
    },
  ];

  function handleDndConsider(e, i) {
    columns[i].items = e.detail.items;
  }

  function handleDndFinalize(e, i) {
    columns[i].items = e.detail.items;
  }
</script>

<div class="flex gap-2">
  {#each columns as column, i (column.id)}
    <div
      use:dndzone={{ items: column.items }}
      on:consider={(e) => handleDndConsider(e, i)}
      on:finalize={(e) => handleDndFinalize(e, 1)}
      class="flex flex-col gap-2"
    >
      {#each column.items as item (item.id)}
        <div class="bg-white p-2 rounded shadow border border-black">
          {item.text}
        </div>
      {/each}
    </div>
  {/each}
</div>
