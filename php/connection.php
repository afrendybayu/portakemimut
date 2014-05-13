
<?php

//include("global.inc.php");

$server =  'localhost';//'192.168.1.140';
$username = 'root' ;// 'root';
$password = 'tentakel';//'monita2010';
$database = 'medco';//'monita3';
//$database = 'medco2';//'monita3';

/*
$server =  'localhost';
$username = 'k0761953_medco';
$password = 'monita2013';
$database = 'k0761953_medco';
//*/

//Make the database connection.
$q = db_connect($server, $username, $password, $database) or die('Unable to connect to database server!');
//echo "masuk database $q<br/>";


function db_connect($server = 'localhost', $username = 'root', $password = 'diesel', $database = 'asmat_medco', $link = 'db_link') {
//function db_connect($server, $username, $password, $database, $link = 'db_link') {
    global $$link;

    $$link = mysql_connect($server, $username, $password);

    if ($$link) mysql_select_db($database);

    return $$link;
  }
//Function to handle database errors.
  function db_error($query, $errno, $error) { 
    die('<font color="#000000"><b>' . $errno . ' - ' . $error . '<br><br>' . $query . '<br><br><small><font color="#ff0000">[STOP]</font></small><br><br></b></font>');
	echo "error";
  }
//Function to query the database.
  function db_query($query, $link = 'db_link') {
    global $$link;

    $result = mysql_query($query, $$link) or db_error($query, mysql_errno(), mysql_error());

    return $result;
  }
//Get a row from the database query
  function db_fetch_array($db_query) {
    return mysql_fetch_array($db_query, MYSQL_ASSOC);
  }
  
  function db_fetch_object($db_query) {
	return mysql_fetch_object($db_query);
  }
  
  function db_fetch_row($db_query) {
	return mysql_fetch_row($db_query);
  }
  
  function db_fetch_field($db_query) {
	return mysql_fetch_field($db_query);
  }
  
//The the number of rows returned from the query.
  function db_num_rows($db_query) {
    return mysql_num_rows($db_query);
  }
//Get the last auto_increment ID.
  function db_insert_id() {
    return mysql_insert_id();
  }
//Add HTML character incoding to strings
  function db_output($string) {
    return htmlspecialchars($string);
  }
//Add slashes to incoming data
  function db_input($string, $link = 'db_link') {
    global $$link;

    if (function_exists('mysql_real_escape_string')) {
      return mysql_real_escape_string($string, $$link);
    } elseif (function_exists('mysql_escape_string')) {
      return mysql_escape_string($string);
    }

    return addslashes($string);
  }


//echo " sukses<br/>";
?>
