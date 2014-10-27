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
		try {
			$aksi = json_decode(file_get_contents('php://input'));
			
			$cek = "select nama from aksi where nama = '{$aksi->nama}'";
			$query = $this->db->query($cek);
			if ($query->num_rows() > 0){
				// echo "Sudah ada data ".$aksi->nama;
				$sql = "update aksi set nama = '{$aksi->nama}', ket = '{$aksi->ket}' where nama = '{$aksi->nama}' ";
			}
			else{
				$sql = "insert into aksi (nama, ket) values ('{$aksi->nama}','{$aksi->ket}')";
				
			}
			$hsl = $this->db->query($sql);
					
		
		} catch (Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		
		

	}

	public function uAksi(){
		try {
			$uaksi = json_decode(file_get_contents('php://input'));
			
			$upd = array(
				// 'id' => $uaksi->id ,
				'nama' => $uaksi->nama ,
				'ket' => $uaksi->ket 
			 );
			
			$this->db->where('id',$uaksi->id);
			$this->db->update('aksi', $upd);
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

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
