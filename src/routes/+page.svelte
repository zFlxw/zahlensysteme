<script lang="ts">
  import { ShuffleIcon, SettingsIcon, ChevronDown } from 'lucide-svelte';
  import { createForm } from 'felte';
  import { onMount } from 'svelte';
  import { crossfade } from 'svelte/transition';
  import resolveConfig from 'tailwindcss/resolveConfig';
  import tailwindConfig from '../../tailwind.config.js';

  const modes = ['decimal', 'binary', 'hexadecimal'];
  const navElements = ['decimal', 'binary', 'hexadecimal', 'random'];
  const activeInputs: HTMLInputElement[] = [];
  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 150),
  });
  const token = 'mode';
  const fullConfig = resolveConfig(tailwindConfig);

  const successBorder = `1px solid ${fullConfig.theme.textColor.success}`;
  const wrongBorder = `1px solid ${fullConfig.theme.textColor.wrong}`;

  let rangeFrom = 1;
  let rangeTo = 10;
  let collapsed = false;

  let fromMode: string = 'decimal';
  let currentMode: string;
  let number: string;

  $: fromMode, generateNumber();

  const { form } = createForm({
    onSubmit: (values) => {
      modes
        .filter((mode) => mode !== currentMode)
        .forEach((mode) => {
          const value = values[mode];
          if (!value) {
            return;
          }

          const input = document.getElementById(`${mode}-input`) as HTMLInputElement;
          switch (mode) {
            case 'decimal':
              if (parseInt(value, 10) === parseInt(number, getBase(currentMode))) {
                input.style.border = successBorder;
                console.log('Border Style', input.style.border);
              } else {
                input.style.border = wrongBorder;
              }
              break;
            case 'binary':
              if (parseInt(value, 2) === parseInt(number, getBase(currentMode))) {
                input.style.border = successBorder;
              } else {
                input.style.border = wrongBorder;
              }
              break;
            case 'hexadecimal':
              if (parseInt(value, 16) === parseInt(number, getBase(currentMode))) {
                input.style.border = successBorder;
              } else {
                input.style.border = wrongBorder;
              }
              break;
            default:
              break;
          }
        });
    },
  });

  const generateNumber = () => {
    activeInputs.forEach((input) => {
      input.value = '';
      input.style.border = `1px solid ${fullConfig.theme.colors.neutral[300]}`;
    });

    let num = Math.floor(Math.random() * (rangeTo - rangeFrom + 1)) + rangeFrom;
    if (fromMode === 'random') {
      currentMode = modes[Math.floor(Math.random() * modes.length)];
    } else {
      currentMode = fromMode;
    }

    switch (currentMode) {
      case 'decimal':
        number = num.toString();
        break;
      case 'binary':
        number = (num >>> 0).toString(2);
        break;
      case 'hexadecimal':
        number = num.toString(16);
        break;
      default:
        number = num.toString();
        break;
    }
  };

  const getBase = (mode: string) => {
    switch (mode) {
      case 'decimal':
        return 10;
      case 'binary':
        return 2;
      case 'hexadecimal':
        return 16;
      default:
        return 10;
    }
  };

  const getName = (mode: string) => {
    switch (mode) {
      case 'decimal':
        return 'Dezimal';
      case 'binary':
        return 'Binär';
      case 'hexadecimal':
        return 'Hexadezimal';
      case 'random':
        return 'Zufall';
      default:
        return 'Dezimal';
    }
  };

  onMount(() => {
    generateNumber();
  });
</script>

<div class="grid min-h-screen w-full grid-rows-[min-content,1fr,min-content]">
  <header class="my-12 flex w-full flex-col items-center gap-8">
    <h1>Zahlensysteme</h1>
    <div class="box">
      <div class="flex w-full items-center justify-between">
        <h2>Ausgangssystem</h2>
        <button
          class={`show xs:hidden transition ${collapsed ? 'rotate-90' : ''}`}
          on:click={() => (collapsed = !collapsed)}
        >
          <ChevronDown />
        </button>
      </div>
      <ul
        class="xs:flex-nowrap flex w-full flex-wrap justify-between overflow-x-auto rounded-md border border-neutral-200 bg-white"
      >
        {#each navElements as element}
          <li
            class={`relative z-10 flex w-full justify-center px-2 py-1 ${collapsed && element !== fromMode ? 'hidden' : 'show'}`}
          >
            {#if element === fromMode}
              <span class="active" in:receive={{ key: token }} out:send={{ key: token }}></span>
            {/if}
            <button on:click={() => (fromMode = element)}>
              {getName(element)}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </header>
  <main class="xs:justify-between flex w-full flex-col gap-16">
    <div class="box w-full">
      <div>
        <h2>Aufgabe</h2>
        <p>
          Rechne die Zahl
          <code>
            {number.toUpperCase()}<sub>{getBase(currentMode)}</sub>
          </code>
          in folgende Zahlensysteme um.
        </p>
      </div>
      <form class="flex flex-col gap-4" use:form on:submit|preventDefault>
        <ul class="flex flex-col gap-4">
          {#each modes.filter((mode) => mode !== currentMode) as mode, index}
            <li class="flex w-full flex-col">
              <label for={mode}>{getName(mode)}</label>
              <input name={mode} id={`${mode}-input`} type="text" bind:this={activeInputs[index]} />
            </li>
          {/each}
        </ul>
        <input type="submit" value="Überprüfen" class="cursor-pointer hover:shadow-md hover:shadow-success/30 transition duration-75"/>
      </form>
    </div>
    <ul class="flex w-full flex-col gap-4">
      <button class="btn" on:click={generateNumber}><ShuffleIcon /> Shuffle</button>
      <button class="btn"><SettingsIcon /> Optionen</button>
    </ul>
  </main>
  <footer class="flex justify-center py-2 text-neutral-300">
    <a href="https://flxw.dev/legal" target="_blank">Impressum</a>
  </footer>
</div>
