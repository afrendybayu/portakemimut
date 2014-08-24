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
	function fTgl($x)	{
		if ($x)	{
			$x = str_replace('/', '-', $x);
			//echo "tgl asli: $x, convert: ".date('Y-m-d', strtotime($x))."<br/>";
			return date('Y-m-d', strtotime($x));
		}
		else {
			return '';
		}
	}
}

if ( ! function_exists('fDT'))	{	
	function fDT($x)	{		// 4/29/2014 8:00
		if ($x)	{
			$test = new DateTime($x);
			return date_format($test, "Y-m-d H:i:s");
		} 
		else return '';
	}
}

?>
