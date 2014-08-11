<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class dDaftarG extends CI_Controller {
	
	public function index()	{
		try	{
			$params = json_decode(file_get_contents('php://input'));

			$id = isset($params->id)?$params->id:"e0";
			$ids = array_filter(explode("e",$id));
			
			$this->load->model('waktudown');
			$hasil = $this->waktudown->delete_waktudown($ids);
			
			
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
		
		$hsl = array();
		$hsl['json'] = $jsonResult;
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//echo json_encode($jsonResult);
		
	}
}

