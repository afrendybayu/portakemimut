<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rEquip extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('equip');
	}
	
	public function rEquipCat()	{
		
		try {
			$cat = $this->input->get('cat')?:'0';

			$hsl = $this->equip->get_equip_cat($cat);
			
			$jsonResult = array(
				'success' => true,
				'equip' => $hsl
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
