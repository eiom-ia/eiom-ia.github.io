<script>
  import '@fontsource/eb-garamond/400.css';
  import '@fontsource/eb-garamond/400-italic.css';
  import '@fontsource/eb-garamond/500.css';
</script>

<article class="entree" aria-label="Définition du mot agent présentée comme une entrée de dictionnaire">
  <header>
    <span class="mot">agent, agente</span>
    <span class="pron">[aʒɑ̃, aʒɑ̃t]</span>
  </header>
  <p class="nature">nom <abbr title="masculin">m.</abbr> et <abbr title="féminin">f.</abbr></p>
  <p class="origine">
    <strong>ÉTYM.</strong> 1337 comme adjectif ; 1680 comme nom ; du latin <i>agens</i>, participe
    présent de <i>agere</i>, « agir ».
  </p>
  <ol>
    <li>
      <span class="sens">Celui qui exerce une action</span>, par opposition au <i>patient</i>, qui la
      subit. <span class="dom">(philosophie)</span>
    </li>
    <li>
      <span class="sens">Personne qui, dans un domaine limité, exerce une action d'exécution</span>
      pour le compte d'une autorité publique ou privée. <i>Agent immobilier. Agent de voyage.</i>
    </li>
    <li class="retenu">
      <span class="marque">INTELL. ARTIF.</span>
      <span class="sens">« Entité physique ou virtuelle capable de percevoir son environnement et
      d'agir sur lui. »</span>
      <div class="notule">
        Un agent peut être un logiciel ou un robot. Plusieurs agents qui interagissent forment un
        <i>système multiagent</i>.
      </div>
    </li>
  </ol>
  <footer>
    <span>1 et 2 · Trésor de la langue française</span>
    <span>3 · Office québécois de la langue française, 2020</span>
  </footer>
</article>

<style>
  .entree {
    width: 100%;
    box-sizing: border-box;
    border-top: 0.28em solid #8f1822;
    border-bottom: 1px solid #8c8578;
    background: #f4efe3;
    color: #1e1b17;
    padding: 1.15em 1.4em 0.9em;
    font-family: 'EB Garamond', Georgia, serif;
  }
  header { display: flex; align-items: baseline; gap: 0.7em; border-bottom: 1px solid #8c8578; }
  .mot { font-size: 2.55em; font-weight: 500; line-height: 1; letter-spacing: -0.035em; }
  .pron { color: #655f56; font-size: 0.8em; }
  .nature { margin: 0.2em 0 0; font-size: 0.82em; font-style: italic; color: #8f1822; }
  .origine { margin: 0.55em 0 0.7em; font-size: 0.72em; color: #655f56; }
  ol { margin: 0; padding: 0; list-style: none; counter-reset: sens; }
  li {
    counter-increment: sens;
    position: relative;
    padding: 0.38em 0 0.42em 2.05em;
    border-top: 1px solid #d1c8b8;
    font-size: 1em;
    line-height: 1.3;
  }
  li::before {
    content: counter(sens);
    position: absolute;
    left: 0;
    top: 0.32em;
    width: 1.35em;
    height: 1.35em;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: #8f1822;
    font-size: 0.72em;
    font-family: Georgia, serif;
  }
  .sens { font-weight: 500; }
  .retenu { background: #e9dfca; padding-right: 0.65em; }
  .marque {
    display: inline-block;
    margin-right: 0.35em;
    padding: 0.08em 0.35em;
    color: white;
    background: #8f1822;
    font-family: var(--dk-mono);
    font-size: 0.54em;
    letter-spacing: 0.08em;
    vertical-align: 0.2em;
  }
  .dom { color: #655f56; font-style: italic; font-size: 0.85em; }
  .notule { margin-top: 0.35em; color: #4a453d; font-size: 0.7em; line-height: 1.3; }
  footer { display: flex; justify-content: flex-end; gap: 1.4em; margin-top: 0.55em; color: #655f56; font-size: 0.46em; letter-spacing: 0.08em; font-family: var(--dk-mono); }
</style>
