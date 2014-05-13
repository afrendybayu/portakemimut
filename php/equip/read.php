<?php
// Afrendy Bayu, 3 Des 2013 //
//ini_set( "display_errors", 0);
include '../connection.php';

try {
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['unit']))	{ $unit = $_GET['unit']; } else { $unit = 3;	}
	//echo "tipe: $tipe<br/>";
	//$unit = 3;
	$s = "SELECT id,kode,tag,cat FROM equip where unit_id=$unit order by nama asc";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	$eq = array(); $strcat; $loop=0;
	while ($row = mysql_fetch_assoc($q)) {
		$eq[$loop]['idt'] = $row['id'];
		$eq[$loop]['cat'] = $row['cat'];
		$eq[$loop]['nama'] = $row['kode']." ".$row['tag'];
		$loop=$loop+1;
	}
	
	mysql_free_result($q);
	//print_r($eq); echo "<br/><br/>";
	$isi = array();
	foreach ($eq as $data)	{
		@array_push($isi[], $data);
	}
	//print_r($isi); echo "<br/><br/>";
	
    $jsonResult = array(
        'success' => true,
        'equip' => $eq
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
