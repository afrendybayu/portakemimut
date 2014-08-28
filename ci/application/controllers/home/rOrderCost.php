<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rOrderCost extends CI_Controller {
	
	public function index()	{
		echo "index";
	}
	
	public function sapOCost()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');

			$this->load->model('cost');
			
			$hsl = $this->cost->get_ordercost($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'hoorderc' => $hsl
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

/* End of file rOrderCost.php */
/* Location: ./application/controllers/rOrderCost.php */
