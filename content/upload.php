<?php 
# this code create file from post form
$file = "/tmp/proposed/" . echo $_POST["titre"] . "/md"; 
$data = $_POST["content"];

file_put_contents($file, $_POST["content"]);

?>
