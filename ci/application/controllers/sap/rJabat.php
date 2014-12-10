<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rJabat extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('option');
	}
	
	
	public function index()	{
		echo "index";
	}
	
	public function cNJ()	{
		$par = json_decode(file_get_contents('php://input'));

		try {
			if (!isset($par))	{
				throw new Exception("Input Data Tidak Ada");
			}
			
			// nPre','jPre','nRev','jRev','nApr','jApr'
			$this->option->set_oh_report($par->nPre,$par->jPre,$par->nRev,$par->jRev,$par->nApr,$par->jApr);
			$jsonResult = array(
				'success' => true
				//'hir' => array('id' => $par->id)
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
