<?php

// Afrendy Bayu, 17 Jan 2014 //
include '../connection.php';

try {
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['cause']))	{ $cause = $_GET['cause']; } else { $cause = '';	}
	
	$s = "SELECT * FROM sap ";
	
	if (strlen($cause)>0)	{
		$s .= "WHERE cause LIKE '%$cause%'";
	}
	//echo "sql: $s";
	
	//return;
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	$sap = array(); $strcat;
	while ($row = mysql_fetch_assoc($q)) {
		$sap[] = $row;
	}
	
	mysql_free_result($q);

    $jsonResult = array(
        'success' => true,
        'sapcause' => $sap
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

//echo json_encode($isi);
echo json_encode($jsonResult);
?>

