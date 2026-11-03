# Derby Training

Site statique généré avec Hugo et le thème PaperMod. À chaque push sur `main`, GitHub Actions construit le site et le publie sur GitHub Pages.

## Activer GitHub Pages

1. Dans le dépôt GitHub, ouvrez **Settings → Pages**.
2. Dans **Build and deployment**, choisissez **GitHub Actions** comme source.
3. Envoyez les changements sur la branche `main` ou lancez manuellement l'action **Deploy Hugo site to GitHub Pages** dans l'onglet **Actions**.
4. Si un ancien domaine personnalisé est configuré dans **Settings → Pages**, supprimez-le pour revenir à l'adresse GitHub Pages.
5. Une fois le déploiement terminé, le site sera disponible sur [https://cpt-crunch.github.io/derby-training.com/](https://cpt-crunch.github.io/derby-training.com/).

L'adresse publique est configurée dans `baseURL` de `config.yml`. Hugo génère les liens canoniques et les ressources avec ce préfixe de projet GitHub Pages.

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
