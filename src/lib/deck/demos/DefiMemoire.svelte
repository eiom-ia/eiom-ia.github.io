<script>
  import Logo from '../Logo.svelte';
  const S = [
    { logo: 'mempalace', n: 'MemPalace', d: 'stockage local par couches et rappel ciblé' },
    { n: 'Mem0', d: 'extrait des faits et préférences réutilisables' },
    { n: 'Letta', d: 'maintient des blocs de mémoire dans un agent avec état' },
    { logo: 'nousresearch', n: 'Hermes', d: 'relit ses sessions et transforme l’expérience en skills' }
  ];
</script>

<div class="dm">
  <div class="oubli"><span>SESSION 1</span><span>SESSION 2</span><span>SESSION 3</span><div class="vide">nouvelle session<br /><strong>?</strong></div></div>
  <div class="passage">ce qui mérite<br />d'être gardé →</div>
  <div class="memoire"><strong>MÉMOIRE PERSISTANTE</strong><span>faits</span><span>préférences</span><span>décisions</span><span>procédures</span></div>
  <p class="regle"><strong>Le défi n'est pas de tout garder.</strong> C'est de rappeler la bonne chose, au bon moment, sans remplir le contexte de bruit.</p>
  <div class="initiatives">
    {#each S as s}
      <article>{#if s.logo}<Logo nom={s.logo} alt={s.n} taille="2.2em" />{:else}<span class="initiale">{s.n[0]}</span>{/if}<div><strong>{s.n}</strong><p>{s.d}</p></div></article>
    {/each}
  </div>
</div>

<style>
  .dm { display: grid; grid-template-columns: 1fr auto 1.05fr; gap: 0.65em; align-items: center; width: 100%; }
  .oubli { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.3em; }
  .oubli > span { border: 2px solid var(--dk-filet); padding: 0.55em 0.25em; color: var(--dk-gris); font-size: 0.51em; text-align: center; text-decoration: line-through; }
  .vide { grid-column: 1 / -1; border: 3px solid var(--dk-encre); padding: 0.6em; text-align: center; font-size: 0.62em; }.vide strong { color: var(--dk-accent); font-size: 1.8em; }
  .passage { color: var(--dk-accent); font-size: 0.57em; text-align: center; }
  .memoire { border: 4px double var(--dk-accent); padding: 0.7em; display: grid; grid-template-columns: 1fr 1fr; gap: 0.35em; }.memoire strong { grid-column: 1 / -1; color: var(--dk-accent); font-size: 0.64em; }.memoire span { border: 1px solid var(--dk-gris-2); padding: 0.35em; font-size: 0.56em; }
  .regle { grid-column: 1 / -1; border-left: 0.35em solid var(--dk-accent); padding-left: 0.7em; font-size: 0.75em; }
  .initiatives { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.55em; }
  article { border-top: 3px solid var(--dk-encre); padding-top: 0.45em; display: flex; gap: 0.45em; align-items: flex-start; }article strong { font-size: 0.62em; }article p { color: var(--dk-gris); font-size: 0.5em; line-height: 1.25; }
  .initiale { display: grid; place-items: center; width: 2.2em; height: 2.2em; flex: none; color: white; background: var(--dk-accent); font-weight: 600; }
</style>
