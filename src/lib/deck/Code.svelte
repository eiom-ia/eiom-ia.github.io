<script>
  import { surlignerR } from './surligner.js';
  let { src, titre = '', petit = false } = $props();
</script>

<figure class="bloc-code" class:petit>
  {#if titre}<figcaption>{titre}</figcaption>{/if}
  <pre><code>{@html surlignerR(src.trim())}</code></pre>
</figure>
