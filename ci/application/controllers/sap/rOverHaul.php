<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rOverHaul extends CI_Controller {
	
	public function index()	{
		echo "index overhaul";
	}
	
	public function ohTahun()	{
		try {
			$thn = $this->input->get('wkt')?:date('Y');
			$this->load->model('overhaul');
			$hsl = $this->overhaul->ohTahun($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'overhaul' => $hsl
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

/* End of file rOverHaul.php */
/* Location: ./application/controllers/rOverHaul.php */
