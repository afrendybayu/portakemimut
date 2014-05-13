<?php

include '../connection.php';

try {
	$params = json_decode(file_get_contents('php://input'));
	
	//print_r($params);
	//echo "eq: ".$params->eq.", rh: ".$params->rh;
	$tgl = substr($params->tgl,-6);
	
    $sql = "INSERT INTO rh_201311 (eq, rh, tgl, cat) VALUES ('{$params->eq}', '{$params->rh}', '{$tgl}', '{$params->cat}')";
    //echo $sql;
    //*
    $q = db_query($sql);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	//*/
    $jsonResult = array(
        'success' => true,
        'tasks' => $params
    );
} catch(Exception $e) {
	$jsonResult = array(
		'success' => false,
		'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);    
    
    
?>
