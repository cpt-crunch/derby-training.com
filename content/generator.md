---
tittle: "Generateur d'entrainement"
hidemeta: false
disableShare: true
cover:
  image: '<image path/url>'
  alt: '<alt text>'
  caption: '<text>'
comments: true
---

# Generateur d'entrainement
Voici 3 exercices sélectionnés aléatoirement

Ces exercices ne te plaisent pas ? Rafraîchit la page !

{{< rawhtml >}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<p class="broken"></p>

<script>
$.ajax({
  method: "GET",
  url: "../generate.php",
  data: { text: $("p.unbroken").text() }
})
  .done(function( response ) {
    $("p.broken").html(response);
  });
</script>

{{< rawhtml >}}


