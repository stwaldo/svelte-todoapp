<script lang="ts">
    export let visible = false;
    export let customClass: string = "";

    function close() {
        visible = false;
    }
</script>

{#if visible}
    <!-- TODO add a11y events -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-bg" on:click={close}>
        <div class="modal {customClass}" on:click|stopPropagation>
            <slot />
        </div>
    </div>
{/if}

<style>
    .modal-bg {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal {
        @apply rounded-xl;
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
    }

    @media screen and (max-width: 768px) {
        .modal {
            width: 95%;
        }
    }
</style>
