<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Coba extends CI_Controller {
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
					"userid"=>$row->userid,
					"pass"=>$row->pass,
					"nama"=>$row->nama);
			}
			$jsonResult = array(
						'success' => true,
						'user' => $logid
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