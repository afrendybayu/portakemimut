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
	public function uPmDef(){
		try {
			$pmdef = json_decode(file_get_contents('php://input'));
			
			$upd = array(
				// 'id' => $uaksi->id ,
				'nama' => $pmdef->nama ,
				'kode' => $pmdef->kode,
				'durasi' => $pmdef->durasi,
				'ket' => $pmdef->ket 
			 );
			
			$this->db->where('id',$pmdef->id);
			$this->db->update('pmdef', $upd);
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

	}
	public function cPMdef(){
		try {
			$pmdef = json_decode(file_get_contents('php://input'));
			
			// $query = $this->db->query($cek);
			$cek = "select nama, kode, durasi from pmdef where nama = '{$pmdef->nama}' or kode = '{$pmdef->nama}' or durasi = '{$pmdef->durasi}'";
			$query = $this->db->query($cek);
			if ($query->num_rows() > 0){
				// echo "Sudah ada data ".$aksi->nama;
				// $sql = "update pmdef set nama = '".strtoupper($pmdef->nama)."',kode = '".strtoupper($pmdef->kode)."',
				// 		durasi = '{$pmdef->durasi}', ket = '{$pmdef->durasi}'";
				return false;
			}
			else{
				// $sql = "insert into aksi (nama, ket) values ('{$aksi->nama}','{$aksi->ket}')";
				$sql = "insert into pmdef (nama, kode, durasi, ket) 
				VALUES ('".strtoupper($pmdef->nama)."','".strtoupper($pmdef->kode)."','{$pmdef->durasi}','{$pmdef->ket}')";
			}
			$hsl = $this->db->query($sql);
					
		
		} catch (Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}



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
	public function dCause(){
		
		try {
			$dcause = json_decode(file_get_contents('php://input'));
			
			
			$this->db->where('id', $dcause->id);
			$this->db->delete('cause'); 
			
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

		
	}
	public function cCause(){
		
		try {
			$dcause = json_decode(file_get_contents('php://input'));
			
			
			// $this->db->where('id', $dcause->id);
			// $this->db->delete('cause'); 
			
			
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
