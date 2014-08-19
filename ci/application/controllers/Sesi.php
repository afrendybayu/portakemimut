<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sesi extends CI_Controller {
	function __construct() {
        parent::__construct();
		//$this->load->model('login');
    }
	
	public function index()	{
		 $this->session->set_userdata('username','jono');
		$this->session->set_userdata('pass','123456');
		 print_r($this->session->all_userdata());
		
		if (!$this->session->userdata('username')) {echo 'Anda Belum Login '; }
		else {echo 'Selamat Datang di Login' ;}
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>