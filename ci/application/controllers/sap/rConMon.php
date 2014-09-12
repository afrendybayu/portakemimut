<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rConMon extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('cmon');
		$this->load->model('hirarki');
	}
	public function ReadCMon()	{
		$jsonResult = array();
		try {
			$hsl = $this->cmon->get_conmon();
			
			foreach ($hsl as $r){
				 // print_r ($r);
				$data[] = array(
						'tgl'	=>$r->tgl,
						'lokasi'=>$r->lokasi,
						'unit'	=>$r->unit,
						'wo'	=>$r->wo,
						'sap'	=>$r->sap,
						'url'	=>$r->url,
						'pic'	=>$r->pic,
						'ket'	=>$r->ket
					);
				$jsonResult = array(
					'success' => true,
					'condmon' => $data
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
	public function JConMon()	{
		try {
			$hsl = $this->cmon->count_conmon();
			
			foreach ($hsl as $r){
				// print_r ($r);
				$data[] = array(
						'thn'	=>$r->tahun,
						'jml'	=>$r->jml,
						);
				$jsonResult = array(
					'success' => true,
					'conmonth' => $data
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
	public function cbLokasi()	{
		try {
			$hsl = $this->hirarki->get_parent();
			
			foreach ($hsl as $r){
				// print_r ($r);
				$data[] = array(
						'id_lokasi'	=>$r->id,
						'loc'		=>$r->nama,
						
						);
				$jsonResult = array(
					'success' => true,
					'location' => $data
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
	public function cbUnit()	{
		try {
			// $id_lok = $this->input->get('id') ? $this->input->get('id') : 0; 
			
			$hsl = $this->hirarki->get_unit();
			
			foreach ($hsl as $r){
				// print_r ($r);
				$data[] = array(
						'id_unit'	=>$r->id_unit,
						//'id_type'	=>$r->id_type,
						'id_lokasi'	=>$r->id_lokasi,
						'unit'		=>$r->unit
						);
				$jsonResult = array(
					'success' => true,
					'equnit' => $data
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
			
			

			/*if(!$statement->execute()) {
				throw new Exception(implode(', ', $statement->errorInfo()));
			}
			$params->id = $db->lastInsertId();*/
			/*$jsonResult = array(
				'success' => true,
				'condmon' => $params
			);*/
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}

		// echo json_encode($jsonResult);
	}
	
	function compConMon(){
		try {
			$cat = $this->input->get('cat');
			$hsl = $this->cmon->gascomp_conmon($cat);
			
			foreach ($hsl as $r){
				// print_r ($r);
				$data[] = array(
						'thn'	=>$r->tahun,
						'jml'	=>$r->jml,
						);
				$jsonResult = array(
					'success' => true,
					'gascomp' => $data
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
		$tipe = $this->input->get('tp') != null ? $this->input->get('tp') : '5';
		$thn = date('Y'); $thn1 = $thn-1; $thn2 = $thn-2;
		
		echo 'tahun : '.$thn.' - ' .$thn1.' - ' .$thn2.'  dan tipe : '.$tipe.'</br>' ;
		
		$hslthn2 = $this->cmon->gunit_conmon($thn2,$tipe);
		$hslthn1 = $this->cmon->gunit_conmon($thn1,$tipe);
		$hslthn = $this->cmon->gunit_conmon($thn,$tipe);
		
		print_r ($hslthn2); echo '<br>';
		print_r ($hslthn1); echo '<br>';
		print_r ($hslthn); echo '<br>';
		
		// foreach ($hslthn2 as $r){
			// print_r ($r);
		
		// }
		 // print_r($hslthn2);
		
	}
}

/* End of file rConMon.php */
/* Location: ./application/controllers/rConMon.php */
