<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rMode extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('mode');
	}

	public function rModedef()	{
		
		try{
			$hsl = $this->opart->get_opartdef_cat($cat);
			
			$jsonResult = array(
				'success' => true,
				'opdef' => $hsl
			);
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	public function rModenotdef()	{
		try{
			$cat = $this->input->get('cat')?:'0';
			$hsl = $this->mode->get_modedefnotin($cat);
			
			$jsonResult = array(
				'success' => true,
				'mdef' => $hsl
			);
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	public function rModeList() {
		$cat = $this->input->get('cat')?:'0';
		try{
			$hsl = $this->mode->get_modedefcat($cat);
			
			$jsonResult = array(
				'success' => true,
				'mlist' => $hsl
			);
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	public function cModeList()	{
		$param = json_decode(file_get_contents('php://input'));
			
		if (!isset($param))	{
			throw new Exception("Input Data Tidak Ada");
		}

		try {
			$data = array('eqcat' => $param->eqcat, 'mode' => $param->list);
			$hasil = $this->mode->set_modelist($data);
			
			//echo "hsl: $hsl";
			$jsonResult = array(
				'success' => true,
				'mlist' => array('id' => $hasil)
			);
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	public function dModeList()	{
		$param = json_decode(file_get_contents('php://input'));
			
		if (!isset($param))	{
			throw new Exception("Input Data Tidak Ada");
		}
		//$data = array('id' => $param->id);
		
		try {
			$hasil = $this->mode->del_modelist($param->id);
			
			//echo "hsl: $hsl";
			$jsonResult = array(
				'success' => true,
				'mlist' => array('id' => $hasil)
			);
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}

}
