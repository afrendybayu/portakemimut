<?php
// Afrendy Bayu, 2 Des 2013 //

include '../connection.php';

try {
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['unit']))	{ $unit = $_GET['unit']; } 
	else { 
		throw new Exception("Unit tidak sesuai");
	//	$unit = 3;	
	}
	//echo "tipe: $tipe<br/>";
	//$unit = 3;
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
	
	$s = "SELECT id, cat,kode,nama FROM failuremode where $strcat order by cat asc";
	$q = db_query($s);
	
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	$mode = array(); $strmode; $jml=0;
	while ($row = mysql_fetch_assoc($q)) {
		$mode[$jml]["id"] = $row['id'];
		$mode[$jml]["nama"] = $row['kode']." - ".$row['nama'];
		$mode[$jml]["cat"] = $row['cat'];
		$mode[$jml]["kode"] = $row['kode'];
		$jml++;
	}
	//print_r($mode); //echo "<br/><br/>strcat: $strcat<br/><br/>";
	
	//return;
	mysql_free_result($q);
	/*
	$isi = array();
	foreach ($fas as $data)	{
		array_push($isi, $data);
	}
	//*/
    $jsonResult = array(
        'success' => true,
        'mode' => $mode
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
