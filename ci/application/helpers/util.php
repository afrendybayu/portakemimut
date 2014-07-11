<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('isDate'))	{
	function isDate($date)	{
		$date = str_replace(array('.', '-', '\\'), '/', $date);
		return 1 === preg_match(
			'/^(?:20|19)[0-9]{2}([-.\\/])(?:0?[1-9]|1[012])\\1(?:0?[1-9]|[12][0-9]|3[01])$/',
			$date
		);
	}
}

if ( ! function_exists('pad'))	{
	function pad($a)	{
		return ($a<10)?("0".$a):$a;
	}
}

if ( ! function_exists('nmbulan'))	{
	function nmbulan($i, $l)	{
		$bln   = array("Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des");
		$bulan = array("Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desesember");
		
		return ($l>0)?$bln[$i]:$bulan[$i];
	}
}

if ( ! function_exists('cek_unit'))	{
	function cek_unit($id)	{
		$sqlawal = "select kode from cat_equip where parent=0 and id=$id";
		//echo "sql u: $sqlawal<br/>";
		$q = db_query($sqlawal);
		if (!$q)	{
			echo "DB Error, could not query the database\n";
			echo 'MySQL Error: ' . mysql_error();
			exit;
			//throw new Exception('Query Equipment pada Unit SALAH');
		}
		$row = mysql_fetch_assoc($q);
		//echo ($row['nilai']);
		return ($row['kode']);
	}
	
}

if ( ! function_exists('blnthn'))	{
	function blnthn($b, $t)	{
		return "$t".pad($b);
	}
}

if ( ! function_exists('cek_tole_hari'))	{
	function cek_tole_hari()	{
		$sqlawal = "select nilai from options where nama = 'tole_hari'";
		//echo "sql u: $sqlawal<br/>";
		$q = db_query($sqlawal);
		if (!$q)	{
			echo "DB Error, could not query the database\n";
			echo 'MySQL Error: ' . mysql_error();
			exit;
		}
		$row = mysql_fetch_assoc($q);
		//echo ($row['nilai']);
		return ($row['nilai']);
	}
	
}

if ( ! function_exists('cek_waktu_range'))	{
	function cek_waktu_range($id, $downt, $downj, $upt, $upj, $flag=0, $event, $edit, $idid)	{
	//echo "cek_waktu_range flag: $flag, event: $event<br/>";
		$w = new stdClass();
		$ii=0; $dt=array(); $dj=array(); $ut=array(); $uj=array(); $ev=array();
		$sql =	"SELECT id,downt,downj,upt,upj,event FROM waktudown WHERE eqid='{$id}' ".
				"AND (downt BETWEEN '".hari_dengan_tole($downt,-cek_tole_hari())."' AND '".hari_dengan_tole($downt,cek_tole_hari())."' ".
				"OR upt BETWEEN '".hari_dengan_tole($upt,-cek_tole_hari())."' AND '".hari_dengan_tole($upt,cek_tole_hari())."') ";
		if ($edit) $sql .= "AND id NOT IN (".implode(',',$idid).")";

		$q = db_query($sql);
		if (!$q)	{
			//echo "DB Error, could not query the database\n";
			throw new Exception("DB Error, could not query the database");
			echo 'MySQL Error: ' . mysql_error();
			exit;
		}
		while ($row = mysql_fetch_assoc($q)) {
			$dt[$ii]  = $row['downt'];		$dj[$ii]  = $row['downj'];
			$ut[$ii]  = $row['upt'];		$uj[$ii]  = $row['upj'];
			$ev[$ii]  = $row['event'];
			$ii++;
		}
		mysql_free_result($q);
		
		if ($flag==0)	{	// flag = 0 jika 
			$dt[$ii]  = $downt;		$dj[$ii]  = $downj;
			$ut[$ii]  = $upt;		$uj[$ii]  = $upj;
			$ev[$ii]  = $event;
		}
		//print_r($dt);
		$w->dt=$dt;		 $w->dj = $dj;
		$w->ut=$ut;		 $w->uj = $uj;
		$w->ev=$ev;
		//print_r($w);
		return $w;
	}
}

