<?php

// Afrendy Bayu, 17 Jan 2014 //
include '../connection.php';

try {
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['unit']))	{ $unit = $_GET['unit']; } else { $unit = 3;	}
	
	$s = "SELECT damage.nama,damage as kode,count(*) AS jml, ".
		 "TRUNCATE((100*count(*)/(select count(*) from sap)),2) as persen ".
		 "FROM sap ".
		 "LEFT JOIN damage on damage.kode like sap.damage ".
		 "GROUP BY damage ORDER BY jml DESC;";
	//echo "sql: $s<br/>";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	$sap = array();
	while ($row = mysql_fetch_assoc($q)) {
		$row['param'] = 'dam';
		$sap[] = $row;
	}
	
	mysql_free_result($q);

    $jsonResult = array(
        'success' => true,
        'sapdamage' => $sap
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

