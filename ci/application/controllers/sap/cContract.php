<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class cContract extends CI_Controller {
	
	function __construct() {
        parent::__construct();
		$this->load->model('contract');
	}
	
	public function index()	{
		//*
		try	{
			$params = json_decode(file_get_contents('php://input'));
			/*
			$params->bln = 'b4';
			$params->thn = '2014';
			$params->nilai = 134;
			$params->tipe = 5;
			//print_r($params); echo "<br/>";
			//*/
			if (!isset($params))	{
				throw new Exception("Data Tidak ada !!");
			}
			//*
			if (isset($params->bln))	{
				$dbln = explode('b',$params->bln);
				$bln = $dbln[1];
			}
			else {
				$bln = date('n');
			}
			$thn = (isset($params->thn))?$params->thn:date('Y');

			$this->load->model('contract');
			//echo "nilai: ".floatval($params->nilai).",bln: ".$bln.", tipe: ".$params->tipe.",thn: ".$params->thn;
			$hasil = $this->contract->uicontract(floatval($params->nilai), $bln, $params->tipe, $params->thn);
			
			//print_r($hasil);
			$jsonResult = array(
				'success' => true,
				'tasks' => $hasil
			);
			
			//*/
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		
		
		//$hasil['json'] = $jsonResult;
		//$this->output->set_content_type('application/json');
		//$this->output->set_output(json_encode($jsonResult));
		echo json_encode($jsonResult);
	}
	
	public function ini()	{
		echo "coba oni";
	}
	
	public function usKontrak()	{
		try	{
			$params = json_decode(file_get_contents('php://input'));

			if (!isset($params))	{
				throw new Exception("Data Tidak ada !!");
			}
			$id = $params->id;
			$isidata = array(
				'nokont'=> $params->nokont,
				'vend'=> $params->vend,
				'awal'=> $params->awal,
				'akhir'=> $params->akhir,
				'ket'=> $params->ket,
				'nilai'=> $params->nilai,
				
			);
			
			
			$hasil = $this->contract->usKontrak($isidata,$id);

			$jsonResult = array(
				'success' => true,
				'tasks' => $hasil
			);
			
			//*/
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	public function csKontrak()	{
		try	{
			$params = json_decode(file_get_contents('php://input'));
			
			//print_r($params);

			if (!isset($params))	{
				throw new Exception("Data Tidak ada !!");
			}
			//print_r($params);
			$isidata = array(
				'nokont'=> $params->nokont,
				'vend'=> $params->vend,
				'awal'=> $params->awal,
				'akhir'=> $params->akhir,
				'ket'=> $params->ket,
				'nilai'=> $params->nilai,
			);
			//print_r($isidata);
			$hasil = $this->contract->csKontrak($isidata);
			
			$jsonResult = array(
				'success' => true,
				'kontrak' => $hasil
			);
			
			//*/
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

		echo json_encode($jsonResult);
	}

	public function dsKontrak(){
		
		try {
			$par = json_decode(file_get_contents('php://input'));

			if (!isset($par))	{
				throw new Exception("Data Tidak ada !!");
			}

			$hasil = $this->contract->dsKontrak($par);
			$jsonResult = array(
				'success' => false,
				'message' => $hasil
			);
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
		
	}
}

/* End of file cContract.php */
/* Location: ./application/controllers/cContract.php */
