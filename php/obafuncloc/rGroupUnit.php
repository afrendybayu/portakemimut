<?php
// Afrendy Bayu, 25 Jan 2014
//   SokaKetikaSaatSendiri

include '../connection.php';
include '../util.php';

$kal = array(1 => "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "YTD/Avg");
//$y = date("Y");
//$m = date("n");
//$d = date("d");
if (isset($_GET['gr']))	{
	$gr = $_GET['gr'];
} else {
	$gr = 5;
}

$ytd = 0;

if (isset($_GET['tgl']))	{
	$tgl = $_GET['tgl'];
	$atgl = explode(" ",$tgl);
	$n = count($atgl);
	//echo "n: $n<br/>";
	if ($n==1)	{
		//$tgl = $atgl[0]."-12";
		$thn = $atgl[0];
	} else if ($n==2)	{
		
		//echo "in: ".in_array($atgl[0], $kal)."<br/>";
		if (in_array($atgl[0], $kal))	{
			$bln = array_search($atgl[0], $kal);
		}
		//echo "no: $no<br/>";
		
		if ($bln<13)	{
			$tgl = $atgl[1]."-".$no;
			//$bln = $atgl[0];
			//$bln = 
		} else {
			$ytd = 1;
		}
		$thn = $atgl[1];
	}
	//echo "thn: $thn, bln: $bln, ytd: $ytd<br/>";
} else {
	$thn = date("Y");
	$bln = date("n");
}

try {
	//$tgl = "2014-2";
	//$flag = 0;
	//echo "tgl: $tgl<br/>";
	
	//if (isset($_GET['tgl']))	{ $tgl = $_GET['tgl']; } else { $tgl = "2014-5"; }
	
	//$eq = 54;
	
	
	$wktx = explode("-",$tgl);
	$skrg = date('Y-m-d');	$wkt = explode("-",date('Y-m'));
	//echo "wktx: ";	print_r($wktx);	echo "<br/>";
	//echo "wkt : ";	print_r($wkt);	echo "<br/>";
	//echo "Now: $skrg<br/><br/>";
	
	$kode = cek_unit($gr);
	//echo "kode: $kode<br/>";

	$data = array(); $arGroup = array();
	$s = "select h.id,h.nama,equip.nama as unit,h.init as init ".
		 ",(select hhh.kode from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as hlok ".
		 ",(select hhh.nama from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as lok ".
		 ",(select hhh.urut from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as urut ".
		 "FROM hirarki h ".
		 "LEFT JOIN equip ON h.id = equip.unit_id and equip.kode like '%$kode%' ".
		 "where h.level = 3 and h.flag = $gr ".
		 "order by urut,nama asc;";
	//echo "sql: $s<br/>";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
		throw new Exception('Query Equipment pada Unit SALAH');
	}
	
	while ($row = mysql_fetch_assoc($q)) {
		$data[$row['id']]['id'] = $row['id'];
		//$data[$row['id']]['nama'] = $row['nama'].", ".$row['unit']." @".$row['hlok'];
		$data[$row['id']]['kode'] = $row['init']."@".$row['hlok'];//." ".$row['id'];
		$data[$row['id']]['nama'] = "{$row['nama']}, {$row['unit']} @{$row['lok']}";//." ".$row['id'];
		//$data[$row['id']]['lok'] = "@".$row['lok'];//." ".$row['id'];
		$data[$row['id']]['urut'] = $row['urut'];
	}
		

	/*
	//echo "<br/><br/><br/>";
	// QUERY nilai Availability disini
	foreach($data as $d)	{
		print_r($d);
		//echo "<br/>";
	}
	//*/
	//echo "<br/><br/>";
	if (isset($bln) && $bln<13)	{
		$s = "select eq, sum(rh_av) as av,sum(rh_re) as re,count(id) as jml from rh_201311 ".
			 "where cat=$gr and thn=$thn and bln=$bln group by eq;";
	} else {
		$s = "select eq, sum(rh_av) as av,sum(rh_re) as re,count(id) as jml from rh_201311 ".
			 "where cat=$gr and thn=$thn group by eq;";
	}
	
	//echo "sql: $s<br/>";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	
	$datax = array();
	while ($row = mysql_fetch_assoc($q)) {
		$data[$row['eq']]['av'] = number_format(($row['av']*100)/(24*$row['jml']), 3);
		$data[$row['eq']]['re'] = number_format(($row['re']*100)/(24*$row['jml']), 3);
		//$data[$row['eq']]['eq'] = $row['eq'];
	};
	//	echo "sql: $s<br/>";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	
	//*
	$arGroup = array();
	foreach ($data as $d)	{
		//print_r($d);
		//echo "<br/>";
		array_push($arGroup,$d);
	}

	mysql_free_result($q);

	$jsonResult = array(
        'success' => true,
        'avGr' => $arGroup
    );
	
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
	);
}

echo json_encode($jsonResult);

?>
