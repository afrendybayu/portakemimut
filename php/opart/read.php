<?php
// Afrendy Bayu, 2 Des 2013 //

include '../connection.php';

try {
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['unit']))	{ $unit = $_GET['unit']; } 
	else { 
		throw new Exception("Unit tidak sesuai");
	}
	//echo "tipe: $tipe<br/>";
	
	/*
	$s = "SELECT cause.nama,cause,count(*) AS jml, ".
		 "TRUNCATE((100*count(*)/(select count(*) from sap)),2) as persen ".
		 "FROM sap ".
		 "LEFT JOIN cause on cause.kode = sap.cause ".
		 "GROUP BY cause ORDER BY jml DESC;";
	//*/
	
	$s = "SELECT cat FROM equip where unit_id=$unit order by nama asc";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	$cat = array(); $strcat;
	while ($row = mysql_fetch_assoc($q)) {
		$cat[] = "cat = '{$row['cat']}'";
	}
	$strcat = join(" or ", $cat);
	//print_r($cat); echo "<br/><br/>strcat: $strcat<br/><br/>";
	
	$s = "SELECT id,cat,nama FROM opart where $strcat order by cat asc";
	$q = db_query($s);
	
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	$part = array(); $strmode;
	while ($row = mysql_fetch_assoc($q)) {
		$part[] = $row;
	}
	//print_r($mode); //echo "<br/><br/>strcat: $strcat<br/><br/>";
	
	//return;
	mysql_free_result($q);

	$isi = array();
	foreach ($part as $data)	{
		array_push($isi, $data);
	}
	
    $jsonResult = array(
        'success' => true,
        'opart' => $part
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
