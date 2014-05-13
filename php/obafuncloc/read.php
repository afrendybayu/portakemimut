<?php
// Afrendy Bayu, 25 Jan 2014
//   SokaKetikaSaatSendiri

include '../connection.php';
include '../util.php';

$kal = array(1 => "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "YTD/Avg");
if (isset($_GET['eq']))	{
	$eq = $_GET['eq'];
}

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
			$no = array_search($atgl[0], $kal);
		}
		//echo "no: $no<br/>";
		
		if ($no<13)	{
			$tgl = $atgl[1]."-".$no;
			
			//$bln = 
		} else {
			
		}
		$thn = $atgl[1];
	}
	//echo "tgl: $tgl<br/>";
} else {
	$thn = date("Y");
	$bln = date("n");
}

$thnm1 = $thn-1;

try {
	$arAvRe = array();
	for ($i=0; $i<12; $i++)	{
		//$z = blnthn($i+1,$thnm1);
		$arAvRe[$i]['av'.$thnm1] = 0;
		$arAvRe[$i]['re'.$thnm1] = 0;
		$arAvRe[$i]['av'.$thn] = 0;
		$arAvRe[$i]['re'.$thn] = 0;
		$arAvRe[$i]['b'] = $i;
		$arAvRe[$i]['m'] = nmbulan($i,1);
	}
	
	$s = "SELECT bln,thn,(SELECT DAY(LAST_DAY(tgl))*24) as jml, sum(rh_av) AS av,sum(rh_re) AS re FROM rh_201311 ".
		 "WHERE eq='$eq' and (thn='$thn' or thn='$thnm1') GROUP BY bln,thn ORDER BY thn, bln ASC";
	//echo "sql: $s<br/>";
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	
	$nowB = date('n');
	$nowT = date('Y');
	$nowD = date('j')+1;
	//echo "bln: $nowB, nowT: $nowT, nowD: $nowD<br/>";
	while ($row = mysql_fetch_assoc($q)) {
			if (($nowB==$row['bln']) && ($nowT==$row['thn']))	{
				//echo "bln: $nowB, === ".$row['bln']." nowT: $nowT === ".$row['thn']."<br/>";
				$arAvRe[intval($row['bln'])-1]['av'.$row['thn']] = number_format(($row['av']*100)/($nowD*24),2);
				$arAvRe[intval($row['bln'])-1]['re'.$row['thn']] = number_format(($row['re']*100)/($nowD*24),2);
			} else {
				$arAvRe[intval($row['bln'])-1]['av'.$row['thn']] = number_format(($row['av']*100)/$row['jml'],2);
				$arAvRe[intval($row['bln'])-1]['re'.$row['thn']] = number_format(($row['re']*100)/$row['jml'],2);
			}
	}
	
	$jsonResult = array(
        'success' => true,
        'avre' => $arAvRe
    );
	
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
	);
}

echo json_encode($jsonResult);

//echo "eq: $eq bln: $bln, thn: $thn<br/>";

return;

