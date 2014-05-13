<?php
	// Afrendy Bayu, 26Des2013 //
	//  CutiBersamadiSokaJaya  //

include '../connection.php';
include '../util.php';

try {
	$params = json_decode(file_get_contents('php://input'));
	if (!isset($params->id))	throw new Exception('ID tidak ditemukan');
	
	$paramid = $params->id;
	//echo "paramid: $paramid<br/>";
	//$paramid = 'e246e247';
	//echo substr($paramid,0,1);
	if (substr($paramid,0,1)=="e")	{
		$idx = substr($paramid,1); 
		//echo "idx: $idx<br/>";
	}
	$id  = explode("e", $idx);
	//print_r($id);	echo "<br/>";
	$idnya = implode(" or down_id=", $id);
	$sqlev = "delete from event where down_id=".$idnya;
	//echo "sql: $sqlev<br/>";
	$q = db_query($sqlev);
	
	//if (!$q)	throw new Exception('Tidak bisa hapus Event');
	$idnya = implode(" or id=", $id);
	$sqlwd = "select * from waktudown where id=".$idnya;
	//$sqlwd = "select * from waktudown where id=";
	//echo "sql: $sqlwd<br/>";
	
	$q = db_query($sqlwd);
	if (!$q)	{
		throw new Exception('Kejadian di Tidak ditemukan: '.implode(",",$idnya));
	}
	
	$wkt = array();
	while ($row = mysql_fetch_assoc($q)) {
		//*
		$wkt[0]['tgl'] = $row['downt'];
		$wkt[0]['jam'] = $row['downj'];
		$wkt[1]['tgl'] = $row['upt'];
		$wkt[1]['jam'] = $row['upj'];
		$idwd = $row['eqid'];
		$unit = $row['unit_id'];
		//*/
	}
	mysql_free_result($q);
	//echo "unit: $unit, jml:".count($wkt)." -- "; print_r($wkt);	echo "<br/><br/>";
	//echo "id: "; print_r($idwd); echo "<br/>";

	
	
	$sqldwd = "DELETE FROM waktudown WHERE id=".$idnya;
	$q = db_query($sqldwd);
	//echo "sql: $sqldwd, hasil: $q<br/>";
	
	//echo "id: {$idwd}, downt: {$wkt[0]['tgl']}, downj: {$wkt[0]['jam']}, upt: {$wkt[1]['tgl']}, upj: {$wkt[1]['jam']}<br/><br/>";
	//echo "waktu range:";
	$wktrange = cek_waktu_range($idwd,$wkt[0]['tgl'],$wkt[0]['jam'],$wkt[1]['tgl'],$wkt[1]['jam'], 1);
	//echo "waktu range: ";	print_r($wktrange); echo "<br/>";
	
	$wktawal  = $wkt[0]['tgl'];
	$wktakhir = $wkt[1]['tgl'];
	
	//$wkt_unik = array_unique($wktrange->dt);		// kenapa dipasang ini ya ???
	$wkt_unik = $wktrange->dt;
	//echo "jml wakturange: ".count($wktrange->dt)." --> ".print_r($wkt_unik)."<br/>";
	//echo "jml waktuunik : ".count($wkt_unik)." --> ".print_r($wkt_unik)."xxx<br/>";
	//echo "<br/>kombinasi waktu: ";
	$kw = kombinasi_waktu($wktrange->dt, $wktrange->dj, $wktrange->ut, $wktrange->uj);

	//echo "kombinasi: "; print_r($kw);	echo "<br/>";
	//echo "wkt unik: "; print_r($wkt_unik);	echo "<br/>";
	
	$ar=array();	$ar_av=array();	$ar_re=array();	$l=0; $m=0;
	for ($k=0; $k<count($wkt_unik); $k++)	{
		//echo "$k/".count($wkt_unik).": ".$wktrange->dt[$k].", event: ".$wktrange->ev[$k]."<br/>";
		$ar = rh($wktrange->dt[$k], $wktrange->dj[$k], $wktrange->ut[$k], $wktrange->uj[$k]);
		//echo "jmlAr[$k]: ".sizeof($ar)."<br/>"; print_r($ar);  

		if ($k==0)	$hrh = $ar;
		else {
			$hrh = hitung_hrh($hrh, $ar);
			sort($hrh);
			//echo "<br/>========================================"; echo "<br/>"; print_r($hrh); echo "<br/>";
		}
		
		if ($wktrange->ev[$k]==4) {		// Reliability: 4: Breakdown
			$ar_re = rh($wktrange->dt[$k], $wktrange->dj[$k], $wktrange->ut[$k], $wktrange->uj[$k]);
			if ($l==0)	{
				$hrh_re = $ar_re;
			}
			else {
				$hrh_re = hitung_hrh($hrh_re, $ar_re);	
				sort($hrh_re);
			}
			$l++;
		}
		if (($wktrange->ev[$k])>1) {		// Availability
			$ar_av = rh($wktrange->dt[$k], $wktrange->dj[$k], $wktrange->ut[$k], $wktrange->uj[$k]);
			if ($m==0)	{
				$hrh_av = $ar_av;
			}
			else {
				$hrh_av = hitung_hrh($hrh_av, $ar_av);	
				sort($hrh_av);
			}
			$m++;
		}
		
		/*
		echo "rh: <br/>"; print_r($hrh); echo "<br/>";
		echo "Format_rh Availability: <br/>"; print_r($hrh_av); echo "<br/>";
		echo "Format_rh reliability : <br/>"; print_r($hrh_re); echo "<br/>";
		//*/
	}
	//echo "Format_rh RunningHour : <br/>"; print_r($hrh); echo "<br/>";
	//echo "Format_rh Availability: <br/>"; print_r($hrh_av); echo "<br/>";
	//echo "Format_rh reliability : <br/>"; print_r($hrh_re); echo "<br/>";
		
	//echo "hrh: "; print_r($hrh); echo "<br/>";
	$rh = format_rh($hrh);
	//echo "rh: <br/>"; print_r($rh); echo "<br/>";
	$rh_av = format_rh($hrh_av);
	//echo "Format_rh Availability: <br/>"; print_r($rh_av); echo "<br/>";
	$rh_re = format_rh($hrh_re);
	//echo "Format_rh reliability : <br/>"; print_r($rh_re); echo "<br/>";
	
	
	//return;
	//echo "wkt: ".$wkt[0]['tgl'];
	$t = bwaktu($wkt[0]['tgl'])->t;
	$s = bwaktu($wkt[1]['tgl'])->t;
	
	$k=0;
	do {
		$u = $t + (60*60*24*$k);
		$tglx = date('Y-m-d', $u);
		$adatgl = cek_tgl_rh_ada($unit, $tglx);
		//echo "tgl: ";

		if (!isset($rh[$tglx]))	{
			$rh[$tglx] = '24:00';
			//echo $tglx.": ".$rh[$tglx].",";
		}
		if (!isset($rh_av[$tglx]))	{
			$rh_av[$tglx] = '24:00';
			//echo $tglx.": ".$rh[$tglx].",";
		}
		if (!isset($rh_re[$tglx]))	{
			$rh_re[$tglx] = '24:00';
			//echo $tglx.": ".$rh[$tglx].",";
		}
		
		if (count($kw)==0)	{	// hanya ada 1 event
		//	$rh['$tglx']
		}
		//echo "t: $t, u: $u, s: $s ".date('d-m-Y', $u)."<br/>";
		if ($adatgl->jml==1)	{
			$sql = "UPDATE rh_201311 SET rh='{$rh[$tglx]}',rh_av='{$rh_av[$tglx]}',rh_re='{$rh_re[$tglx]}' where id = ".$adatgl->id[0];
			//echo "sql: $sql<br/>";
			$q = db_query($sql);
		}
		$k++;
	} while($u<$s);
	//*/

	$jsonResult = array(
        'success' => true,
        'tasks' => $idnya
        //'gagal' => $params
    );
} catch(Exception $e) {
	$jsonResult = array(
		'success' => false,
		'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);    

?>
