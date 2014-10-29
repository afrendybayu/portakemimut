<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rCatEquip extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('catequip');
	}
	
	public function rHirarki()	{
		
		try {
			$parent = $this->input->get('node')?:'0';
			//echo $parent.'<br>';
			// echo $_GET['node'].'<br>';
			
			$arr = array(); $k=0;
			$hsl = $this->catequip->get_hirarki($parent);

			$jsonResult = array(
				'success' => true,
				'cateq' => $hsl
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
	
	public function cHirCat()	{
		$par = json_decode(file_get_contents('php://input'));
		if (!isset($par))	{
			throw new Exception("Input Data Tidak Ada");
		}
		
		try {
			$data = array('nama'=>$par->text,'parent'=>$par->parentId,'kode'=>$par->tipe);
			//print_r($data);
			$hasil = $this->catequip->set_cathir($data);
			
			$jsonResult = array(
				'success' => true,
				'cateq' => array('id' => $hasil)
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
	
	public function dHirCat()	{
		$par = json_decode(file_get_contents('php://input'));
		if (!isset($par))	{
			throw new Exception("Input Data Tidak Ada");
		}
		
		try {
			//print_r($data);
			$hasil = $this->catequip->del_cathir($par->id);

			if ($hasil['jml']>0)	{
				throw new Exception("Ada {$hasil['jml']} Equipment yang berkategori ini !");
			}
			$jsonResult = array(
				'success' => true,
				'cateq' => array('id' => $hasil)
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
	
	public function createHirarki(){
		try{
			// $params = json_decode(file_get_contents('php://input'));
			// $sql = insert into hirarki ('nama', 'parent', 'level') values ({$params->});
			$hsl = $this->hirarki->create_hirarki_new();
			// echo 'succeed';
			
		}
		catch (Exception $e){
			// ech`o 'failed';
		}
	
	}
	
	public function updateHirarki(){
		$params = json_decode(file_get_contents('php://input'));
		/*
		$sql = array(
					'nama' 		=> $params->nama,
					'parent' 	=> $params->parentId,
					'level'		=> $params->level +1,
					
				);
		$this->db->where('id',$params->id);
		$this->db->update('hirarki', $sql);
			*/
	}
	
}

/* End of file rLokUnit.php */
/* Location: ./application/controllers/konfig/rLokUnit.php */
