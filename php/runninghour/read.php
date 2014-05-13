<?php
/* Afrendy Bayu */
//*
include '../connection.php';
include '../util.php';

//echo '{"success":true,"runninghour":[{"id":"21","eq":"XXXXGas Compressor #1","cat":null,"Lokasi":"00. Lagan"},{"id":"22","eq":"EEEGas Compressor #2","cat":null,"Lokasi":"00. Lagan"},{"id":"23","eq":"Gas Compressor #3","cat":null,"Lokasi":"00. Lagan"},{"id":"24","eq":"Gas Compressor #4","cat":null,"Lokasi":"00. Lagan"},{"id":"25","eq":"Gas Compressor #5","cat":null,"Lokasi":"00. Lagan"},{"id":"26","eq":"Gas Compressor #6","cat":null,"Lokasi":"00. Lagan"},{"id":"27","eq":"Gas Compressor #1","cat":null,"Lokasi":"01. Ibul"},{"id":"28","eq":"Gas Compressor #2","cat":null,"Lokasi":"01. Ibul"},{"id":"29","eq":"Gas Compressor #3","cat":null,"Lokasi":"01. Ibul"},{"id":"31","eq":"Gas Compressor #1","cat":null,"Lokasi":"02. Rambutan"},{"id":"32","eq":"Gas Compressor #2","cat":null,"Lokasi":"02. Rambutan"},{"id":"33","eq":"Gas Compressor #3","cat":null,"Lokasi":"02. Rambutan"},{"id":"38","eq":"Gas Compressor #4","cat":null,"Lokasi":"02. Rambutan"},{"id":"39","eq":"Gas Compressor #5","cat":null,"Lokasi":"02. Rambutan"},{"id":"34","eq":"Gas Compressor #1","cat":null,"Lokasi":"03. Teras"},{"id":"35","eq":"Gas Compressor #2","cat":null,"Lokasi":"03. Teras"},{"id":"36","eq":"Gas Compressor #3","cat":null,"Lokasi":"03. Teras"},{"id":"37","eq":"Gas Compressor #4","cat":null,"Lokasi":"03. Teras"},{"id":"40","eq":"Gas Compressor #1","cat":null,"Lokasi":"05. Jene"},{"id":"41","eq":"Gas Compressor #2","cat":null,"Lokasi":"05. Jene"},{"id":"42","eq":"Gas Compressor #4","cat":null,"Lokasi":"05. Jene"},{"id":"43","eq":"Gas Compressor #5","cat":null,"Lokasi":"05. Jene"},{"id":"44","eq":"Gas Compressor #1","cat":null,"Lokasi":"06. Soka"},{"id":"45","eq":"Gas Compressor #2","cat":null,"Lokasi":"06. Soka"},{"id":"46","eq":"Gas Compressor #3","cat":null,"Lokasi":"06. Soka"},{"id":"47","eq":"Gas Compressor #4","cat":null,"Lokasi":"06. Soka"},{"id":"138","eq":"Gas Compressor #5","cat":null,"Lokasi":"06. Soka"},{"id":"48","eq":"Gas Compressor #1","cat":null,"Lokasi":"09. Gunung Kembang"},{"id":"49","eq":"Gas Compressor #2","cat":null,"Lokasi":"09. Gunung Kembang"},{"id":"50","eq":"Gas Compressor #3","cat":null,"Lokasi":"09. Gunung Kembang"},{"id":"51","eq":"Gas Compressor #4","cat":null,"Lokasi":"09. Gunung Kembang"},{"id":"54","eq":"Gas Compressor #1","cat":null,"Lokasi":"16. Borang"},{"id":"55","eq":"Gas Compressor #2","cat":null,"Lokasi":"16. Borang"},{"id":"56","eq":"Gas Compressor #3","cat":null,"Lokasi":"16. Borang"},{"id":"57","eq":"Gas Compressor #2","cat":null,"Lokasi":"20. Koneng"}]}';
//return;

