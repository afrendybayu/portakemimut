<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class cContract extends CI_Controller {
	
	public function index()	{
		try	{
			//$params = json_decode(file_get_contents('php://input'));
			$params->bln = 'b4';
			$params->bln = '2014';
			$params->nilai = 134;
			//print_r($params); echo "<br/>";
			//*/
			if (!isset($params))	{
				throw new Exception("Data Tidak ada !!");
			}

			if (isset($params->bln))	{
				$dbln = explode('b',$params->bln);
				$bln = $dbln[1];
			}
			else {
				$bln = date('n');
			}
			$thn = (isset($params->thn))?$params->thn:date('Y');

			$this->load->model('contract');
			$this->contract->uicontract($nilai, $bln, $);
			
			$jsonResult = array(
				'success' => true,
				'tasks' => $hasil
			);
			
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
	
	
}

/* End of file rContract.php */
/* Location: ./application/controllers/rContract.php */
