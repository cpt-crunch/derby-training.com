<html>
<h1>Admin page</h1>
<?php 
echo $_POST['subject']; 
$dir    = '/var/www/html/proposed/' . $_POST['subject'];
echo $dir . "/n";
$file = file_get_contents($dir , true);
echo $file;
?>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
<link rel="stylesheet" href="/css/btnstyle.css"/>

<script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>

<form action="../upload.php" method="post" enctype="multipart/form-data" >

<textarea style="background-color: transparent;" name="content" id="filename"></textarea>

<button class="button-82-pushable" role="button">
  <span class="button-82-shadow"></span>
  <span class="button-82-edge"></span>
  <span class="button-82-front text">
   <input class="button-82-front text" type="submit" value="Envoyer proposition" name="submit">
  </span>
</button>

</form>

<script>
simplemde = new SimpleMDE({
        element: document.getElementById("filename"),
        spellChecker: false,
    });
simplemde.value("Admin Content");
</script>

</html>
