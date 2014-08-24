<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rHistori extends CI_Controller {
	
	public function getHistori()	{

		try {
			$thn = $this->input->get('tgl')?:date('Y');
			$this->load->model('sap');
			
			$hsl = $this->sap->get_histori($thn);
			print_r($hsl);
			
			$jsonResult = array(
				'success' => true,
				'sap' => $sap
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

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
