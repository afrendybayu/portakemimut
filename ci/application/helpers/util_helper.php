<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


if ( ! function_exists('format_rh_time'))	{
    function format_rh_time($a)	{
		//echo ">>>>>>>>>"; print_r($a);	echo "<br/>";
		return float2min($a);
	}
}

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
		$bulan = array("Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
		
		return ($l>0)?$bln[$i]:$bulan[$i];
	}
}

if ( ! function_exists('nmMonth'))	{
	function nmMonth($i, $l)	{
		$bln   = array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
		$bulan = array("Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember");
		
		return ($l>0)?$bln[$i]:$bulan[$i];
	}
}

if ( ! function_exists('blnthn'))	{
	function blnthn($b, $t)	{
		return "$t".pad($b);
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

if ( ! function_exists('format_rh'))	{
	function format_rh($a, $rh)	{
		//echo ">>>>>>>>>"; print_r($a);	echo "<br/>";
		$b = array();
		$jml = count($a);
		if ($jml>0)	{
			for($i=0; $i<count($a); $i++)	{
				//$a[$i]['jam'] = float2min(24+$a[$i]['jam']);
				//$b[$a[$i]['tgl']] = $a[$i]['jam'];
				$b[$a[$i]['tgl']] = 24+$a[$i]['jam'];
				
				//echo ": ".$a[$i]['tgl']." ---> ".$a[$i]['jam']."<br/>";
			}
		}
		else {
			for($i=0; $i<count($rh); $i++)	{
				//$a[$i]['jam'] = float2min(24+$a[$i]['jam']);
				$b[$rh[$i]['tgl']] = float2min(24);
				//echo ": ".$a[$i]['tgl']." ---> ".$a[$i]['jam']."<br/>";
			}
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

if ( ! function_exists('goleki_wayah'))	{
	function goleki_wayah($pd, $pu, $dd, $du, $tole) {
		$baw_def_a = strtotime(hari_dengan_tole($pd,-$tole));
		$baw_def_b = strtotime(hari_dengan_tole($pd,$tole));
		$bak_def_a = strtotime(hari_dengan_tole($pu,-$tole));
		$bak_def_b = strtotime(hari_dengan_tole($pu,$tole));
			//*
		$baw_db_a = strtotime(hari_dengan_tole($dd,-$tole));
		$baw_db_b = strtotime(hari_dengan_tole($dd,$tole));
		$bak_db_a = strtotime(hari_dengan_tole($du,-$tole));
		$bak_db_b = strtotime(hari_dengan_tole($du,$tole));
		
		$baw_a = date('Y-m-d',($baw_def_a<$baw_db_a)?$baw_def_a:$baw_db_a);
		$baw_b = date('Y-m-d',($baw_def_b>$baw_db_b)?$baw_def_b:$baw_db_b);
		$bak_a = date('Y-m-d',($bak_def_a<$bak_db_a)?$bak_def_a:$bak_db_a);
		$bak_b = ($bak_def_b>$bak_db_b)?$bak_def_b:$bak_db_b;
		$bak_b = ($bak_b<strtotime(date('Y-m-d')))?date('Y-m-d',($bak_b)):date('Y-m-d');
		
		return array("baw_a" => $baw_a, "baw_b" => $baw_b, "bak_a" => $bak_a, "bak_b" => $bak_b);
	}
}

if ( ! function_exists('rh'))	{
	function rh($taw, $jaw, $tak, $jak) {
		//$w = new stdClass();
		//echo "taw: "; print_r($taw); echo "<br/>";
		//echo "tak: "; print_r($tak); echo "<br/>";
		$w = array();
		$tglaw = bwaktu($taw);	
		$tglak = bwaktu($tak);
		/*
		echo "<br/>thn: {$tglaw->thn}, bln: {$tglaw->bln}, tgl: {$tglaw->tgl} {$jaw} --->{$tglaw->t}<br/>";
		echo "thn: {$tglak->thn}, bln: {$tglak->bln}, tgl: {$tglak->tgl}  {$jak}--->{$tglak->t}<br/>";
		//*/
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
		//echo "rh: ";	print_r($w); echo "<br/>";
		return $w;
	}
}

if ( ! function_exists('bwaktu'))	{
	function bwaktu($d, $t="00:00:00") {
		$w = new stdClass();
		$dd = explode("-", $d);	
		$tt = explode(":", $t);	
		//print_r($dd); echo "<br/>";	print_r($tt); echo "<br/>";
		//echo "{$dd[0]} {$dd[1]} {$dd[2]} {$tt[0]} {$tt[1]} {$tt[2]}";
		//echo "{$dd[0]} {$dd[1]} {$dd[2]} {$tt[0]} {$tt[1]}  ";
		$w->thn = $dd[0];
		$w->bln = $dd[1];
		$w->tgl = $dd[2];
		
		$w->jam = isset($tt[0])?$tt[0]:0;
		$w->min = isset($tt[1])?$tt[1]:0;
		$w->det = isset($tt[2])?$tt[2]:0;
		
		//$w->jam = $tt[0];
		//$w->min = $tt[1];
		//$w->det = $tt[2];
		
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

if ( ! function_exists('cek_waktu_avre'))	{
	function cek_waktu_avre($wkt)	{
		$kal = array(1 => "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "YTD/Avg");
		$atgl = explode(" ",$wkt);
		$n = count($atgl);
		
		if ($n==1)	{
			//$tgl = $atgl[0]."-12";
			$thn = $atgl[0];
			$bln = 0;
		} else if ($n==2)	{
				
			//echo "in: ".in_array($atgl[0], $kal)."<br/>";
			if (in_array($atgl[0], $kal))	{
				$bln = array_search($atgl[0], $kal);
			}
				//echo "no: $no<br/>";
			$thn = $atgl[1];
		}
		return array($bln,$thn);
	}
}

?>