if ( ! function_exists('kombinasi_waktu'))	{
	function kombinasi_waktu($ar1, $ar2, $ar3, $ar4)	{
		$xar=array(); $urut=array();
		//echo "jml : ".count($ar1);
		for ($i=0; $i<(count($ar1)-1); $i++)	{
			for($j=0; $j<(count($ar1)-1); $j++)	{
				//if ($i<=$j)	{
				if ($i<=$j)	{
					$urut[0] = $ar1[$i];		
					$urut[1] = $ar2[$i];
					$urut[2] = $ar3[$i];		$urut[3] = $ar4[$i];
					$urut[4] = $ar1[$j+1];		
					$urut[5] = $ar2[$j+1];
					$urut[6] = $ar3[$j+1];		$urut[7] = $ar4[$j+1];
					array_push($xar,$urut);
				}
			}
		}
		//print_r($xar);
		return $xar;
	}
}

if ( ! function_exists('hari_dengan_tole'))	{
	function hari_dengan_tole($tgl,$a)	{
		//$wkt = bwaktu($tgl)->t+($a*60*60*24*cek_tole_hari());
		$wkt = bwaktu($tgl)->t+($a*60*60*24);
		//echo date('d-m-Y',$wkt);
		return date('Y-m-d',$wkt);
	}
}

if ( ! function_exists('hitung_crash'))	{
	function hitung_crash($from1,$from2,$to1,$to2)	{
		$intersect = min($from1, $from2) - max($to1,$to2);
		if ( $intersect < 0 ) $intersect = 0;
		
		
		$overlap = $intersect / 3600;
		if ( $overlap <= 0 )	{
			//echo "TIDAK konflik<br/>";
			return 0;
		} else {
			//echo '<p>There is a time conflict where the times overlap by ' , $overlap , ' hours.</p>';
			return $overlap;
		}
	}
}

if ( ! function_exists('min2float'))	{
	function min2float($s) {
		$w = explode(":", $s);	//print_r($w); // echo "----> ".(intval($w[1])/60)."<br/>";
		return (intval($w[0])+(intval($w[1])/60));
	}
}

if ( ! function_exists('float2min'))	{
	function float2min($s) {
		$hour = floor($s);		// jam
		return (sprintf("%02s", floor($s)).":".sprintf("%02s", round(60*($s-$hour))));
	}
}

if ( ! function_exists('cek_tgl_rh_ada'))	{
	function cek_tgl_rh_ada($id, $tgl) {
		//$sql = "select tgl from rh_201311 where id='$id' and tgl>='{$downt}' and tgl<='{$upt}'";
		$sql = "select id from rh_201311 where eq='$id' and tgl='{$tgl}'";
		//$sql = "select count(tgl) as jml from rh_201311 where eq=54 and tgl='$tgl'";
		//echo "sql: $sql<br/>";
		$q = db_query($sql);
		
		$adaTgl = new stdClass(); $ar = array();
		if (!$q)	{
			echo "DB Error, could not query the database\n";
			echo 'MySQL Error: ' . mysql_error();
			exit;
		}
		while ($row = mysql_fetch_assoc($q)) {
			$ar[] = $row['id'];
		}
		mysql_free_result($q);
		
		//echo "adaTgl: "; print_r($adaTgl); echo "<br/>";
		$adaTgl->id = $ar;
		$adaTgl->jml = count($ar);
		return $adaTgl;
	}
}

if ( ! function_exists('format_rh'))	{
	function format_rh($a)	{
		//echo ">>>>>>>>>"; print_r($a);	echo "<br/>";
		$b = array();
		for($i=0; $i<count($a); $i++)	{
			$a[$i]['jam'] = float2min(24+$a[$i]['jam']);
			$b[$a[$i]['tgl']] = $a[$i]['jam'];
			//echo ": ".$a[$i]['tgl']." ---> ".$a[$i]['jam']."<br/>";
		}
		//print_r($b);
		return $b;
		//*/
	}
}

