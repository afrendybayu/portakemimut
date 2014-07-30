<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rTeco extends CI_Controller {
	
	public function index()	{
		echo "index";
	}
	
	public function sapPersenTeco()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');

			$this->load->model('sap');
			
			$hsl = $this->sap->get_teco_persen($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'hoteco' => $hsl
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		
		echo json_encode($jsonResult);
	}
	
	public function sapTecoMW()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');

			$this->load->model('sap');
			
			$hsl = $this->sap->get_teco_manwork($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'homan' => $hsl
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		
		echo json_encode($jsonResult);
	
	}
}

/* End of file rTeco.php */
/* Location: ./application/controllers/rTeco.php */
