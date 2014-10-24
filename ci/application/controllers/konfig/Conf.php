<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Conf extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('fmea');
		$this->load->model('pm');
	}
	
	public function rAksi()	{
		
		try {
			
			$hsl = $this->fmea->get_aksi();
			
			$jsonResult = array(
				'success' => true,
				'aksi' => $hsl
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
	
	public function cAksi(){
		$aksi = json_decode(file_get_contents('php://input'));
		
		// echo $aksi->nama . ' - dan - '.$aksi->ket;
		//*
		$sql = "replace into aksi (nama, ket) 
				VALUES ('{$aksi->nama}','{$aksi->ket}')";
		$query = $this->db->query($sql);
		//*/
	}
	public function dAksi(){
		
		try {
			$aksi = json_decode(file_get_contents('php://input'));
			
			
			$this->db->where('id', $aksi->id);
			$this->db->delete('aksi'); 
			
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

		
	}
	
	public function rPMdef(){
		try{
			$hsl = $this->pm->get_pmdef();
			
			$jsonResult = array(
				'success' => true,
				'pmdef' => $hsl
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
	public function cPMdef(){
		$pmdef = json_decode(file_get_contents('php://input'));
		// echo strtoupper($pmdef->nama);
		// echo $aksi->nama . ' - dan - '.$aksi->ket;
		//*
		$sql = "replace into pmdef (nama, kode, durasi, ket) 
				VALUES ('".strtoupper($pmdef->nama)."','".strtoupper($pmdef->kode)."','".$pmdef->durasi."','".$pmdef->ket."')";
		$query = $this->db->query($sql);
		//*/
	}
	public function dPmDef(){
		
		try {
			$pmdef = json_decode(file_get_contents('php://input'));
			
			
			$this->db->where('id', $pmdef->id);
			$this->db->delete('pmdef'); 
			
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

		
	}
	
	
	
	
}

/* End of file rLokUnit.php */
/* Location: ./application/controllers/konfig/rLokUnit.php */
