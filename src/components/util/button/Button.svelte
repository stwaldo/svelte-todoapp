<script lang="ts">
  export let color: string = "blue";

  const COLORS: Record<string, string> = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-400 hover:bg-gray-600",
  };

  function getColor(color: string) {
    return COLORS[color] ?? COLORS["blue"];
  }
</script>

<button class="{getColor(color)} px-4 py-2 rounded text-white" on:click
  ><slot /></button
>
