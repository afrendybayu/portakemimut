<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rGroupUnit extends CI_Controller {
	
	public function index()	{
		//$kal = array(1 => "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "YTD/Avg");
		
		//print_r($kal);
		if (isset($_GET['eq']))	{
			$eq = $_GET['eq'];
		} else {
			$eq = 0;
		}
		
		echo $eq;
		
		$thn = date("Y");
		$bln = date("n");
		$thnm1 = $thn-1;
		
		echo $thn;
		/*
		try {
			$arAvRe = array();
			for ($i=0; $i<12; $i++)	{
				//$z = blnthn($i+1,$thnm1);
				$arAvRe[$i]['av'.$thnm1] = 0;
				$arAvRe[$i]['re'.$thnm1] = 0;
				$arAvRe[$i]['av'.$thn] = 0;
				$arAvRe[$i]['re'.$thn] = 0;
				$arAvRe[$i]['b'] = $i;
				//$arAvRe[$i]['m'] = nmbulan($i,1);
				$arAvRe[$i]['m'] = $kal[$i+1];
			}
			
			print_r($arAvRe);
			
			
			
			
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		
		echo json_encode($jsonResult); */
	
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */