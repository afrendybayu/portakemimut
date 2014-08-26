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
		// $username = $this->input->post('username');
		// $password = $this->input->post('password');
		//echo $username.' dan '.$password; 
		// print_r (json_decode(file_get_contents('php://input')));
		try{
			$log = json_decode(file_get_contents('php://input'));
			// echo "data login : {$log->userid}";
					
			// $query = $this->login->ValidLogin($username,$password);	
			if (isset ($log->userid) && isset($log->pass)){
				// if ($query->num_rows == 1){
				// foreach ()
				$jsonResult = array(
					'success' 	=> true,
					'isAutenticated' => array ('session' => 'admin', 'level' => '5' )
				);
				
				/*
				$sesi = array();
				foreach ($query->result() as $row){
					$sesi = array(
						'nama' =>$row->nama,
						'userid' => $row->userid 
					);
					$this->session->set_userdata('log_sesi',$sesi);
				}*/
				/*print_r($sesi);
				$session_data = $this->session->userdata('log_sesi');
				echo $session_data['nama'];*/
				
				}
			
			
			//}
			
			else{
				$jsonResult = array(
					'success' => false,
					'isAutenticated' => 'belum masuk'
				);	
			}
			echo json_encode($jsonResult);
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
	}
	
	public function isSession(){
		try {
			$session_data = $this->session->userdata('log_sesi');
			//echo $session_data['nama'];
			$rule = array(
				'userid' 	=> $session_data['userid'],
				'level'		=> $session_data['nama']);
			$jsonResult = array(
				'success' => true,
				'rule' => $rule);
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