try {
	
	
	
	//$tgl = "Feb 2014";
	//$tgl = "2013";
	//$tgl = "YTD/Avg 2014";
	
	//if (isset($_GET['tgl']))	{ $tgl = $_GET['tgl']; } 
	//else { $tgl = "2014-5"; }
	
	//$eq = 54;
	/*
	$atgl = explode(" ",$tgl);
	$n = count($atgl);
	//print_r ($atgl);
	//echo "<br/>n: ".count($atgl)."<br/>";
	$no = -1;
	if ($n==1)	{
		$tgl = $atgl[0]."-12";
	} else if ($n==2)	{
		//echo "in: ".in_array($atgl[0], $kal)."<br/>";
		if (in_array($atgl[0], $kal))	{
			$no = array_search($atgl[0], $kal);
		}
		if ($no<13)	{
			$tgl = $atgl[1]."-".$no;
		} else {
			
		}
	} else {
		
	}
	//*/
	echo "tgl: $tgl, no: $no<br/>";
	
	//return;
	//$tgl = "2014-2";
	$flag = 0;
	
	$wktx = explode("-",$tgl);
	$skrg = date('Y-m-d');	$wkt = explode("-",date('Y-m'));
	//echo "wktx: ";	print_r($wktx);	echo "<br/>";
	//echo "wkt : ";	print_r($wkt);	echo "<br/>";
	//echo "Now: $skrg<br/><br/>";
	$thn = $wktx[0];
	$bln = $wktx[1];
	
	$thnm1 = $thn-1;
	$arAvRe = array();
	$sthn  = 't'.$thn;
	$sthn1 = 't'.$thnm1;
	
	if ($wkt[0]==$thn)	{
		//echo "tahun sekarang<br/>";
		$flag = 12+$wkt[1]-1;
	}
	if ($wkt[0]==$thnm1)	{
		//echo "tahun lalu<br/>";
		$flag = $wkt[1]-1;
	}
	//echo "flag bln: $flag<br/>";

	//$flag = 0;
	for ($i=0; $i<12; $i++)	{
		//$z = blnthn($i+1,$thnm1);
		$arAvRe[$i]['av'.$thnm1] = 0;
		$arAvRe[$i]['re'.$thnm1] = 0;
		$arAvRe[$i]['av'.$thn] = 0;
		$arAvRe[$i]['re'.$thn] = 0;
		$arAvRe[$i]['b'] = $i;
		$arAvRe[$i]['m'] = nmbulan($i,1);
		
		//*
		if ($i==11)	{									// Des
			if (($flag>11) && ($wkt[1]==$i+1))	{	
				$arAvRe[$i][$sthn1] = hitung_jambulan(($thn-1)."-".($i+1)."-1",$thn."-1-1");		// TAHUN LALU
				$arAvRe[$i][$sthn] = hitung_jambulan($thn."-".($i+1)."-1",date('Y-m-d',time()+(24*60*60)));
				$flag = 0;
			}
			else if (($flag>0) && ($wkt[1]==$i+1))	{
				//$arAvRe[$i]['tt0'] = hitung_jambulan(($thn-$wkt[0]+$wktx[0])."-".($i+1)."-1",date('Y-m-d',time()+(24*60*60)));		// TAHUN LALU
				$arAvRe[$i][$sthn1] = hitung_jambulan(($thn+1)."-".($i+1)."-1",date('Y-m-d',time()+(24*60*60)));		// TAHUN LALU
				$arAvRe[$i][$sthn] = hitung_jambulan($thn."-".($i+1)."-1",($thn+1)."-1-1");
				$flag = 0;
			}
			else	{
				$arAvRe[$i][$sthn1] = hitung_jambulan(($thn-1)."-".($i+1)."-1",$thn."-1-1");		// TAHUN LALU sip
				$arAvRe[$i][$sthn] = hitung_jambulan($thn."-".($i+1)."-1",($thn+1)."-1-1");		// sip
			}
		}
		//*
		else 	{										// Jan - Nov
			if (($flag>11) && ($wkt[1]==$i+1))	{	
			//if ($wkt[1]==$i+1)	{	
				//echo "$i masuk sini tgl BEDA<br/>";
				$arAvRe[$i][$sthn1] = hitung_jambulan(($thn-1)."-".($i+1)."-1",($thn-1)."-".($i+2)."-1");	// TAHUN LALU
				$arAvRe[$i][$sthn] = hitung_jambulan(($thn)."-".($i+1)."-1",date('Y-m-d',time()+(24*60*60))); // sip
				$flag = 0;
			}
			else if (($flag>0) && ($wkt[1]==$i+1))	{	
				//echo "$i masuk sini tgl BEDA<br/>";
				$arAvRe[$i][$sthn1] = hitung_jambulan(($thn-$wktx[0]+$wkt[0])."-".($i+1)."-1",date('Y-m-d',time()+(24*60*60)));	// TAHUN LALU
				$arAvRe[$i][$sthn] = hitung_jambulan(($thn)."-".($i+1)."-1",($thn)."-".($i+2)."-1");
				$flag = 0;
			}
			else {
				//echo "$i masuk sini normal<br/>";
				$arAvRe[$i][$sthn1] = hitung_jambulan(($thn-1)."-".($i+1)."-1",($thn-1)."-".($i+2)."-1");	// TAHUN LALU sip
				$arAvRe[$i][$sthn] = hitung_jambulan(($thn)."-".($i+1)."-1",($thn)."-".($i+2)."-1");		// sip
			}
			
		}
	}


	if (isset($_GET['eq']))		{
		$eq = $_GET['eq']; 
		//$eq = 54;
		
		$s = "SELECT bln,thn,sum(rh_av) AS av,sum(rh_re) AS re ".
			 "FROM rh_201311 WHERE eq='$eq' and (thn='$thn' or thn='$thnm1') ".
			 "GROUP BY bln,thn ORDER BY thn, bln ASC";
		echo "sql: $s<br/>";
		$q = db_query($s);
		if (!$q)	{
			echo "DB Error, could not query the database\n";
			echo 'MySQL Error: ' . mysql_error();
			exit;
		}
		
		while ($row = mysql_fetch_assoc($q)) {
			$arAvRe[intval($row['bln'])-1]['av'.$row['thn']] = $row['av'];
			$arAvRe[intval($row['bln'])-1]['re'.$row['thn']] = $row['re'];
			

			$avx = ($arAvRe[intval($row['bln'])-1]['av'.$row['thn']]*100)/$arAvRe[intval($row['bln'])-1]['t'.$row['thn']];
			$arAvRe[intval($row['bln'])-1]['av'.$row['thn']] = number_format($avx, 2, '.', '');
			
			$rex = ($arAvRe[intval($row['bln'])-1]['re'.$row['thn']]*100)/$arAvRe[intval($row['bln'])-1]['t'.$row['thn']];
			$arAvRe[intval($row['bln'])-1]['re'.$row['thn']] = number_format($rex, 2, '.', '');

			
			//$arAvRe[intval($row['bln'])-1]['av'.$row['thn']] /= $arAvRe[intval($row['bln'])-1]['t'.$row['thn']]*0.01;
			//print_r($arAvRe[intval($row['bln'])-1]);	echo "<br/>";
			//echo "av{$row['thn']}: ".$arAvRe[intval($row['bln'])-1]['av'.$row['thn']].", dibagi ". $arAvRe[intval($row['bln'])-1]['t'.$row['thn']]."   ";
			//echo "re{$row['thn']}: ".$arAvRe[intval($row['bln'])-1]['re'.$row['thn']].", dibagi ". $arAvRe[intval($row['bln'])-1]['t'.$row['thn']];
			//echo "<br/>";
		}
		
		mysql_free_result($q);
	}
	
	$jsonResult = array(
        'success' => true,
        'avre' => $arAvRe
    );
	
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
	);
}

echo json_encode($jsonResult);

?>
