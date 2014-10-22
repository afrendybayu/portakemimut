<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rUser extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('login');
	}
	
	public function index()	{
		
		try {
			
			$hsl = $this->login->get_user();
			
			$jsonResult = array(
				'success' => true,
				'userlist' => $hsl
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

/* End of file rLokUnit.php */
/* Location: ./application/controllers/konfig/rLokUnit.php */
