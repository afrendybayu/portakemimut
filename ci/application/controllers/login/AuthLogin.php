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
			$login = json_decode(file_get_contents('php://input'));
			
			
			if (isset ($login->userid) && isset($login->pass)){
				$login  = $this->login->ValidLogin($login->userid,$login->pass);
				
				
				foreach ($login as $row){
					$sesi = array('nama' =>$row->nama,'level' => $row->akses );
					$this->session->set_userdata('log_sesi',$sesi);
					$session_data = $this->session->userdata('log_sesi'); //sesi
					$jsonResult = array(
						'success' 	=> true,
						'rule' => array ('level' => $session_data['level'],'session' => $session_data['nama'] )
					);
				}
			}
			
			else{
				$jsonResult = array(
					'success' => false,
					'rule' => 'Gagal Login'
				);	
			
			
			}
			
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		echo json_encode($jsonResult);
	}
	public function isSession(){
		$sesi = $this->session->userdata('log_sesi');
		try{
			
			// print_r($sesi);
			if ($sesi){
				$sessi = array ('nama' => $sesi['nama'],'akses' => $sesi['level'] );
				$jsonResult = array(
					'success'	=> true,
					'sesi' 		=> $sessi
				);
			}
			else {
				
				$jsonResult = array(
					'success'	=> false,
					'sesi' 		=> 'Belum Login'
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
	public function isUnset(){
		$usesi = $this->session->unset_userdata('log_sesi');
		try{
			$jsonResult = array(
				'success'	=> true,
				'unset' 	=> 'sukses'
			);
			echo json_encode($jsonResult);
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
	}
}

?>
