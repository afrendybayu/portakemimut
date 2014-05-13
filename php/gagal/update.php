<?php
// Afrendy Bayu, 4Des2013 //
// KetikaHampaMelandaJiwa //


include '../connection.php';
include '../util.php';

try {
	$params = json_decode(file_get_contents('php://input'));
	//print_r($params);	
	/*
	$params = new stdClass();
	$params->id = 'u54';
	$params->lok = '';
	$params->nama = '';
	$params->downt = '2014-01-15';
	$params->downj = '10:30' ;
	$params->upt = '2014-01-15';
	$params->upj = '20:40'; 
	$params->event = '4' ;		// 1: standby
	$params->idevent = ''; 
	$params->tipeev = '';
	$params->ket ='';
	$params->exe = '';
	//*/
	
	$aw = bwaktu($params->downt, $params->downj);
	$ak = bwaktu($params->upt, $params->upj);
	$sw = bwaktu($params->startt, $params->startj);
	$sk = bwaktu($params->endt, $params->endj);
	//echo "aw: {$aw->t}, ak: {$ak->t}<br/>";

	/*
	if ($aw->t>$ak->t) exit;
	
	if ($params->event!=1)	{
		if ($aw->t>$sw->t) exit;
		if ($sw->t>$sk->t) exit;
		if ($sk->t>$ak->t) exit;
	}
	//*/
	
	$server = isset($params->server)?($params->server):"1";
	$xid = $params->id; $idAr = array(); $catAr = array(); $idJml=0;
	$tipeev = $params->tipeev;
	$cc = $params->cat;
	
	if (intval($xid)==0) {
		$level = substr($xid,0,1);
		$id = substr($xid,1);
		//echo "level: $level, id: $id<br/>";
		if ($level=='e')	{	// level equipment
			//echo "level e";
		} else if ($level=='u')	{	// level unit
			$sql = "SELECT id,cat from equip where unit_id = $id";
			//echo "sql u: $sql<br/>";
			$q = db_query($sql);
			if (!$q)	{
				echo "DB Error, could not query the database\n";
				echo 'MySQL Error: ' . mysql_error();
				exit;
			}

			while ($row = mysql_fetch_assoc($q)) {
				$idAr[$idJml]  = $row['id'];
				$catAr[$idJml] = $row['cat'];
				$idJml++;
			}
			mysql_free_result($q);
			//print_r($idAr);
		} else {
			//echo "masuk sini<br/>";
			exit;
		}
	}

	// CEK WAKTU range di database
	//$wkt = cek_waktu_range($idAr[0], $params->downt, $params->downj, $params->upt, $params->upj);
	$wkt = cek_waktu_range($idAr[0], $params->downt, $params->downj, $params->upt, $params->upj,0, $params->event);
	//$wkt = cek_waktu_range($id, $params->downt, $params->downj, $params->upt, $params->upj);
	//echo "Cek waktu range: <br/>";	print_r($wkt); echo "<br/><br/>";
	
	$kw = kombinasi_waktu($wkt->dt, $wkt->dj, $wkt->ut, $wkt->uj);
	//echo "kombinasi_waktu: ".count($kw);
	//echo "kombinasi waktu: ".count($kw)."<br/>"; print_r($kw);	echo "<br/>";
	
	if (count($kw)>0)	{
		for ($i=0; $i<count($kw); $i++)	{
			$taw1 = bwaktu($kw[$i][0],$kw[$i][1]);	//echo "taw1 : ".$taw1->t."<br/>";
			$taw2 = bwaktu($kw[$i][4],$kw[$i][5]);	//echo "taw2 : ".$taw2->t."<br/>";
			$tak1 = bwaktu($kw[$i][2],$kw[$i][3]);	//echo "tak1 : ".$tak1->t."<br/>";
			$tak2 = bwaktu($kw[$i][6],$kw[$i][7]);	//echo "tak2 : ".$tak2->t."<br/>";
			$crash = hitung_crash($tak1->t, $tak2->t, $taw1->t, $taw2->t);
			//echo "------------------crash: $crash<br/>";
			if ($crash>0)
				throw new Exception("Waktu Konflik dengan Kegagalan Lain selama $crash jam");
			//die();
			//if ($crash>0)	exit;
		}
	}
	
	// hitung running hour ketika TIDAK KONFLIK
	//echo "jml: ".count($wkt->dt)."<br/>";
	$ar=array();	$ar_av=array();	$ar_re=array();	$l=0; $m=0;
	for ($k=0; $k<count($wkt->dt); $k++)	{
		//echo "$k: ".$wkt->dt[$k].", event: ".$wkt->ev[$k]."<br/>";
		$ar = rh($wkt->dt[$k], $wkt->dj[$k], $wkt->ut[$k], $wkt->uj[$k]);
		if ($k==0)	{
			$hrh = $ar;
		}
		else {
			$hrh = hitung_hrh($hrh, $ar);		
			sort($hrh);
		}
		
		if ($wkt->ev[$k]==4) {		// Reliability
			$ar_re = rh($wkt->dt[$k], $wkt->dj[$k], $wkt->ut[$k], $wkt->uj[$k]);
			if ($l==0)	{
				$hrh_re = $ar_re;
			}
			else {
				$hrh_re = hitung_hrh($hrh_re, $ar_re);	
				sort($hrh_re);
			}
			$l++;
		}
		if (($wkt->ev[$k])>1) {		// Availability
			$ar_av = rh($wkt->dt[$k], $wkt->dj[$k], $wkt->ut[$k], $wkt->uj[$k]);
			if ($m==0)	{
				$hrh_av = $ar_av;
			}
			else {
				$hrh_av = hitung_hrh($hrh_av, $ar_av);
				sort($hrh_av);
			}
			$m++;
		}
		//echo "jmlAr[$k]: ".sizeof($ar)."<br/>"; print_r($ar);  
		//echo "<br/>---------------------<br/>";

		/*
		echo "<br/>Format_hrh RunnningHour: "; print_r($hrh); echo "<br/>";
		echo "Format_hrh Availability: "; print_r($hrh_av); echo "<br/>";
		echo "Format_hrh Reliability : "; print_r($hrh_re); echo "<br/><br/>";
		//*/
	}
	/*
	echo "<br/>Format_hrh RunnningHour: "; print_r($hrh); echo "<br/>";
	echo "Format_hrh Availability: "; print_r($hrh_av); echo "<br/>";
	echo "Format_hrh Reliability : "; print_r($hrh_re); echo "<br/><br/>";
	//*/

	//$rh = format_rh($hrh);
	$rh = format_rh_float($hrh);
	//echo "<br/>Format_rh RunnningHour: "; print_r($rh); echo "<br/>";
	//$rh_av = format_rh($hrh_av);
	$rh_av = format_rh_float($hrh_av);
	//echo "Format_rh Availability: "; print_r($rh_av); echo "<br/>";
	//$rh_re = format_rh($hrh_re);
	$rh_re = format_rh_float($hrh_re);
	//echo "Format_rh Reliability : "; print_r($rh_re); echo "<br/><br/>";
	
	//return;
	
	
	
	//echo "jadwal down: ".$params->downt.", up: ".$params->upt."<br/>";
	$k=0;	
	// $params->downt = '2013-12-16';
	// $params->upt = '2013-12-17';
	$t = bwaktu($params->downt)->t;
	$s = bwaktu($params->upt)->t;
	
	//echo "<br/>jml tgl: ".count($tgl)."<br/>";
	//*
	do {
		$u = $t + (60*60*24*$k);
		//echo "t: $t, u: $u, s: $s ".date('d-m-Y', $u)."<br/>";
		$tglx = date('Y-m-d', $u);
		
		$adatgl = cek_tgl_rh_ada($id, $tglx);	
		//print_r($adatgl);
		//$jmlTgl = count($adatgl);
		
		if(!isset($rh_av[$tglx]))	{
			//echo "tgl: $tglx tidak ada, Av: 24:00<br/>";
			//$rh_av[$tglx] = "24:00";
			$rh_av[$tglx] = "24";
		}
		//*
		if(!isset($rh_re[$tglx]))	{
			//echo "tgl: $tglx tidak ada, Re: 24:00<br/>";
			//$rh_re[$tglx] = "24:00";
			$rh_re[$tglx] = "24";
		}
		
		//*
		if ($adatgl->jml==0)	{
			//$sql = "INSERT INTO rh_201311 (eq,tgl,rh,cat) VALUES ('{$idAr[$i]}','{$waktu[$j]['tgl']}','{$waktu[$j]['jam']}','{$catAr[$i]}' )";
			//$sql = "INSERT INTO rh_201311 (eq,tgl,rh,flag) VALUES ('{$id}','".$tglx."','".$rh[$tglx]."','e".implode("e", $idAr)."' )";
			$sql =	"INSERT INTO rh_201311 (eq,tgl,rh,rh_av, rh_re,flag,bln,thn,cat) VALUES ".
					"('{$id}','$tglx','{$rh[$tglx]}','{$rh_av[$tglx]}','{$rh_re[$tglx]}','e".implode("e", $idAr)."',".
					"'".bwaktu($tglx)->bln."','".bwaktu($tglx)->thn."','$cc')";
			//echo "sql: $sql<br/>";
			$q = db_query($sql);
		} else {
			if ($adatgl->jml==1) {
				//$sql = "UPDATE rh_201311 SET rh='".$rh[$tglx]."' where id = ".$adatgl->id[0];
				$sql =  "UPDATE rh_201311 SET rh='{$rh[$tglx]}',rh_av='{$rh_av[$tglx]}',rh_re='{$rh_re[$tglx]}', ".
						"bln='".bwaktu($tglx)->bln."',thn='".bwaktu($tglx)->thn."' ".
						"where id = ".$adatgl->id[0];
				//echo "sql: $sql<br/>";
				$q = db_query($sql);
			}
		}
		//echo "sql: $sql<br/>";
		//*/
		$k++;
	} while($u<$s);
	//*/
	//*
	//echo "level: $level<br/>";
	$pm = array();
	$jmlpm = count($tipeev);
	//$tipeev = array("e34pm1", "e33pm15");
	for($i=0; $i<$jmlpm; $i++)	{
		$pmx  = explode("pm", $tipeev[$i]);
		//print_r($pmx); echo "<br/>";
		$ideq = explode("e", $pmx[0]);
		//echo "id: {$ideq[1]}<br/>";
		$pm[$i][0] = $ideq[1];
		$pm[$i][1] = $pmx[1];
	}
	
	
	$hasil = array();
	if ($level=='u') {
		
		for($i=0; $i<$idJml; $i++)	{
				$now = date("Y-m-d H:i:s");
				
				// INPUT data EVENT down ke tabel waktudown
				if ($params->event==1) {		// standby
					$sql = "INSERT INTO waktudown (server,eqid,unit_id,downt,downj,upt,upj,event,ket,nginput) ".
							"VALUES ('$server','{$idAr[$i]}','{$id}','{$params->downt}','{$params->downj}', '{$params->upt}', '{$params->upj}', ".
							"'{$params->event}','{$params->ket}','{$now}' )";
				} else {
					for($w=0; $w<$jmlpm; $w++)	{
						if ($idAr[$i]==$pm[$w][0])	break;
					}
					$sql = "INSERT INTO waktudown (server,eqid,unit_id,downt,downj,upt,upj,startt,startj,endt,endj,".
							"event,tipeev,ket,nginput) ".
							"VALUES ('$server','{$idAr[$i]}','{$id}','{$params->downt}','{$params->downj}', '{$params->upt}', '{$params->upj}', ".
							"'{$params->startt}','{$params->startj}', '{$params->endt}', '{$params->endj}',".
							"'{$params->event}','{$pm[$w][1]}','{$params->ket}','{$now}' )";
				}
				//echo "sql u: $sql<br/>";
				$q = db_query($sql);
				if (!$q)	{
					echo "DB Error, could not query the database\n";
					echo 'MySQL Error: ' . mysql_error();
					exit;
				} else {
					$sql = "SELECT id, eqid FROM waktudown order by id desc limit 0,1";
					//echo "sql u: $sql<br/>";
					
					$q = db_query($sql);
					$row = mysql_fetch_assoc($q);
					
					$x = new stdClass();
					$x->id = $row['id'];
					$x->eq = $row['eqid'];
					array_push($hasil, $x);
					
					mysql_free_result($q);
				}
		}
	}
	//return;

	//print_r($hasil); echo "<br/><br/>";
	
    $jsonResult = array(
        'success' => true,
        'tasks' => $hasil
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
