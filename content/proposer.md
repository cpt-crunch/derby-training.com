---
tittle: "Proposer un exercice"
hidemeta: false
disableShare: true
cover:
  image: '<image path/url>'
  alt: '<alt text>'
  caption: '<text>'
comments: true
---

# Proposer un exercice

Le formulaire ci-dessous vous permet de proposer un exercice, celui-ci sera soumis a validation avant d'être posiblement integré au site.

{{< rawhtml >}}
<html>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
<script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>

<form action="../upload.php" method="post" enctype="multipart/form-data" >


<input type="email" value="email" name="email">

<input type="text" value="titre" name="titre">
<textarea name="content" id="filename"></textarea>
<input type="submit" value="Envoyer proposition" name="submit">

</form>

<script>
simplemde = new SimpleMDE({
        element: document.getElementById("filename"),
        spellChecker: false,
    });
simplemde.value("- Prérequis : 3 Mètres de track \n- Level : 3/5 \n- Blocker : Travailler le contact et la reformation \n- Jammer: Travailler le contact et l’esquive \n### Déroulement \n### Variante  \n### Points d’attention ");
</script>
</html>
{{< rawhtml >}}
