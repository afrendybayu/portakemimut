<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rTeco extends CI_Controller {
	
	public function index()	{
		echo "index";
	}
	
	public function sapTecoMW()	{
		try {
			$this->load->model('sap');
			
			$hsl = $this->sap->get_teco_manwork();
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'homan' => $hsl
			);
			
			//print_r($arAR);
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
