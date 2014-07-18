<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class dDaftarG extends CI_Controller {
	
	public function index()	{
		try	{
			$params = json_decode(file_get_contents('php://input'));
			
			
			
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
		
		$hasil['json'] = $jsonResult;
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//echo json_encode($jsonResult);
		
	}
}

