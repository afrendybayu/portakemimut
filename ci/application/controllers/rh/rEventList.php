<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rEventList extends CI_Controller {
	
	public function index()	{
		try	{
			//$id = $this->input->get('id')?:'0';
			$this->load->model('event');
			
			$jsonResult = array(
				'success' => true,
				'aksi' => $this->event->get_listevent()
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		$hasil['json'] = $jsonResult;

		//$this->load->view('json',$hasil);
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//$this->output->enable_profiler(TRUE);
		
	}
}
