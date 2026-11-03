# Derby Training

Site statique généré avec Hugo et le thème PaperMod. À chaque push sur `main`, GitHub Actions construit le site et le publie sur GitHub Pages.

## Activer GitHub Pages

1. Dans le dépôt GitHub, ouvrez **Settings → Pages**.
2. Dans **Build and deployment**, choisissez **GitHub Actions** comme source.
3. Envoyez les changements sur la branche `main` ou lancez manuellement l'action **Deploy Hugo site to GitHub Pages** dans l'onglet **Actions**.
4. Dans **Settings → Pages → Custom domain**, vérifiez `www.derby-training.com` et activez **Enforce HTTPS** une fois que GitHub a terminé la vérification DNS.
5. Dans la gestion DNS du domaine, ajoutez un enregistrement **CNAME** pour `www` pointant vers `cpt-crunch.github.io`. Le fichier `static/CNAME` est publié automatiquement avec le site. Si vous voulez aussi que le domaine nu `derby-training.com` fonctionne, configurez une redirection vers `www.derby-training.com` chez votre fournisseur DNS.

Le site est servi en HTTPS sur [www.derby-training.com](https://www.derby-training.com). Si vous choisissez une autre adresse, modifiez `baseURL` dans `config.yml` ainsi que `static/CNAME`.

## Contenu

Les exercices sont des fichiers Markdown dans `content/exercices/`. Hugo génère automatiquement le catalogue `/exercices/`, ses filtres par tags et les fiches individuelles. Pour publier un exercice, ajoutez un fichier Markdown dans ce dossier.

La page `/entrainement/` permet de composer, chronométrer, réordonner, imprimer et générer aléatoirement une séance. Les séances sont enregistrées dans le navigateur. Ajoutez `duration: 15` au front matter d'un exercice pour définir sa durée suggérée en minutes ; la valeur par défaut est 10 minutes.

Les fichiers PHP historiques restent dans le dépôt. Hugo les exclut de la génération et l'action de déploiement retire également les anciennes sorties PHP du dossier `public/` avant publication. Aucun code PHP n'est donc publié ou exécuté par GitHub Pages.

## Construire en local

Installez Hugo Extended 0.90.1, puis lancez :

```sh
hugo --minify
```

Le site généré se trouve dans `public/`.
