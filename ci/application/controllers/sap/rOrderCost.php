<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rOrderCost extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('sap');
	}
	
	public function index()	{
		echo "index saop";
	}
	
	public function sapOCostWo()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');

			$hsl = $this->sap->get_ordercostwo($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'orderc' => $hsl
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
	
	public function sapOCostOt()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');

			$hsl = $this->sap->get_ordercostot($thn);

			for($i=0; $i<count($hsl); $i++)		{
				if ($hsl[$i]->otipe === "EP01")		$hsl[$i]->desc = "Corrective Order";
				if ($hsl[$i]->otipe === "EP02")		$hsl[$i]->desc = "Breakdown Order";
				if ($hsl[$i]->otipe === "EP03")		$hsl[$i]->desc = "Scheduled Order";
				if ($hsl[$i]->otipe === "EP04")		$hsl[$i]->desc = "General Order";
				if ($hsl[$i]->otipe === "EP05")		$hsl[$i]->desc = "Modification Order";
			}
			
			$jsonResult = array(
				'success' => true,
				'orderc' => $hsl
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
	
	public function sapPsOCwo()		{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$hsl = $this->sap->get_persen_ocwo($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'orderc' => $hsl
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
	
	public function sapPsOCot()		{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$this->load->model('sap');
			$hsl = $this->sap->get_persen_ocot($thn);
			
			//print_r($hsl);
			/*
			for($i=0; $i<count($hsl); $i++)		{
				if ($hsl[$i]->nama === "EP01")		$hsl[$i]->nama .= "<br/>Corrective Order";
				if ($hsl[$i]->nama === "EP02")		$hsl[$i]->nama .= "<br/>Breakdown Order";
				if ($hsl[$i]->nama === "EP03")		$hsl[$i]->nama .= "<br/>Scheduled Order";
				if ($hsl[$i]->nama === "EP04")		$hsl[$i]->nama .= "<br/>General Order";
				if ($hsl[$i]->nama === "EP05")		$hsl[$i]->nama .= "<br/>Modification Order";
			}
			//*/
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'orderc' => $hsl
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
	
	public function sapTop10()		{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			//$this->load->model('sap');
			$hsl = $this->sap->get_topten($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'orderc' => $hsl
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
	
	public function sapTop10FL()		{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$this->load->model('sap');
			$hsl = $this->sap->get_toptenFL($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'orderc' => $hsl
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
	
	public function sapPmCost()		{
		//echo "ini ";
		try {
			$thn = $this->input->get('thn')?:date('Y');
			//echo "thn: $thn<br/>";
			$this->load->model('sap');
			$hsl = $this->sap->get_pm_cost($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'orderc' => $hsl
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
	
	public function sapManOCost()		{
		try {
			$p = json_decode(file_get_contents('php://input'));

			if (!isset($p))	{
				throw new Exception("Data Tidak ada !!");
			}
			//echo "thn: $thn<br/>";
			$this->load->model('sap');
			$this->sap->set_ocost($p->thn, $p->wo, $p->otype, $p->budget);
			
			$hsl = new stdClass();
			$hsl->thn = $p->thn;
			
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'input' => $hsl
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
	
	public function budgOCost()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			//echo "thn: $thn<br/>";
			$this->load->model('sap');
			$hsl = $this->sap->get_ocost($thn);
			if (count($hsl)==0)	{
				//$ar = array();	
				$ob = new stdClass();
				$ob->thn = $thn;
				$ob->wo = 0;
				$ob->budget = 0;
				$ob->otype = 0;
				array_push($hsl, $ob);
			}
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'input' => $hsl
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

/* End of file rOrderCost.php */
/* Location: ./application/controllers/rOrderCost.php */
