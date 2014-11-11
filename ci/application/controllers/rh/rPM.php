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
	
	public function nextPm()	{
		$pm = array(1500,4500,9000,18000,36000,72000);
		/*
		nextpm(1000,$pm);
		nextpm(1500,$pm);
		nextpm(2000,$pm);
		nextpm(3000,$pm);
		nextpm(4000,$pm);
		nextpm(4500,$pm);
		nextpm(6000,$pm);
		nextpm(7000,$pm);
		nextpm(7500,$pm);
		nextpm(7500,$pm);
		nextpm(8000,$pm);
		nextpm(9000,$pm);
		nextpm(10000,$pm);
		nextpm(10500,$pm);
		nextpm(11000,$pm);
		nextpm(12000,$pm);
		nextpm(13000,$pm);
		nextpm(13500,$pm);
		nextpm(16000,$pm);
		nextpm(17000,$pm);
		nextpm(16500,$pm);
		nextpm(18000,$pm);
		
		nextpm(23500,$pm);
		nextpm(25000,$pm);
		nextpm(25500,$pm);
		nextpm(27000,$pm);
		nextpm(28500,$pm);
		nextpm(30000,$pm);
		nextpm(31000,$pm);
		nextpm(31500,$pm);
		nextpm(32000,$pm);
		nextpm(35000,$pm);
		nextpm(52500,$pm);
		nextpm(54000,$pm);
		//*/

		/*
		$a = nextpm(6300,$pm);	print_r($a); echo "<br/>========<br/>";
		$a = nextpm(7400,$pm);	print_r($a); echo "<br/>========<br/>";
		$a = nextpm(7500,$pm);	print_r($a); echo "<br/>========<br/>";
		$a = nextpm(4400,$pm);	print_r($a); echo "<br/>========<br/>";
		$a = nextpm(35000,$pm);	print_r($a); echo "<br/>========<br/>";
		$a = nextpm(15000,$pm);	print_r($a); echo "<br/>========<br/>";
		//*/
		$a = nextpm(12000,$pm);	print_r($a); echo "<br/>";
		$a = nextpm(72000,$pm);	print_r($a); echo "<br/>";
		$a = nextpm(7000,$pm);	print_r($a); echo "<br/>";
		$a = nextpm(49490,$pm);	print_r($a); echo "<br/>";
		//echo $a->npm;
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
