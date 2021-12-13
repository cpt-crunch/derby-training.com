<?php
$dir    = '/var/www/html/proposed';
$files = array_diff(scandir($dir), array('..', '.'));
foreach ($files as $file) {
	echo $file;

}
?>
