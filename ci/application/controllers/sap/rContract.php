<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rContract extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('contract');
	}
	
	public function index()	{
		echo "index contract";
	}
	
	public function sapContract()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');
			$this->load->model('contract');
			//*
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
	
	public function sapGrContract()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');
			$this->load->model('contract');
			
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
			//print_r($obj);

			$oo = $this->contract->get_grafikcontrak($thn);
			//echo 'banyaknya '.count($oo) .'<br>';
			
			//print_r($oo); echo "<br/><br/>";
			//*
			for ($i=0; $i<count($oo); $i++)	{
			//for ($i=0; $i<12; $i++)	{
				$hsl[$oo[$i]->m-1] = $oo[$i];
				$hsl[$oo[$i]->m-1]->bln = nmMonth($oo[$i]->m-1,1);
			}
			//echo "<br/><br/>";	print_r($oo); echo "<br/><br/>";
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
