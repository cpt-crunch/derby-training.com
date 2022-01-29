<html>
<h1>Admin page</h1>

<?php echo "Here the proposed exercices";?>

<form action="/admin_lookup.php" method="post" enctype="multipart/form-data" >

<?php
$dir    = '/var/www/html/proposed';
$files = array_diff(scandir($dir), array('..', '.'));

echo "<ul>";
foreach ($files as $file) {
        echo "<li>" . "<input name=\"subject\"  type=\"submit\" value=\"" . $file . "\">" ;
}
echo "</ul>";
?>
</form>

</html>
