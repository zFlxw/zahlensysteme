<script lang="ts">
  import { automaticContinue, rangeFrom, rangeTo } from '$lib/stores';
  import { X } from 'lucide-svelte';

  export let showModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) {
    dialog.showModal();
  }

  function setRangeFrom(event: Event) {
    rangeFrom.set((event.target as any).value);
  }

  function setRangeTo(event: Event) {
    rangeTo.set((event.target as any).value);
  }

  function setAutomaticContinue(event: Event) {
    automaticContinue.set((event.target as any).checked);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  class="mx-4 w-full rounded-md border-none p-0 md:mx-auto md:max-w-screen-sm"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="my-2 flex flex-col gap-4 px-4">
    <div class="flex justify-between text-neutral-950">
      <h2>Optionen</h2>
      <button on:click={() => (dialog.close())}>
        <X />
      </button>
    </div>
    <hr />
    <div>
      <h3>Zahlenbereich</h3>
      <div class="flex items-center gap-2">
        <label for="range-from">von:</label>
        <input name="range-from" type="number" min="1" max="5000" on:input={setRangeFrom} bind:value={$rangeFrom} />
        <label for="range-to"> bis: </label>
        <input name="range-to" type="number" min="1" max="5000" on:input={setRangeTo} bind:value={$rangeTo} />
      </div>
    </div>
    <div>
      <h3>Automatisch Fortfahren</h3>
      <p>Wenn beide Umrechnungen korrekt sind, generiert die Seite <strong>nach einer Sekunde</strong> automatisch eine neue Zahl.</p>
      <input type="checkbox" name="switch" id="switch" bind:checked={$automaticContinue} />
    </div>
  </div>
</dialog>

<style lang="postcss">
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }
</style>
