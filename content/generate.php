<?php
$FILES = scandir(realpath(dirname(__FILE__)));
foreach($FILES as $FILE)
        if($FILE == "." || $FILE == ".." || $FILE ==  __FILE__) continue;
        else include($FILE);
?>