try {
	$sql = array();
	$eq = 0; $jml = 0;
	$tisi = array();
	
	if (isset($_GET['tgl']))	{ $tgl = $_GET['tgl']; } else { $tgl = '0';	}
	if (isset($_GET['cat']))	{ $cat = $_GET['cat']; } else { $cat = 5;	}		// 5: default Compressor
	//echo "tgl: ".$tgl."<br/>";
	if ($tgl==null || $tgl=='0')	{
		$tgl=date("Y-m-d");	
		//echo "tgl: $tgl<br/>";
	}

	list($y,$m,$t) = explode("-", $tgl);
	

	$sql["tbl"][0] = "rh_".date("Ym", mktime(0, 0, 0, $m, $t, $y));
	$sql["bts"][0] = date("Y-m-d", mktime(0, 0, 0, $m, $t, $y)); 	
	$sql["tbl"][1] = "rh_".date("Ym", mktime(0, 0, 0, $m, $t, $y)-(13*24));
	$sql["bts"][1] = date("Y-m-d", mktime(0, 0, 0, $m, $t-13, $y));
	
	//echo "tbl: {$sql["tbl"][0]}, bts: {$sql["bts"][0]}, tbl: {$sql["tbl"][1]}, bts: {$sql["bts"][1]}<br/>";
	//echo "tbl: {$sql["tbl"][0]}, bts0: {$sql["bts"][0]}, bts1: {$sql["bts"][1]}<br/>";
	
	
	//$s =  "select equip.id, equip.nama, equip.tag, equip.cat, hirarki.nama as hlok from equip ".
	//		"left join hirarki on equip.lok = hirarki.id where equip.strh = '$cat' order by hlok, nama asc";
	
	$s =  "select id,nama,flag as cat, parent as idparent,ket /*level*/ ".
			"/*,(select h.parent from hirarki h where hh.parent = h.id) as parent*/ ".
			",(select hhh.nama from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as hlok ".
			",(select hhh.urut from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as urut ".
			"from hirarki h where level = 3 and flag = '$cat' ".
			"order by urut asc, nama asc;";
	
	$q = db_query($s);
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	
	$fas = array();	$tisi = array();
	while ($row = mysql_fetch_assoc($q)) {
		//echo $row['id']."<br/>";
		//$tisi[$row['id']] = $row;
		$fas[$row['id']]['id'] = $row['id'];
		$fas[$row['id']]['eq'] = $row['nama'];//." ".$row['tag'];
		$fas[$row['id']]['cat'] = $row['cat'];
		$fas[$row['id']]['Lokasi'] = $row['hlok'];
	}
	//print_r($fas);

	$loop = ($sql["tbl"][0]!=$sql["tbl"][1])?2:1;

	$limit = '';
	if ($t>=14)	{
		$limit = " tgl>='{$sql["bts"][1]}' and";
	}
	
	
	//echo "{$sql["bts"][1]} ----- {$sql["bts"][0]}<br/>";
	$sql = "SELECT * FROM rh_201311 WHERE tgl BETWEEN '{$sql['bts'][1]}' AND '{$sql['bts'][0]}' ";
	//		" AND eq='21'";
	//echo "sql: $sql<br/>";
	$q = db_query($sql);
	
	if ($q)	{
		//echo "<br/>hadir<br/><br/>";
		while ($row = mysql_fetch_assoc($q)) {
			if ($eq != $row['eq'])	{
				//echo "-- ";
				$eq = $row['eq'];
				//$isi[$eq] = $row;	
				$tisi[$eq]['id'] = $row['eq'];
				$tisi[$eq]['tgl'] = $row['tgl'];
				//$jml=$jml+1;
			}
			//echo "<br/>ada<br/><br/>";
			$time = strtotime($row['tgl']);
			$ii = format_rh_time($row['rh']);
			$tisi[$eq]["k".date('ymd',$time)] = ($ii?:'-');
			//$tisi[$eq]["k".date('ymd',$time)] = ($row['rh']);
			//echo "row[rh]: {$row['rh']}<br/>";
			//echo "ii: $ii ";
		}
		//echo "<br/>jos";
		//*
		if (!isset($tisi[$eq]["k".date('ymd',$time)]))	{
			foreach ($fas as $a)	{
				//echo " -->".$a['id']."<br/>";
				for($i=13;$i>=0; $i--)	{
					//echo "eq: ".$a['id']." ".date("ymd", mktime(0, 0, 0, $m, $t-$i, $y))."<br/>";
					$fas[$a['id']]["k".date("ymd", mktime(0, 0, 0, $m, $t-$i, $y))] = '-';
				}
			}
			
		} else {
			foreach ($tisi as $data)	{
				//if ($fas[$data['id']]!=null)	{
				if(@isset($fas[$data['id']]))	{
					$fas[$data['id']] = @array_merge($fas[$data['id']],$data);
				}
			}
		}
		//*/
	}
	
	mysql_free_result($q);
	
	$isi = array();
	foreach ($fas as $data)	{
		array_push($isi, $data);
	}
	
    $jsonResult = array(
        'success' => true,
        'runninghour' => $isi
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}


echo json_encode($jsonResult);
//*/
?>
