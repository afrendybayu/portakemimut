<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rOverHaul extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('overhaul');
	}
	
	
	public function index()	{
		echo "index overhaul";
	}
	
	public function ohTahun()	{
		try {
			$thn = $this->input->get('wkt')?:date('Y');
			$hsl = $this->overhaul->ohTahun($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'overhaul' => $hsl
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
	
	public function cbEquip()	{
		try {
			$hsl = $this->overhaul->ohEquip();
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'cbequip' => $hsl
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
	
	public function createOH(){
		try {
			$hsl = $this->overhaul->set_ohlist();
		
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		
		// echo json_encode($jsonResult);
	
	}
	public function readOH(){
		try {
			$hsl = $this->overhaul->get_ohlist();
			//print_r($hsl);
			
			$jsonResult = array(
				'success' => true,
				'overhaulin' => $hsl
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
	
	public function removeOH(){
		try {
			$ohtb = json_decode(file_get_contents('php://input'));
			
			$this->db->where('id', $ohtb->id);
			$this->db->delete('ohlist');
						
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
	
	}
	public function updateOH(){
		try {
			//$ohtb = json_decode(file_get_contents('php://input'));
			$hsl = $this->overhaul->update_ohlist();
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
	}

}

/* End of file rOverHaul.php */
/* Location: ./application/controllers/rOverHaul.php */
