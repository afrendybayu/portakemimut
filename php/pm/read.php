<?php

// AfrendyBayu, 30Dec2013 //
// NgantorDiPortakemCeria //

include '../connection.php';

try {
	if (isset($_GET['unit']))	{ 
		$unit = $_GET['unit']; 
	} else { 
		throw new Exception("ID Unit Tidak Ada");
		//$unit = 3;	
	}
	$sql = "SELECT id,kode,cat FROM equip WHERE unit_id='$unit'";
	//$sql = "SELECT id,kode,cat FROM equip WHERE unit_id='54'";
	//echo "sql: $sql<br/>";
	$q = db_query($sql);
	
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	
	$arreq = array();	$arid=array();
	while ($row = mysql_fetch_assoc($q)) {
	//	$row['text'] = '['.$row['id'].'] '.$row['text'];
		$arreq[] = $row;
		$arid[] = $row['cat'];
	}
	mysql_free_result($q);
	//echo "Equipment: "; print_r($arreq); echo "<br/>";
	//echo "ID: "; print_r($arid); echo "<br/>";
	
	if (count($arreq)==0) {
		throw new Exception("Pemetaan Equipment dalam Unit ini tidak ada.");
	}
	
	//$tcat = 'c9c10';
	//$level = substr($tcat,0,1);
	//$cat = explode('c',$arid);

	$sqlcat = implode("' or eqcat='",$arid);
	$sql =	"select pmdef.id,eqcat,cat_equip.nama as cat, kode, durasi,pmdef.nama from pmlist ".
			"left join pmdef on pmdef.id = pmlist.pm ".
			"left join cat_equip on cat_equip.id = pmlist.eqcat ".
			"where eqcat='$sqlcat' ".
			//"where eqcat=9 or eqcat=10 ".
			"order by kode asc, durasi asc";
	//echo "sql: $sql<br/>";
	$q = db_query($sql);

	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	
	$arr = array(); $k=0;
	while ($row = mysql_fetch_assoc($q)) {
		$z=0;
		for ($z=0; $z<count($arreq); $z++)	{
			if ($row['eqcat']==$arreq[$z]['cat'])
				$arr[$k]['id'] = 'e'.$arreq[$z]['id'].'pm'.$row['id'];
				//$arr[$k]['id'] = 'id'.$row['id'].'c'.$arreq[$z]['cat'];
		}
		
		//$arr[$k]['id'] = $row['id'];
		$arr[$k]['cat'] = $row['eqcat'];
		$arr[$k]['nama'] = '['.$row['kode'].'] '.$row['nama'];
		$k++;
	}
	mysql_free_result($q);
	//echo "pm: "; print_r($arr); echo "<br/>";
	
	if (count($arr)==0) {
		throw new Exception("Pemetaan PM pada Equipment tidak ada.");
	}
	
    $jsonResult = array(
        'success' => true,
        'pm' => $arr
    );
    
   
    
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);

?>
