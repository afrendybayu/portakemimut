<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rUnit extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('hirarki');
	}
		
	public function index()	{
		try{
			
			$fl = $this->input->get('f') ? $this->input->get('f'):5;
			//echo  $this->input->get('f').'<br>'; 
			//echo  $fl.'<br>';
			$hsl = $this->hirarki->get_unit_lok($fl);
			
			$jsonResult = array(
				'success' => true,
				'unitsapu' => $hsl
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
