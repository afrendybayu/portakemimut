<?php
// Afrendy Bayu, 22 Jan 2014 //
//  Soka, makin banyak saja  //

include './connection.php';
include './util.php';

//$waktuawal  = '2013-01-1';
//$waktuakhir = '2014-2-9';
//$date = '2013-01-1';


//*
if (isset($_GET['awal']))	{
	$waktuawal = $_GET['awal'];
	
} else {
	$waktuawal = date("Y-m-")."01";
}
echo "waktuawal: $waktuawal<br/>";
//return;
if (isset($_GET['akhir'])) {
	$waktuakhir = $_GET['akhir'];
} else {
	$waktuakhir = date("Y-m-d");
}
echo "aw:".$waktuawal.", akhir: ".$waktuakhir;
//return;
//*/
try {

	/*
	if($_GET["id"] && $_GET["awal"] && $_GET["akhir"])	{
		$idx  = $_GET['id'];
		$waktuawal  = $_GET['awal'];
		$waktuakhir = $_GET['akhir'];
	} else {
		throw new Exception('Tidak ada parameter Input');
	}
	//*/
	$idx = 55;
	$sql = "SELECT id, flag as cat FROM hirarki WHERE level = 3;";
	//$sql = "SELECT id, flag FROM hirarki WHERE level = 3 AND (id=$idx)";	//  OR id=55
	$q = db_query($sql);
	if (!$q)	{
		throw new Exception('Tidak ada hasil [0]');
	}
	
	$unit = array();
	while ($row = mysql_fetch_assoc($q)) {
		$unit[] = $row;
	}
	$jmlUnit = count($unit);
	
	
	$awal  = bwaktu($waktuawal)->t;
	$akhir = bwaktu($waktuakhir)->t;
	
	echo "jml Unit: $jmlUnit<br/>";
	echo "Unit: ";	print_r($unit);		echo "<br>";

	//
	$rh = array(); 
	//for ($i=0; $i<1; $i++)	{
	for ($i=0; $i<$jmlUnit; $i++)	{
		unset($rhx);	$rhx = array();
		$sql =  "SELECT eq,tgl,rh FROM rh_201311 WHERE eq='{$unit[$i]['id']}' ".
		//$sql =  "SELECT eq,tgl,rh FROM rh_201311 WHERE eq='54' ".
				"AND tgl BETWEEN '$waktuawal' AND '$waktuakhir';";
		echo "sql: $sql<br/>";
		$q = db_query($sql);
		if (!$q)	{
			throw new Exception('Query Running Hour salah');
		}
		while ($row = mysql_fetch_assoc($q)) {
			array_push($rhx, $row['tgl']);
		}
		//$rh[54] = $rhx;
		$rh[$unit[$i]['id']] = $rhx;
		echo "rh: "; print_r($rh); echo "<br/>";
		
		//*
		$k = 0; $l = 0; 
		unset($sdt);	$sdt = array();
		do {
			$u = $awal + (60*60*24*$k);
			//echo "t: $awal, u: $u, s: $akhir ".date('d-m-Y', $u).", tgl: "."<br/>";
			$tglx = date('Y-m-d', $u);
			$ttt = date('Y', $u);
			$bbb = date('m', $u);

			if (!in_array( date('Y-m-d',$u), $rh[$unit[$i]['id']]))	{
				$l++;
				if ($l==1)	{
					$seq = "SELECT group_concat(id separator 'e') as eq,unit_id FROM equip where unit_id = '{$unit[$i]['id']}' GROUP BY unit_id;";
					$q = db_query($seq);
					if (!$q)	{
						throw new Exception('Query Equipment pada Unit SALAH');
					}
					while ($row = mysql_fetch_assoc($q)) {
						$eqx = $row['eq'];
					}
					$sql =	"INSERT INTO rh_201311 (bln,thn,eq,tgl,rh,rh_av,rh_re,flag,cat) VALUES ".
							"('$bbb','$ttt','{$unit[$i]['id']}','$tglx','24','24','24','e$eqx','{$unit[$i]['cat']}')";
				} else {
					$sql .= ",('$bbb','$ttt','{$unit[$i]['id']}','".$tglx."','24','24','24','e$eqx','{$unit[$i]['cat']}')";
				}
				//echo "sql: $sql<br/>";

			}

			//echo "sql: $sql<br/>";
			$k++;
		} while($u<$akhir);
		
		if ($l>0)	{
			echo "sql: $sql<br/>";
			$q = db_query($sql);
			if (!$q)	{
				throw new Exception('Query Equipment pada Unit SALAH');
			}
		}
		echo "----------------------<br/>";
		//*/		
		
		
		
	}
	
} catch(Exception $e) {
	
}

?>
