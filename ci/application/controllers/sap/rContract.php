<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rContract extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('contract');
	}
	
	public function index()	{
		echo "index contract";
	}
	
	public function rPOKontrak()	{
		try {
			
			$idk = $this->input->get('id');
			$hsl = $this->contract->get_po_kontrak($idk);
			$fld = $this->contract->get_po_field($idk);
			
			//print_r($hsl);
			
			$jsonResult = array(
				'success' => true,
				'contract' => $hsl,
				'field' => $fld
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
		
		
	public function sapContract()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');
			$this->load->model('contract');
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
			//print_r($hsl); echo "<br/><br/>";
			//*/
			$hsl = $this->contract->get_contract($thn);
			/*
			for ($i=0; $i<count($oo); $i++)	{
				$hsl[$oo[$i]->m-1] = $oo[$i];
				$hsl[$oo[$i]->m-1]->bln = nmMonth($oo[$i]->m-1,1);
			}
			//*/
			//echo "<br/><br/>";	print_r($oo); echo "<br/><br/>";

			$jsonResult = array(
				'success' => true,
				'contract' => $hsl
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
	
	public function rsKontrak()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');
			$hsl = $this->contract->get_single_kontrak($thn);
			
			$jsonResult = array(
				'success' => true,
				'contract' => $hsl
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
	
	public function sapTpKontx()	{
		$tt = $this->contract->get_tipe_eq();
		//print_r ($tt);
		$ar = array('m','bln');
		foreach ($tt as $t)	{
			array_push($ar, $t->kode);
		}
		print_r($ar);
		//echo $tt;
	}
	
	public function sapGrContract()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');
			//$this->load->model('contract');
			
			$tt = $this->contract->get_tipe_eq();
			//print_r($tt);
			
			$hsl = array();
			for ($i=0; $i<12; $i++)	{
				$b = $i+1;
				$obj = new stdClass();
				$obj->m = "$b";
				$obj->bln = nmMonth($i,1);
				//*
				foreach ($tt as $t)	{
					$obj->{$t->kode} = '0';
				}
				//*/
				/*
				$obj->en = '0';
				$obj->xx = '0';
				$obj->pm = '0';
				//*/
				array_push($hsl,$obj);
				
			}
			//print_r($hsl);
			//return;

			$oo = $this->contract->get_grafikcontrak($thn);
			//echo 'banyaknya '.count($oo) .'<br>';
			//echo "<br/><br/>";	print_r($oo); echo "<br/><br/>";
			
			//*
			for ($i=0; $i<count($oo); $i++)	{
			//for ($i=0; $i<12; $i++)	{
				$hsl[$oo[$i]->m-1] = $oo[$i];
				//$hsl[$oo[$i]->m-1]->bln = nmMonth($oo[$i]->m-1,1);
			}
			//echo "<br/><br/>";	print_r($hsl); echo "<br/><br/>";
			//*/
			$jsonResult = array(
				'success' => true,
				'contract' => $hsl
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

}

/* End of file rContract.php */
/* Location: ./application/controllers/rContract.php */
