<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rSpAvReU extends CI_Controller {
	
	public function index()	{
		try {
			$greq = $this->input->get('qe')?:'';
			$thn = date('Y');
			$bln = date('n');
			
			if (!strcmp($greq,'avgc'))	{
				$avre = 'rh_av'; $cat=5;
			} else if (!strcmp($greq,'avgs'))	{
				$avre = 'rh_av'; $cat=7;
			} else if (!strcmp($greq,'avpm'))	{
				$avre = 'rh_av'; $cat=6;
			} else if (!strcmp($greq,'regc'))	{
				$avre = 'rh_re'; $cat=5;
			} else if (!strcmp($greq,'regs'))	{
				$avre = 'rh_re'; $cat=7;
			} else if (!strcmp($greq,'repm'))	{
				$avre = 'rh_re'; $cat=6;
			} else {
				$avre = 'rh_av'; $cat=5;
			}
			//echo "avre: $avre, cat: $cat<br/>";
			
			$this->load->model("runninghour");
			
			$hsl = $this->runninghour->get_spAvReU($avre, $cat, $bln, $thn);

			//print_r($hsl);
			
			$jsonResult = array(
				'success' => true,
				'greq' => $hsl[0]
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
	
	public function sapOCost()	{
		try {
			$thn = $this->input->get('tgl')?:date('Y');

			$this->load->model('cost');
			
			$hsl = $this->cost->get_ordercost($thn);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'hoteco' => $hsl
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

/* End of file rOrderCost.php */
/* Location: ./application/controllers/rOrderCost.php */
