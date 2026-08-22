<script>
  import '@fontsource/fraunces/400.css';
  import '@fontsource/fraunces/600.css';
  import '@fontsource/libre-franklin/400.css';
  import '@fontsource/libre-franklin/600.css';
  import '@fontsource/jetbrains-mono/400.css';
  import '$lib/styles/tokens.css';
  import '$lib/styles/base.css';
  import { page } from '$app/state';
  import Nav from '$lib/components/Nav.svelte';

  let { children } = $props();
  // Les decks occupent tout l'écran: pas de barre de navigation par-dessus.
  const pleinEcran = $derived(
    page.url.pathname.startsWith('/diapos') || /^\/prototypes\/[a-z]/.test(page.url.pathname)
  );
</script>

{#if !pleinEcran}<Nav />{/if}
{@render children()}
