<?php
// Afrendy Bayu, 25 Jan 2014
//   SokaKetikaSaatSendiri

include '../connection.php';
include '../util.php';

$th = date("Y");
$bl = date("n");
//echo "th: $th, bln: $bl<br>";

try {
		
		$s = "select cat, sum(rh) as av,sum(rh_re) as re,count(id) as jmleq from rh_201311 where thn=$th and bln=$bl group by cat";
		//echo "sql: $s<br/>";
		$q = db_query($s);
		if (!$q)	{
			echo "DB Error, could not query the database\n";
			echo 'MySQL Error: ' . mysql_error();
			exit;
		}
		
		$arAvRe = array();
		while ($row = mysql_fetch_assoc($q)) {
			$arAvRe['b'][$row['cat']]['av'] = ($row['av']*100)/($row['jmleq']*24);
			$arAvRe['b'][$row['cat']]['re'] = ($row['re']*100)/($row['jmleq']*24);
			//echo "ID: {$row['cat']}, AV: {$row['av']}, RE: {$row['av']}, JML: {$row['jmleq']}<br/>";
		}
		
		
		
		$s = "select cat, sum(rh) as av,sum(rh_re) as re,count(id) as jmleq from rh_201311 where thn=$th group by cat;";
		//echo "sql: $s<br/>";
		$q = db_query($s);
		if (!$q)	{
			echo "DB Error, could not query the database\n";
			echo 'MySQL Error: ' . mysql_error();
			exit;
		}
		
		while ($row = mysql_fetch_assoc($q)) {
			$arAvRe['a'][$row['cat']]['av'] = ($row['av']*100)/($row['jmleq']*24);
			$arAvRe['a'][$row['cat']]['re'] = ($row['re']*100)/($row['jmleq']*24);
			//echo "ID: {$row['cat']}, AV: {$row['av']}, RE: {$row['av']}, JML: {$row['jmleq']}<br/>";
		}
		 
		
		
		mysql_free_result($q);
		//print_r($arAvRe);
	
	// 5 compressor
	// 6 pump
	// 7 genset
	
	$arAR = array();
	
	$obj1 = new stdClass();
	$obj1->th1 = '0';
	$obj1->avg = $arAvRe['a'][5]['av'];
	$obj1->bln = $arAvRe['b'][5]['av'];
	$obj1->tgt = '98';
	$obj1->m = "Gas Comp";
	array_push($arAR,$obj1);
	
	$obj = new stdClass();
	$obj->th1 = '0';
	$obj->avg = $arAvRe['a'][7]['av'];
	$obj->bln = $arAvRe['b'][7]['av'];
	$obj->tgt = '98';
	$obj->m = "Generator Set";
	array_push($arAR,$obj);
	
	$obj2->th1 = '0';
	$obj2->avg = $arAvRe['a'][6]['av'];
	$obj2->bln = $arAvRe['b'][6]['av'];
	$obj2->tgt = '98';
	$obj2->m = "Pump";
	array_push($arAR,$obj2);
	
	$jsonResult = array(
        'success' => true,
        'avhome' => $arAR
    );
	
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
	);
}

//echo "<br/><br/><br/>";
echo json_encode($jsonResult);

?>
