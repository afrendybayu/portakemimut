<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rUpload extends CI_Controller {
	
	public function index()	{
		echo "lanjut";
	}
	
	public function getUplBpm3()	{
		try {
			sleep(1);
			//echo date('H:i:s') , " Load from Excel file<br/>";
			$bacaFileStart = microtime(true);
			
			//*
			$hsl = ambilFile('bpm3');
			//print_r($hsl);
			//*/
			if (!$hsl["sukses"])	{
				header('HTTP/1.0 .$returnResponse. Server status', true, $returnResponse);
				echo json_encode(array(
					'success' => false,
					'message' => "Gagal Upload File"
				));
				return;
				//echo '{success:false, message:"Faked error from server", errors:{"photo-path":"The server returned this"}}';
			}
			return;
			try {
				$this->load->library('excel');
				$this->load->model('upload');
						
				$objPHPExcel = PHPExcel_IOFactory::load($hsl["lokasi"]);
				//$objPHPExcel = PHPExcel_IOFactory::load('WO100.xlsx');
				$dt = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
				
				$bacaFileEnd = microtime(true);
				$bacaFile = $bacaFileEnd - $bacaFileStart;
				//echo 'Waktu untuk baca File ' , sprintf('%.4f',$bacaFile) , " seconds<br/>";

				$prosesFileStart = microtime(true);						
				$colData = count(array_filter($dt[1]));
				//echo "Jml data: ".count($dt)." baris, jml Kolom: ".$colData."<br/><br/>";

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
				//echo 'Waktu untuk simpan data ke database ' , sprintf('%.4f',$prosesFile) , " seconds<br/>";

				//echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB<br/>";

			} catch(Exception $e) {
				die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
			}
			
			$bacaFileEnd = microtime(true);
			$bacaFile = $bacaFileEnd - $bacaFileStart;
			//echo 'Waktu untuk baca File ' , sprintf('%.4f',$bacaFile) , " seconds<br/>";
			
			$jsonResult = array(
				'success' => true,
				'fNama'	=> $hsl["nama"],
				'fSize'	=> $hsl["size"],
				'tBacaF'=> sprintf('%.4f',$bacaFile),
				'tSaveF'=> sprintf('%.4f',$prosesFile),
				'mem'	=> (memory_get_usage(true) / 1024 / 1024)." MB"
			);
			
			/*
			$jsonResult = array(
				'success' => true,
				'message' => $bpm3
			);
			//*/
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}


		//return json_encode($jsonResult);
		echo json_encode($jsonResult);
		//$this->output->set_content_type('application/json');
		//$this->output->set_output(json_encode($jsonResult));
	}


}

/* End of file rUpload.php */
/* Location: ./application/controllers/rUpload.php */
