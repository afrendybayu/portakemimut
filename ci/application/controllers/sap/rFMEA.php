<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rFMEA extends CI_Controller {
	
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
	
	public function getCause()	{
		try {
			$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapcause' => $this->sap->get_cause()
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
			$cause = $this->input->get('cause')?:'';
			$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapcause' => $this->sap->get_cause_info($cause)
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
			$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapdamage' => $this->sap->get_damage()
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
			$damage = $this->input->get('cause')?:'';
			$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapcause' => $this->sap->get_damage_info($damage)
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
			$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapopart' => $this->sap->get_opart()
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
			$damage = $this->input->get('cause')?:'';
			$this->load->model('sap');

			$jsonResult = array(
				'success' => true,
				'sapcause' => $this->sap->get_opart_info($damage)
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
