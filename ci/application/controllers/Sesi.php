<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sesi extends CI_Controller {
	function __construct() {
        parent::__construct();
		
    }
	
	public function index()	{
		try {
			
			$session_data = $this->session->userdata('log_sesi');
			//echo $session_data['nama'];
			
			$rule = array(
				'userid' 	=> $session_data['userid'],
				'level'		=> $session_data['nama']			
			);
			
			$jsonResult = array(
						'success' => true,
						'rule' => $rule
					);
			echo json_encode($jsonResult);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		
		
	
	
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>