<?php 
# this code create file from post form
$titre = $_POST["titre"];
$file = "proposed/" . $_POST["titre"] . ".md"; 
$data = $_POST["content"];
$email = $_POST["email"];
$auteur = $_POST["auteur"];

$templated =<<<EOD
<!--$email-->
---
title: "$titre"
date: 2020-09-10T11:30:03+00:00
weight: 20
aliases: ['/Contact']
tags : ['Contact', 'Reformation', 'Explosivité'] 
author: "$auteurl"
showToc: false
TocOpen: false
draft: false
hidemeta: false
disableShare: true
cover:
  image: '<image path/url>'
  alt: '<alt text>'
  caption: '<text>'
comments: true
---

$data
EOD;

echo $template;
#echo $file;
file_put_contents($file, $templated);
header("Location: http://www.derby-training.com/");
?>
