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

Prochainement ici vous pourrez proposer vos exercice
{{< rawhtml >}}
<html>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
<script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>

<form action="../upload.php" method="post" enctype="multipart/form-data" >

<input type="text" value="titre" name="titre">
<textarea name="content" id="filename"></textarea>
<input type="submit" value="Envoyer proposition" name="submit">

</form>

<script>
simplemde = new SimpleMDE({
        element: document.getElementById("filename"),
        spellChecker: false,
    });
simplemde.value("This text will appear in the editor");
</script>
</html>
{{< rawhtml >}}
