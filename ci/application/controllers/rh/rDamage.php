<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rDamage extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('damage');
	}
	
	public function readDamage(){
		try	{
			
			$hsl = $this->damage->get_damage();
			
			$jsonResult = array(
				'success' => true,
				'damage' => $hsl
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	
	}
}
