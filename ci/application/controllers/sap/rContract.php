<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rContract extends CI_Controller {
	
	public function index()	{
		echo "index";
	}
	
	public function sapContract()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');
			$this->load->model('contract');

			$jsonResult = array(
				'success' => true,
				'contract' => $this->contract->get_contract($thn)
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

/* End of file rContract.php */
/* Location: ./application/controllers/rContract.php */
