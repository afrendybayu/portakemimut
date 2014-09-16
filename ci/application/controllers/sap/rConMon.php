<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rConMon extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('cmon');
		$this->load->model('hirarki');
	}
	public function ReadCMon()	{
		
		try {
			$hsl = $this->cmon->get_conmon();
			$jsonResult = array(
					'success' => true,
					'condmon' => $hsl
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
	
	public function RCMonId()	{
		
		try {
			$idunit = $this->input->get('id') ? $this->input->get('id') : 0; 
			if($idunit == 0) throw new Exception("paramater not valid");
			
			$hsl = $this->cmon->get_conmon_byid($idunit);
			
			$jsonResult = array(
					'success' => true,
					'condmonid' => $hsl
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
	
	public function JConMon()	{
		try {
			$hsl = $this->cmon->count_conmon();
			
			$jsonResult = array(
					'success' => true,
					'conmonth' => $hsl
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
	public function cbLokasi()	{
		try {
			$hsl = $this->hirarki->get_parent();
						
			$jsonResult = array(
					'success' => true,
					'location' => $hsl
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
	public function cbUnit()	{
		try {
			// $id_lok = $this->input->get('id') ? $this->input->get('id') : 0; 
			
			$hsl = $this->hirarki->get_unit();
			
			/*foreach ($hsl as $r){
				// print_r ($r);
				$data[] = array(
						'id_unit'	=>$r->id_unit,
						//'id_type'	=>$r->id_type,
						'id_lokasi'	=>$r->id_lokasi,
						'unit'		=>$r->unit
						);
				
			}*/
			$jsonResult = array(
					'success' => true,
					'equnit' => $hsl
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
	
	public function createCMon(){
		
		try {
			$conmon = json_decode(file_get_contents('php://input'));
			
			$flag = $this->hirarki->get_flag($conmon->unit);
			foreach($flag as $r){
				// echo $r->flag;
				
				$sql = array(
					'tgl' 	=> $conmon->tgl ,
					'unit' 	=> $conmon->unit,
					'type'	=> $r->flag,
					'wo'	=> $conmon->wo,
					'sap'	=> $conmon->sap,
					'url'	=> $conmon->url,
					'pic'	=> $conmon->pic,
					'ket'	=> $conmon->ket
				);
				$this->db->insert('conmon', $sql);
			
			}
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

		
	}
	
	function gConMon(){
		try {
			$hsl = $this->cmon->graf_conmon();
			
			foreach ($hsl as $r){
				// print_r ($r);
				$data[] = array(
						'thn'	=>$r->thn,
						'gc'	=>$r->gc,
						'gs'	=>$r->gs,
						'pmp'	=>$r->pmp
						);
				$jsonResult = array(
					'success' => true,
					'gcmon' => $data
				);
			}
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		
		echo json_encode($jsonResult);
	
	}
	
	function gUnitConMon(){
		try{
			$tipe = $this->input->get('tp') ? $this->input->get('tp') : '5';
			if($tipe === null) throw new Exception("paramater not valid");
			// echo 'tipe : '.$tipe.'</br>' ;
			$hslbln = array();
			for ($i=0; $i<12; $i++){
				$obj = new stdClass();
				$obj->bln = $i+1;
				$obj->skr2 = '0';
				$obj->skr1 = '0';
				$obj->skr = '0';
				$obj->mbln = nmMonth($i,1);
				array_push($hslbln,$obj);
			}
			// print_r($hslbln);
			
			$hsl = $this->cmon->gunit_conmon($tipe);
			 // print_r($hsl); echo '<br><br>';
			for($k=0; $k<count($hsl); $k++){
				$hslbln[$hsl[$k]->bln-1] 			= $hsl[$k];
				$hslbln[$hsl[$k]->bln-1]->mbln 		= nmMonth($hsl[$k]->bln-1,2);
				
				
				
				
			}
			// echo 'isi dari hsl bulan : <br>';
			// foreach($hslbln as $ro){
			// print_r($ro); echo '<br>';
			// }
			
			$jsonResult = array(
					'success' => true,
					'gunit' => $hslbln
				);
			
			
		}catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		echo json_encode($jsonResult);
		
	}
}

/* End of file rConMon.php */
/* Location: ./application/controllers/rConMon.php */
