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
						'id'	=>$r->id,
						'lokasi'=>$r->nama,
						'kode'	=>$r->kode
						);
				$jsonResult = array(
					'success' => true,
					'lokasi' => $data
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
			$id_lok = $this->input->get('id') ? $this->input->get('id') : 0; 
			
			$hsl = $this->hirarki->get_unitlokasi($id_lok);
			
			foreach ($hsl as $r){
				// print_r ($r);
				$data[] = array(
						'lokasi'=>$r->lokasi,
						'unit'=>$r->unit,
						'unit_kode'	=>$r->lok_unit,
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
	
}

/* End of file rConMon.php */
/* Location: ./application/controllers/rConMon.php */
