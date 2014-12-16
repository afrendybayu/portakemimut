<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rConMon extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('cmon');
		$this->load->model('conmon');
		$this->load->model('hirarki');
	}
	
	public function index()	{
		echo "qwerty";
	}
	
	public function rCM()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			/*
			$hsl = array();
			for ($i=0; $i<12; $i++)	{
				$obj = new stdClass();
				$obj->m = $i+1;
				$obj->bln = nmMonth($i,1);
				$obj->gc = '0';
				$obj->gs = '0';
				$obj->pm = '0';
				array_push($hsl,$obj);
			}
			print_r($hsl); echo "<br/><br/><br/>";
			//*/
			$hsl = $this->conmon->get_conmongrid($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'conmon' => $hsl
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
	
	public function uCM()	{
		try	{
			$par = json_decode(file_get_contents('php://input'));
			/*
			$params->bln = 'b4';
			$params->thn = '2014';
			$params->nilai = 134;
			$params->tipe = 5;
			//print_r($params); echo "<br/>";
			//*/
			if (!isset($par))	{
				throw new Exception("Data Tidak ada !!");
			}
			//*
			if (isset($par->bln))	{
				$dbln = explode('b',$par->bln);
				$bln = $dbln[1];
			}
			else {
				$bln = date('n');
			}
			$thn = (isset($par->thn))?$par->thn:date('Y');

			//$this->load->model('contract');
			echo "nilai: ".floatval($par->nilai).",bln: ".$bln.", tipe: ".$par->tipe.",thn: ".$par->thn;
			$hasil = $this->conmon->uiconmon(floatval($par->nilai), $bln, $par->tipe, $par->thn);
			print_r($hasil);
			
			//print_r($hasil);
			$jsonResult = array(
				'success' => true,
				'conmon' => $hasil
			);
			
			//*/
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		
		
		//$hasil['json'] = $jsonResult;
		//$this->output->set_content_type('application/json');
		//$this->output->set_output(json_encode($jsonResult));
		echo json_encode($jsonResult);
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
			//$hsl = $this->cmon->count_conmon();
			$hsl = $this->conmon->jml_conmon();
			
			$jsonResult = array(
					'success' => true,
					'conmon' => $hsl
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

	public function updateCMon(){
		
		try {
			$conmon = json_decode(file_get_contents('php://input'));
			
			
			$flag = $this->hirarki->get_flag($conmon->id_unit);
			foreach($flag as $r){
				// echo $r->flag;
				
				$sql = array(
					'tgl' 	=> $conmon->tgl ,
					'unit' 	=> $conmon->id_unit,
					'type'	=> $r->flag,
					'wo'	=> $conmon->wo,
					'sap'	=> $conmon->sap,
					'url'	=> $conmon->url,
					'pic'	=> $conmon->pic,
					'ket'	=> $conmon->ket
				);
				$this->db->where('id',$conmon->id);
				$this->db->update('conmon', $sql);
			
			}
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

		
	}
	public function removeCMon(){
		
		try {
			$conmon = json_decode(file_get_contents('php://input'));
			
			
			$this->db->where('id', $conmon->id);
			$this->db->delete('conmon'); 
			
			
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

		
	}

	function gConMon(){
		try {
			//$hsl = $this->cmon->graf_conmon();
			$hslg = array();
			$jt = 3-1;
			for ($i=$jt; $i>=0; $i--){
				$obj = new stdClass();
				$obj->thn = date('Y')-$i;
				$obj->gc = 0;
				$obj->gp = 0;
				$obj->pmp = 0;
				array_push($hslg,$obj);
			}
			//print_r($hslg); echo "<br/><br/>";
			
			$hsl = $this->conmon->gr_conmon();
			//print_r($hsl); echo "<br/><br/>";
			for ($k=0; $k<count($hslg); $k++)	{
				
				//*
				for($j=count($hsl)-1; $j>=0; $j--)	{
					//echo "hsl[$k] {$hslg[$k]->thn} {$hsl[$j]->thn} <br/>";
					if ($hsl[$j]->thn==$hslg[$k]->thn)	{
						//echo ">>>> {$hsl[$j]->thn}=={$hslg[$k]->thn}<br/>";
						$hslg[$k] = $hsl[$j];
					}
				}
				//*/
			}
			
			$jsonResult = array(
					'success' => true,
					'gcmon' => $hslg
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
			
			//$hsl = $this->cmon->gunit_conmon($tipe);
			$hsl = $this->conmon->gunit_conmon($tipe);
			//print_r($hsl); echo '<br><br>';
			for($k=0; $k<count($hsl); $k++){
				$hslbln[$hsl[$k]->bln-1] 			= $hsl[$k];
				$hslbln[$hsl[$k]->bln-1]->mbln 		= nmMonth($hsl[$k]->bln-1,2);
			}

			
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
