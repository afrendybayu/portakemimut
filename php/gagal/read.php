<?php

include '../connection.php';

try {

	$sql =	"SELECT waktudown.id,eqid,kode,fm,pmdef.nama as namapm,down_id,downt,downj,upt,upj,startt,startj,endt,endj,event as idevent,tipeev ".
			",(select hirarki.nama from hirarki where hirarki.id = ".
			"(select hirarki.parent from hirarki where hirarki.id = ".
			"(select hirarki.parent from hirarki where hirarki.id = equip.unit_id))) as lok ".
			",listEvent.nama as event, equip.unit_id ".
			",(select nama from hirarki where hirarki.id =  ".
			"(select unit_id from equip where id = waktudown.eqid)) as nama ".
			"FROM waktudown ".
			"LEFT JOIN listEvent ON listEvent.id = waktudown.event ".
			"LEFT JOIN equip ON equip.id = waktudown.eqid ".
			"LEFT JOIN event ON event.down_id = waktudown.id ".
			"LEFT JOIN pmdef ON pmdef.id = waktudown.tipeev ".
			"order by downt desc, downj desc";
			//"group by down_id ".

	$q = db_query($sql);

	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	
	
	$jml = -1; $idd = -1; $idn = 'e';
	$isi = array(); $dd = ''; $td = '';	$mdar = Array(); $tar = Array();
	while ($row = mysql_fetch_assoc($q)) {
		//*
		//echo "event: {$row['idevent']}, downt: {$row['downt']}, downj: {$row['downj']}, kode: {$row['kode']}, pm: {$row['namapm']}<br/>";
		//$idd = $row['id']; //$idn .=$idd;
		if (($row['downt']==$dd) && ($row['downj']==$td)) {
			//echo "SAMA: $dd - $td ";
			$isi[$jml]['id'] .= 'e'.$row['id'];
			$ax = $row['idevent'];
			if ($ax==2) {
				//echo "masuk 2 ".$row['namapm']."<br/>";
				if (isset($row['namapm'])) {
					if (strlen($isi[$jml]['fm'])>0)
						$isi[$jml]['fm'] .= "&nbsp;&nbsp;";
					$isi[$jml]['fm'] .= "[{$row['kode']}: {$row['namapm']}]";
				}
			} else if (($ax==3) || ($ax==4)) {
				//echo "fm: {$row['fm']}<br/>";
				if (isset($row['fm'])) {
					if (strlen($isi[$jml]['fm'])>0)
						$isi[$jml]['fm'] .= "&nbsp;&nbsp;";
					$isi[$jml]['fm'] .= "[{$row['kode']}: {$row['fm']}]";
				}
			}
		} else {
			$jml++;
			$mdar = Array();
		//if (($row['downt']!=$dd) && ($row['downj']!=$td)) {
			$isi[$jml]['event'] = $row['event'];
			$isi[$jml]['id'] = 'e'.$row['id'];
			$isi[$jml]['unit_id'] = $row['unit_id'];
			$isi[$jml]['nama'] = $row['nama'];
			$isi[$jml]['lok'] = $row['lok'];
			
			if ($row['idevent']==1) { 		// standby
				$isi[$jml]['startt'] = '';		$isi[$jml]['startj'] = '';
				$isi[$jml]['endt'] = '';		$isi[$jml]['endj'] = '';
				$isi[$jml]['tipeev'] = '';
				$isi[$jml]['idevent'] = $row['idevent'];
			} else if ($row['idevent']==2) {	// PM
				$isi[$jml]['startt'] = date('d-m-Y',strtotime("{$row["startt"]} {$row["startj"]}"));
				$isi[$jml]['startj'] = date('H:i',	strtotime("{$row["startt"]} {$row["startj"]}"));
				$isi[$jml]['endt'] = date('d-m-Y',	strtotime("{$row["endt"]} {$row["endj"]}"));
				$isi[$jml]['endj'] = date('H:i',	strtotime("{$row["endt"]} {$row["endj"]}"));
				//echo "fm: {$row['namapm']}<br/>";
				if (isset($row['namapm'])) {
					//echo "---- ada fm<br/>";
					$isi[$jml]['fm'] = "[{$row['kode']}: {$row['namapm']}]";
				}
			} else {
				$isi[$jml]['startt'] = date('d-m-Y',strtotime("{$row["startt"]} {$row["startj"]}"));
				$isi[$jml]['startj'] = date('H:i',	strtotime("{$row["startt"]} {$row["startj"]}"));
				$isi[$jml]['endt'] = date('d-m-Y',	strtotime("{$row["endt"]} {$row["endj"]}"));
				$isi[$jml]['endj'] = date('H:i',	strtotime("{$row["endt"]} {$row["endj"]}"));
				if (isset($row['fm'])) {
					$isi[$jml]['fm'] = "[{$row['kode']}: {$row['fm']}]";
					//array_push($tar,$row['fm']);
					//$mdar[$row['kode']] = $row['kode'];
					//array_push($mdar,$tar);
					//print_r($mdar);
					//echo $row['kode']." > ".$row['fm']."----<br/>";
				}
			}
			$isi[$jml]['downt'] = date('d-m-Y',strtotime("{$row['downt']} {$row["downj"]}"));
			$isi[$jml]['downj'] = date('H:i',	strtotime("{$row['downt']} {$row["downj"]}"));
			$isi[$jml]['upt'] = date('d-m-Y',	strtotime("{$row['upt']} {$row["upj"]}"));
			$isi[$jml]['upj'] = date('H:i',	strtotime("{$row['upt']} {$row["upj"]}"));
			
			$dd = $row['downt'];	$td = $row['downj'];
		//} else {
			//echo ($jml)." >> AWAL: $dd - $td<br/>";
			
		}
		//print_r($mdar);
		//$isi[$jml]['fm'] .=
	}
	mysql_free_result($q);
	//print_r($isi);
	
	
	//print_r($isi);
	
    $jsonResult = array(
        'success' => true,
        'gagal' => $isi
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
