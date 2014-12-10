<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rJabat extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('option');
	}
	
	
	public function index()	{
		echo "index";
	}
	
	public function rNJ()	{
		//echo "rJabat<br/>";
		try {
			$hsl = $this->option->get_oh_report();
			
			$jsonResult = array(
					'success' => true,
					'jabat' => $hsl
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

/* End of file rJabat.php */
/* Location: ./application/controllers/rJabat.php */
