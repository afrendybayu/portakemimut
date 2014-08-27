<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class dEvent extends CI_Controller {
	
	public function index()	{
		try	{
			
			$params = json_decode(file_get_contents('php://input'));
			
			$id = isset($params->id)?intval($params->id):0;
			$this->load->model('event');

			$jsonResult = array(
				'success' => true,
				'event' => $this->event->delete_event($id)
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		
		$hasil = array();
		$hasil['json'] = $jsonResult;
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//echo json_encode($jsonResult);
		
	}
}

