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
<!DOCTYPE HTML>
<html>
<body>

<iframe id="exercice1" src=""></iframe>
<iframe id="exercice2" src=""></iframe>

<iframe id="exercice3" src=""></iframe>
<iframe id="exercice4" src=""></iframe>

<button onclick="myFunction()">Generer un entrainement</button>


<script>
function myFunction() {
  var exercices = ["https://cpt-crunch.github.io/exercices/quick_start/", "https://cpt-crunch.github.io/exercices/the_drill/", "https://cpt-crunch.github.io/exercices/tracking/"];
  var randomItem = exercices[Math.floor(Math.random()*exercices.length)];

  document.getElementById("exercice1").src = randomItem;
  var randomItem = exercices[Math.floor(Math.random()*exercices.length)];
  document.getElementById("exercice2").src = randomItem;
  var randomItem = exercices[Math.floor(Math.random()*exercices.length)];
  document.getElementById("exercice3").src = randomItem;
  var randomItem = exercices[Math.floor(Math.random()*exercices.length)];
  document.getElementById("exercice4").src = randomItem;
}
</script>

</body>
</html>
