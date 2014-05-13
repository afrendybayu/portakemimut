<?php

// Afrendy Bayu, 18 Jan 2014 //
include '../connection.php';

try {
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['unit']))	{ $unit = $_GET['unit']; } else { $unit = 3;	}
	
	$s = "SELECT opart.nama,opart,count(*) AS jml FROM sap ".
		 "LEFT JOIN opart on opart.kode like sap.opart ".
		 "GROUP BY opart ORDER BY opart DESC;";
	//*/
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	$sap = array();
	while ($row = mysql_fetch_assoc($q)) {
		$sap[] = $row;
	}
	
	mysql_free_result($q);

    $jsonResult = array(
        'success' => true,
        'sapopart' => $sap
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

