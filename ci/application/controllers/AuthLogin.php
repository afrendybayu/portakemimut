<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class AuthLogin extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('login');
    }
	
	public function index()	{
		
		try {
			$query = $this->login->getLogAuth();
			foreach ($query->result() as $row)
			{
			   $logid[] = array(
					"user"=>$row->userid,
					"pass"=>$row->pass,
					"nama"=>$row->nama);
			}
			$jsonResult = array(
						'success' => true,
						'logged' => $logid
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
	
	public function isLoggin(){
		
		try{
			$username = $this->input->post('username');
			$password = $this->input->post('password');
			
			//echo $username.' dan '.$password; 
			
			$query = $this->login->ValidLogin($username,$password);
			
			if ($query->num_rows == 1){
				$this->output->set_output(json_encode(array(
					'status' => 'success',
					'isAuthenticated' => 'true')
				));
				/*
				
				$log[] = array(
					"status"=>'success',
					'isAuthenticated' => 'true');*/
			}
			else{
				$this->output->set_output(json_encode( array('status' => 'failure')));
				// $log[] = array("status"=>'failure');
			}
			/*
			$jsonResult = array(
						'success' => true,
						'logged' => $log
					);
			echo json_encode($jsonResult);
			
			*/
		}
		catch(Exception $e){
			$jsonResult = array(
				// 'success' => false,
				'message' => $e->getMessage()
			);	
		}
	
	
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>