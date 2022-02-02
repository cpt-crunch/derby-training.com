<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function get_string_between($string, $start, $end){
	$string = " ".$string;
	$ini = strpos($string,$start);
	if ($ini == 0) return "";
	$ini += strlen($start);   
	$len = strpos($string,$end,$ini) - $ini;
	return substr($string,$ini,$len);
}

function extract_exercise($filename){
        $f = fopen($filename, 'r');

	if ($f) {
		$contents = fread($f, filesize($filename));
    		fclose($f);
	}

	$parsed = get_string_between($contents, "class=\"main\">", "<footer");
	return $parsed;
}

$path = "/var/www/html/exercices/";
$exercises_dir = preg_grep('/^([^.])/', scandir($path, 0));
$parsable_exercises = array();

foreach($exercises_dir as $exercise){
	if (is_dir($path . $exercise) && ($path . $exercise !=  "/var/www/html/exercices/page")){
		array_push($parsable_exercises, $path . $exercise);
	}
}

$rand_keys = array_rand($parsable_exercises, 3);

echo extract_exercise($parsable_exercises[$rand_keys[0]] . "/index.html");
echo extract_exercise($parsable_exercises[$rand_keys[1]] . "/index.html");
echo extract_exercise($parsable_exercises[$rand_keys[2]] . "/index.html");


#$result = extract_exercise($filename = "/var/www/html/exercices/the_drill/index.html");
#echo $result;

?>
