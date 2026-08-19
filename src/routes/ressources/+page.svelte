<script>
  import Prose from '$lib/components/Prose.svelte';
  import Encadre from '$lib/components/Encadre.svelte';
  import { FOURNISSEUR, URL_VERIFICATEUR, CONTACT } from '$lib/data/config.js';
</script>

<svelte:head><title>Ressources — Parcours IA, EIOM 2026</title></svelte:head>

<Prose>
  <h1>Ressources</h1>

  <h2>Accès aux modèles</h2>
  <p>
    Le parcours utilise <strong>{FOURNISSEUR.nom}</strong> au palier gratuit, appelé depuis R par la
    fonction <code>{FOURNISSEUR.fonctionR}()</code> du paquet <code>ellmer</code>. Le modèle est
    épinglé explicitement à <code>{FOURNISSEUR.modele}</code> : ne jamais s'en remettre à la valeur
    par défaut, qui change d'une version à l'autre et rend un résultat irreproductible.
  </p>
  <p>Quota du palier gratuit : {FOURNISSEUR.quota}.</p>

  <h2>Dépannage</h2>
  <p>Relancer la vérification à tout moment :</p>
  <pre><code>source("{URL_VERIFICATEUR}"); verifier_installation()</code></pre>

  <h3>R ne voit pas ma clé</h3>
  <p>
    Dans neuf cas sur dix, R n'a pas été redémarré après la modification de <code>.Renviron</code>.
    Menu « Session », puis « Restart R ». Le fichier n'est lu qu'au démarrage.
  </p>

  <h3>J'obtiens une erreur 429</h3>
  <p>
    Le quota par minute est atteint. Attendez une minute, puis ralentissez vos appels. Ce n'est pas
    une panne : c'est la limitation de débit, et savoir la gérer fait partie du métier.
  </p>

  <h3>J'obtiens une erreur 404 sur le nom du modèle</h3>
  <p>
    Le modèle a été retiré ou renommé. Les catalogues changent vite. Listez les modèles réellement
    disponibles avec <code>ellmer::models_google_gemini()</code> plutôt que de deviner un nom.
  </p>

  <Encadre ton="rose" titre="La règle qui ne souffre pas d'exception">
    <p>
      Une clé d'API ne s'écrit jamais dans un script et ne se dépose jamais dans un dépôt Git. Elle
      vit dans <code>.Renviron</code>, et nulle part ailleurs.
    </p>
  </Encadre>

  <h2>Glossaire</h2>
  <dl>
    <dt>Jeton (<em>token</em>)</dt>
    <dd>
      Unité de découpage du texte par le modèle : ni un mot, ni un caractère. Le français en consomme
      davantage que l'anglais à contenu égal, ce qui coûte plus cher et remplit le contexte plus vite.
    </dd>
    <dt>Fenêtre de contexte</dt>
    <dd>Quantité maximale de texte que le modèle peut considérer d'un coup, question et réponse comprises.</dd>
    <dt>Température</dt>
    <dd>
      Paramètre réglant le caractère aléatoire de la génération. Une température nulle rend les
      sorties plus stables — ce qu'on veut en recherche, sans que cela garantisse le déterminisme.
    </dd>
    <dt>Sortie structurée</dt>
    <dd>
      Contrainte imposée au modèle de répondre selon un schéma défini d'avance. C'est ce qui transforme
      une sortie de modèle en variable exploitable, plutôt qu'en texte à découper après coup.
    </dd>
    <dt>Modèle open weights</dt>
    <dd>
      Modèle dont les poids sont publiés et peuvent être exécutés sur sa propre machine : confidentialité
      des données, reproductibilité, et coût maîtrisé.
    </dd>
    <dt>MCP</dt>
    <dd>
      <em>Model Context Protocol</em> — protocole standardisant la façon dont un agent se branche à des
      outils et à des sources de données extérieures.
    </dd>
  </dl>

  <h2>Nous joindre</h2>
  <p>Une question avant ou pendant la semaine : <a href="mailto:{CONTACT}">{CONTACT}</a>.</p>
</Prose>

<style>
  dl { margin: 1em 0; }
  dt { font-weight: 600; color: var(--ink); margin-top: 1em; }
  dd { margin: 0.2em 0 0; color: var(--ink-2); }
</style>
