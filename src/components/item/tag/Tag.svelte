<script lang="ts">
  import type { TagData } from "../../../model";

  export let data: TagData;

  function getColor(color: string) {
    // make sure color is properly formatted
    return color;
  }
</script>

<div
  class="rounded px-2 text-sm bg-blue-700 text-white inline-block"
  style="background-color: {getColor(data.color)}"
>
  {data.name}
</div>