if ( ! function_exists('format_rh_float'))	{
	function format_rh_float($a)	{
		//echo ">>>>>>>>>"; print_r($a);	echo "<br/>";
		$b = array();
		for($i=0; $i<count($a); $i++)	{
			$a[$i]['jam'] = (24+$a[$i]['jam']);
			$b[$a[$i]['tgl']] = $a[$i]['jam'];
			//echo ": ".$a[$i]['tgl']." ---> ".$a[$i]['jam']."<br/>";
		}
		//print_r($b);
		return $b;
		//*/
	}
}

if ( ! function_exists('hitung_hrh'))	{
	function hitung_hrh($a, $b) {
		//echo "<br/>jml a: ".count($a).",   b: ".count($b)."";
		$flag = 1;
		for ($j=0; $j<count($b); $j++) {
			for ($i=0; $i<count($a); $i++) {
				$flag++;
				if ($a[$i]['tgl']==$b[$j]['tgl']) {
					//echo "tgl: {$b[$j]['tgl']} flag: $flag<br/>";
					$a[$i]['jam'] = $a[$i]['jam']+$b[$j]['jam'];
					$flag = 0;
					break;
				}
			}
			if ($flag>0)	{
				//echo "tgl: {$b[$j]['tgl']} flag: $flag<br/>";
				array_push($a,$b[$j]);
				//echo "array_push !!!<br/>";
			}
			$flag = 0;
		}
		return $a;
	}
}

if ( ! function_exists('rh'))	{
	function rh($taw, $jaw, $tak, $jak) {
		//$w = new stdClass();
		$w = array();
		$tglaw = bwaktu($taw);	
		$tglak = bwaktu($tak);
		
		//echo "<br/>thn: {$tglaw->thn}, bln: {$tglaw->bln}, tgl: {$tglaw->tgl} --->{$tglaw->t}<br/>";
		//echo "thn: {$tglak->thn}, bln: {$tglak->bln}, tgl: {$tglak->tgl} --->{$tglak->t}<br/>";
		
		$i=0; $shari=(60*60*24); $rh=0;
		do {	// cari TOTAL waktu down perhari !!! bukan running hour
			if ($i==0)	{
				$tmp = $tglaw->t;
				$rh = (min2float($jaw)-24);
			} else if ($tmp==$tglak->t) {
				$rh = -min2float($jak);
			} else {
				$rh = -24;
			}
			//*
			if (($tmp==$tglak->t) && ($tglaw->t==$tglak->t)) {
				//echo "selisih menit: ".(min2float($jak)-min2float($jaw))."<br/>";
				$rh = (min2float($jaw)-min2float($jak));
			}
			//*/
			/*
			if ($tmp>$tglak->t) exit;
			if ($tmp==$tglak->t) {
				if (min2float($jak)<=min2float($jaw)) exit;
			}
			//*/
			//$strw = date('Y-m-d', $tmp);
			//echo "sql: $strw $rh $tmp/{$tglak->t}<br/>";
			
			$w[$i]['tgl'] = date('Y-m-d', $tmp);
			$w[$i]['jam'] = $rh;
			
			$tmp+= $shari;
			$i++;
		} while(($tmp<=$tglak->t) && ($i<365));
		return $w;
	}
}

if ( ! function_exists('bwaktu'))	{
	function bwaktu($d, $t="0:0:0") {
		$w = new stdClass();
		$dd = explode("-", $d);	
		$tt = explode(":", $t);	
		//print_r($dd); echo "<br/>";	print_r($tt); echo "<br/>";
		
		$w->thn = $dd[0];
		$w->bln = $dd[1];
		$w->tgl = $dd[2];
		
		$w->jam = $tt[0];
		$w->min = $tt[1];
		$w->det = $tt[2];
		
		$w->t = mktime( $w->jam,$w->min,$w->det, $w->bln,$w->tgl,$w->thn);
		//echo "bwaktu() >> t: ".$w->t."<br/>";
		return $w;
	}
}

if ( ! function_exists('hitung_jambulan'))	{
	function hitung_jambulan($awal, $akhir)	{
		$date1=date_create($awal);
		$date2=date_create($akhir);
		$diffx=date_diff($date1,$date2);
		
		return (intval($diffx->format("%a"))*24);
		//return (intval($diffx->format("%a"))*1);
	}
}



?>
