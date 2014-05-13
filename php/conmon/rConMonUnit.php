<?php

// Afrendy Bayu, 17 Feb 2014 //
include '../connection.php';

try {
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['unit']))	{ $unit = $_GET['unit']; } else { $unit = 3;	}
	
	$s = "SELECT cause.nama,cause as kode,count(*) AS jml, ".
		 "TRUNCATE((100*count(*)/(select count(*) from sap)),2) as persen ".
		 "FROM sap ".
		 "LEFT JOIN cause on cause.kode = sap.cause ".
		 "GROUP BY cause ORDER BY jml DESC;";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	/*
	$sap = array();
	while ($row = mysql_fetch_assoc($q)) {
		$row['param'] = 'cau';
		$sap[] = $row;
	}
	//*/
	mysql_free_result($q);
	
	$sap = array();
	$obj1 = new stdClass();
	$obj1->thn = '2012';
	$obj1->gp = '122';
	$obj1->gs = '45';
	$obj1->pm = '109';
	array_push($sap,$obj1);
	
	$obj = new stdClass();
	$obj->thn = '2013';
	$obj->gp = '115';
	$obj->gs = '53';
	$obj->pm = '26';
	array_push($sap,$obj);
	
	$obj2 = new stdClass();
	$obj2->thn = '2014';
	$obj2->gp = '7';
	$obj2->gs = '5';
	$obj2->pm = '0';
	array_push($sap,$obj2);

    $jsonResult = array(
        'success' => true,
        'conmonunit' => $sap
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

