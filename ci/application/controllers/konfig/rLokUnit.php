<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rLokUnit extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('hirarki');
		$this->load->model('equip');
	}
	
	function index()	{
		echo "res";
	}
	
	public function rHirarki()	{
		//*
		try {
			$parent_id = (isset($_GET['node']))?($_GET['node']):0;
			//echo $parent_id.'<br>';
			// echo $_GET['node'].'<br>';
			
			$arr = array(); $k=0;
			$hsl = $this->hirarki->get_hirarki($parent_id);
			//print_r($hsl->result()); echo "<br/><br/>";
			if ($hsl->num_rows() > 0)	{
				$arr = $hsl->result();

			}
			
			else {
				$hsl = $this->hirarki->get_hirarki_equip($parent_id);
				$arr = $hsl->result();
			}
			$jsonResult = array(
				'success' => true,
				'lokunit' => $arr
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		//*/
		echo json_encode($jsonResult);
	
	}
	
	public function cHirarki() {
		$par = json_decode(file_get_contents('php://input'));

		try {
			if (!isset($par))	{
				throw new Exception("Input Data Tidak Ada");
			}
			
			if ($par->sil=="e")	{
				$data = array(
					'nama' => $par->nama,
					'unit_id' => $par->parent,
					'kode' => $par->kode,
					'tag' => $par->tag,
					//'cat' => $par->cat,
					'rhinit' => $par->rhinit,
					'urut' => $par->urut,
					'ket' => $par->ket
					
				);
				//$this->equip->ins_hirarki($data);
			}
			else {
				$data = array(
					'nama' => $par->nama,
					'parent' => $par->parent,
					'kode' => $par->kode,
					'funcloc' => $par->funcloc,
					'rhinit' => $par->rhinit,
					'urut' => $par->urut,
					'ket' => $par->ket
				);
				$hsl = $this->hirarki->ins_hirarki($data);
			}
			// $sql = insert into hirarki ('nama', 'parent', 'level') values ({$params->});
			//$hsl = $this->hirarki->create_hirarki_new();
			// echo 'succeed';
			$jsonResult = array(
				'success' => true,
				'hir' => array('id' => $hsl)
			);
		}
		catch (Exception $e)	{
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	public function hirAll()	{
		/*
		try {
			$hsl = $this->hirarki->get_hirarki_all();
			$hir = buildTree($hsl,0);
			
			$jsonResult = array(
				'success' => true,
				'hirarki' => $hir
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
		//*/
		
		$hsl = $this->hirarki->get_hirarki_all();
		$hir = buildTree($hsl,0);
		echo json_encode($hir);
	}
	
	public function uHirarki() {
		$par = json_decode(file_get_contents('php://input'));

		try {
			if (!isset($par))	{
				throw new Exception("Input Data Tidak Ada");
			}
			if ($par->sil=="e")	{
				
			}
			else {
				$data = array(
					'nama' => $par->nama,
					'parent' => $par->parent,
					'kode' => $par->kode,
					'urut' => $par->urut
				);
				$this->hirarki->upd_hirarki($data,$par->id);
			}
			$jsonResult = array(
				'success' => true,
				'hir' => array('id' => $par->id)
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
	
	/*
	public function uHirarki() {
		//$str = "[GM-A01A00001] ELMOT RELIANCE 30 HP";
		$params = json_decode(file_get_contents('php://input'));
		//*
		try {
			//*
			if (!isset($params))	{
				throw new Exception("Input Data Tidak Ada");
			}
			
			$isi = explode("]",$params->nama);
			$kode = trim(substr($isi[0],1));
			$nama = trim($isi[1]);
			//print_r($isi);			echo "<br/>1: $kode,2: $nama<br/>";
			
			$data = array(
				'nama' => $nama,
				'tag'  => $kode,
				'cat'  => $params->cat
			);
			
			$this->load->model('equip');
			$this->equip->update_equip($data,$params->id);
			
			$jsonResult = array(
				'success' => true,
				'hir' => array('id' => $params->id)
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
	//*/
}

/* End of file rLokUnit.php */
/* Location: ./application/controllers/konfig/rLokUnit.php */
