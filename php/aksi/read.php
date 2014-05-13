<?php

// Afrendy Bayu, 3 Des 2013 //
include '../connection.php';

try {
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['unit']))	{ $unit = $_GET['unit']; } else { $unit = 3;	}
	//echo "tipe: $tipe<br/>";
	$unit = 3;
	$s = "SELECT id,nama,ket FROM aksi order by nama asc";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	$aksi = array(); $strcat;
	while ($row = mysql_fetch_assoc($q)) {
		$aksi[] = $row;
	}
	
	mysql_free_result($q);

	/*
	$isi = array();
	foreach ($fas as $data)	{
		array_push($isi, $data);
	}
	//*/
    $jsonResult = array(
        'success' => true,
        'aksi' => $aksi
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

