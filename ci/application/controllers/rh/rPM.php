<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rPM extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('pm');
	}
	public function index()	{
		
		try	{
			$id = $this->input->get('unit')?:'0';
			
			/*
			$s = "SELECT id,kode,cat FROM equip WHERE unit_id=?";
			
			$query = $this->db->query($s, $id);
			
			$arreq = array();	$arid=array();
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$arreq[] = $row;
					$arid[] = $row->cat;		
				}
			}
			
			if (count($arreq)==0) {
				throw new Exception("Pemetaan Equipment dalam Unit ini tidak ada.");
			}
			
			$sqlcat = implode("' or eqcat='",$arid);
			$sql =	"select pmdef.id,eqcat,cat_equip.nama as cat, kode, durasi,pmdef.nama from pmlist ".
					"left join pmdef on pmdef.id = pmlist.pm ".
					"left join cat_equip on cat_equip.id = pmlist.eqcat ".
					"where eqcat='$sqlcat' ".
					"order by kode asc, durasi asc";

			$arr = array(); $k=0;
			$query = $this->db->query($sql);
			//*/
			
			$query = $this->pm->get_pm($id);
			

			$jsonResult = array(
				'success' => true,
				'pm' => $query
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		//$this->load->view('welcome_message');
		echo json_encode($jsonResult);
	}
	
	
	
	public function rPMnotdef() {
		try{			
			$cat = $this->input->get('cat')?:'0';
			
			$hsl = $this->pm->get_pmdefnotin($cat);
			
			$jsonResult = array(
				'success' => true,
				'pmndef' => $hsl
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
	
	public function rPMdefcat() {
		try{			
			$cat = $this->input->get('cat')?:'0';
			
			$hsl = $this->pm->get_pmdefcat($cat);
			
			$jsonResult = array(
				'success' => true,
				'pmlist' => $hsl
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

	public function cPMList()	{
		$param = json_decode(file_get_contents('php://input'));
			
		if (!isset($param))	{
			throw new Exception("Input Data Tidak Ada");
		}
			//print_r ($params);
			//$this->load->model('pmlist');
		try {
			$data = array('eqcat' => $param->eqcat, 'pm' => $param->list);
			//print_r($data);
			$hasil = $this->pm->set_pmlist($data);
			
			//echo "hsl: $hsl";
			$jsonResult = array(
				'success' => true,
				'pmlist' => array('id' => $hasil)
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
	
	public function dPMList()	{
		$param = json_decode(file_get_contents('php://input'));
			
		if (!isset($param))	{
			throw new Exception("Input Data Tidak Ada");
		}
		//$data = array('id' => $param->id);
		try {
			$hasil = $this->pm->del_pmlist($param->id);
			
			//echo "hsl: $hsl";
			$jsonResult = array(
				'success' => true,
				'pmlist' => array('id' => $hasil)
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
