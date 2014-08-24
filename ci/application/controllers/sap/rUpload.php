<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rUpload extends CI_Controller {
	
	public function index()	{
		echo "lanjut";
	}
	
	public function getUplBpm3()	{
		try {
			
			sleep(1);
			echo date('H:i:s') , " Load from Excel file<br/>";
			$bacaFileStart = microtime(true);
			/*
			$hsl = ambilFile('bpm3');
			//print_r($hsl);
			
			if ((!$hsl["sukses"]) || (!file_exists($hsl["lokasi"])))	{
				return array(
					'success' => false,
					'message' => $e->getMessage()
				);
			}
			//*/
			
			try {
				$this->load->library('excel');
				$this->load->model('upload');
						
				//$objPHPExcel = PHPExcel_IOFactory::load($hsl["lokasi"]);
				$objPHPExcel = PHPExcel_IOFactory::load('WO100.xlsx');
				$dt = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
				
				$bacaFileEnd = microtime(true);
				$bacaFile = $bacaFileEnd - $bacaFileStart;
				echo 'Waktu untuk baca File ' , sprintf('%.4f',$bacaFile) , " seconds<br/>";

				$prosesFileStart = microtime(true);						
				$colData = count(array_filter($dt[1]));
				echo "Jml data: ".count($dt)." baris, jml Kolom: ".$colData."<br/><br/>";

				$ff = array();
				for ($i=0; $i<$colData; $i++)	{
					$no = numtoa(array('', $i+1));
					array_push($ff,$dt[2][$no[0]]);
				}

				for ($kk=2; $kk<=count($dt); $kk++)	{
					$c = array();
					for ($i=0; $i<$colData; $i++)	{
						$no = numtoa(array('', $i+1)); 
						array_push($c,$dt[$kk][$no[0]]);
						//echo "no[$i]: {$no[0]} : {$dt[1][$no[0]]} : <font color='red'>{$dt[44][$no[0]]}</font> <br/>";
					}
					$this->upload->insert_bpm3($c);
				}
				
				$prosesFileEnd = microtime(true);
				$prosesFile = $prosesFileEnd - $prosesFileStart;
				echo 'Waktu untuk simpan data ke database ' , sprintf('%.4f',$prosesFile) , " seconds<br/>";

				echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB<br/>";

			} catch(Exception $e) {
				die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
			}
			
			$bacaFileEnd = microtime(true);
			$bacaFile = $bacaFileEnd - $bacaFileStart;
			echo 'Waktu untuk baca File ' , sprintf('%.4f',$bacaFile) , " seconds<br/>";
			//*/	

			/*
			if (file_exists("upload/" . $fileName))	{
				echo $fileName . " already exists. ";
			} 
			//*
			else  {
				//move_uploaded_file($fileLokasi, "upload/" . $fileName);
				//$tersimpan = true;
				//echo "Stored in: " . "upload/" . $fileName;
			}
			//echo "hasil: $hsl";
			
			try {
				$objPHPExcel = PHPExcel_IOFactory::load($fileLokasi);
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
			//*/
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
		//print_r($ff);
		return $jsonResult;
	}


}

/* End of file rUpload.php */
/* Location: ./application/controllers/rUpload.php */
