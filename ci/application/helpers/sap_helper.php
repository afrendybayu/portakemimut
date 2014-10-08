<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('numtoa'))	{
    function numtoa($no)	{
		$num = $no[1]-1; //echo "num: $num, no: {$no[0]}, ";
		$no[1] = (int) ($num/26);
		$nom = (int) ($num%26);
		$no[0] = strtoupper(base_convert($nom+10,10,36)).$no[0];		// .$no[0]
		if ($no[1]==0)
			return $no;
		else {
			return numtoa($no);
		}
	}
}

if ( ! function_exists('ambilFile'))	{
	function ambilFile($f)	{
		try {
			$file = $_FILES[$f];
			$fName = $file['name'];
			$fType = $file['type'];
			$fSize = $file['size'];
			$fLokasi = $file['tmp_name'];
			/*
			if (!$fSize) {
				$fSize = $_SERVER['CONTENT_LENGTH'];
			}
			//*/

			$max_upload = (int)(ini_get('upload_max_filesize'));
			$max_post = (int)(ini_get('post_max_size'));
			$memory_limit = (int)(ini_get('memory_limit'));
			$upload_mb = min($max_upload, $max_post, $memory_limit);
				
				
			switch ($file['error']) {
				case UPLOAD_ERR_OK:
					break;
				case UPLOAD_ERR_NO_FILE:
					throw new RuntimeException('No file sent.');
				case UPLOAD_ERR_INI_SIZE:
				case UPLOAD_ERR_FORM_SIZE:
					throw new RuntimeException("Exceeded filesize limit.");
				default:
					throw new RuntimeException('Unknown errors.');
			}
			$hsl = array("sukses"=>true, "nama"=>$fName, "lokasi"=>$fLokasi,
					"size"=>$fSize);
		}
		catch (Exception $e)	{
			$hsl = array("sukses"=>false, "error"=>$e->getMessage());
		}
		//echo "nama: $fileName, size: $fileSize, lokasi: $fileLokasi<br/>";
		return $hsl;
	}
}

if ( ! function_exists('cariLokasi'))	{
	function cariLokasi($x)	{
		$l = explode("-",$x);
		//print_r($l);	echo "----------> jml: ".count($l)."<br/>";
		if (count($l)>=3)
			return (int)($l[2]);
		else 
			return 0;
	}
}

if ( ! function_exists('cekInt'))	{
	function cekInt($x)	{
		if ($x)	return $x;		
		else 	return 0;
	}
}

if ( ! function_exists('fTgl'))	{
	function fTgl($t)	{
		if ($t)	{
			if (strpos($t,'/') !== false)	{	// ketemu
				$x = str_replace('/', '-', $t);
				//echo "tgl asli: $t --> $x ---> convert: ".date('Y-m-d', strtotime($x))."<br/>";
				return date('Y-m-d', strtotime($x));
			} else {
				$tx = explode('-',$t);
				//print_r($tx);
				//echo "tgl asli: $t --> $x ---> convert: ".date('Y-m-d', strtotime($tx[2]."-".$tx[1]."-".$tx[0]))."<br/>";
				return date('Y-m-d', strtotime($tx[2]."-".$tx[1]."-".$tx[0]));
			}
		}
		else {
			return '';
		}
	}
}

if ( ! function_exists('fDT'))	{	
	function fDT($x)	{		// 4/29/2014 8:00
		//echo "fDT: ".$x."<br/>";
		/*
		if ($x)	{
			echo "sblm tes ";
			$test = new DateTime($x);
			echo "tes: ".$test;
			return date_format($test, "Y-m-d H:i:s");
		}
		//*/
		if ($x) {
			list($stgl, $sjam) = sscanf($x, "%s %s");
			//echo "$stgl, $sjam<br/>";
			$xtgl = explode("/",$stgl);
			$xjam = explode(":",$sjam);
			
			//print_r($xtgl);
			//print_r($xjam);
			
			$wkt = mktime(intval($xjam[0]),intval($xjam[1]),0,intval($xtgl[1]),intval($xtgl[0]),intval($xtgl[2]));
			return date('Y-m-d H:i:s', $wkt);
		}
		else return '';
	}
}

?>
