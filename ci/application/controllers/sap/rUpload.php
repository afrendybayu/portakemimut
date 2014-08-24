<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rUpload extends CI_Controller {
	
	public function index()	{
		echo "lanjut";
	}
	
	public function getUplBpm3()	{
		try {
			//*
			$this->load->library('excel');
			$this->load->model('sap');
			echo date('H:i:s') , " Load from Excel2007 file<br/>";
			$bacaFileStart = microtime(true);
			
			try {
				$objPHPExcel = PHPExcel_IOFactory::load("WO100.xlsx");
				$dt = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
			} catch(Exception $e) {
				die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
			}
			
			$bacaFileEnd = microtime(true);
			$bacaFile = $bacaFileEnd - $bacaFileStart;
			echo 'Waktu untuk baca File ' , sprintf('%.4f',$bacaFile) , " seconds<br/>";
			//*
			$prosesFileStart = microtime(true);

			$colData = count(array_filter($dt[1]));
			echo "Jml data: ".count($dt)." baris, jml Kolom: ".$colData."<br/><br/>";
			//*/
			$ff = array();
			for ($i=0; $i<$colData; $i++)	{
				$no = numtoa(array('', $i+1));
				//echo "na: "; print_r($no); echo " --- ";
				array_push($ff,$dt[2][$no[0]]);
			}
			
			for ($kk=2; $kk<=count($dt); $kk++)	{
				$c = array();
				for ($i=0; $i<$colData; $i++)	{
					$no = numtoa(array('', $i+1)); 
					array_push($c,$dt[$kk][$no[0]]);
					//echo "no[$i]: {$no[0]} : {$dt[1][$no[0]]} : <font color='red'>{$dt[44][$no[0]]}</font> <br/>";
					
				}
			}

			//*
			$jsonResult = array(
				'success' => true,
				'message' => $ff
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		print_r($ff);
		return $jsonResult;
	}


}

/* End of file rUpload.php */
/* Location: ./application/controllers/rUpload.php */
