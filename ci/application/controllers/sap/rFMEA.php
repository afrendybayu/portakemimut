<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rFMEA extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('sap');
	}

	public function sapCause()	{

		try {
			$this->load->model('sap');
			
			$hsl = $this->sap->get_jmlWO();
			//print_r($hsl);
			
			$sap = array();
			foreach ($hsl as $row) {
				//print_r($row);
				//echo $row->kode;
				//*
				if (strcmp($row->kode,"EP01")==0)	{
					$row->nama = 'EP01 Corrective Order';
					$row->color = '#2f7ed8';
				}
				if (strcmp($row->kode,"EP02")==0)	{
					$row->nama = 'EP02 Breakdown Order';
					$row->color = '#0d233a';
				}
				if (strcmp($row->kode,"EP03")==0)	{
					$row->nama = 'EP03 Scheduled Order';
					$row->color = '#8bbc21';
				}
				if (strcmp($row->kode,"EP04")==0)	{
					$row->nama = 'EP04 General Order';
					$row->color = '#910000';
				}
				if (strcmp($row->kode,"EP05")==0)	{
					$row->nama = 'EP05 Modification Order';
					$row->color = '#ffa81f';
				}
				
				//if (strcmp($row['kode'],"EP05")!=0)	{
					$sap[] = $row;
				//*/
			}
			
			$jsonResult = array(
				'success' => true,
				'sap' => $sap
			);
			
			//print_r($arAR);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		
		echo json_encode($jsonResult);
	
	}
	
	public function getNTipe()	{
		try {
			$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapntipe' => $this->sap->get_ntype()
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
	
	public function getCause()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$tipe = $this->input->get('tp')?:'ALL';
			//$this->load->model('sap');
			$hsl = explode(',',$tipe);
			//$hsl = preg_split("/[\s,]+/", $tipe); //explode(',',$tipe);
			$hsl2 = "'".implode("','", $hsl)."'";

			$jsonResult = array(
				'success' => true,
				'sapcause' => $this->sap->get_cause($thn,$hsl2)
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
	
	public function getCauseInfo()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$tipe = $this->input->get('tp')?:'ALL';
			$cause = $this->input->get('cause')?:'';
			
			$hsl = explode(',',$tipe);
			//$hsl = preg_split("/[\s,]+/", $tipe); //explode(',',$tipe);
			$hsl2 = "'".implode("','", $hsl)."'";
			
			//$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapcause' => $this->sap->get_cause_info($cause, $thn,$hsl2)
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
	
	public function getDamage()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$tipe = $this->input->get('tp')?:'ALL';
			//$this->load->model('sap');
			$hsl = explode(',',$tipe);
			//$hsl = preg_split("/[\s,]+/", $tipe); //explode(',',$tipe);
			$hsl2 = "'".implode("','", $hsl)."'";
			
			$jsonResult = array(
				'success' => true,
				'sapdamage' => $this->sap->get_damage($thn,$hsl2)
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

	public function getDamageInfo()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$damage = $this->input->get('cause')?:'';
			$tipe = $this->input->get('tp')?:'ALL';
			//$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapcause' => $this->sap->get_damage_info($damage, $thn, $tipe)
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

	public function getOPart()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$tipe = $this->input->get('tp')?:'ALL';
			$hsl = explode(',',$tipe);
			//$hsl = preg_split("/[\s,]+/", $tipe); //explode(',',$tipe);
			$hsl2 = "'".implode("','", $hsl)."'";
			$jsonResult = array(
				'success' => true,
				'sapopart' => $this->sap->get_opart($thn, $hsl2)
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

	public function getOPartInfo()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$opart = $this->input->get('cause')?:'';
			$tipe = $this->input->get('tp')?:'ALL';
			//$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapcause' => $this->sap->get_opart_info($opart, $thn, $tipe)
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

/* End of file rFMEA.php */
/* Location: ./application/controllers/rFMEA.php */
