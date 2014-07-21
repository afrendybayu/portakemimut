<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rEvent extends CI_Controller {
	
	public function index()	{
		try	{
			$id = $this->input->get('down')?:'0';
			$idar = array_filter(explode("e",$id));
			$idx = implode(",",$idar);
			
			$this->load->model('event');
			
			$jsonResult = array(
				'success' => true,
				'event' => $this->event->get_event($idx)
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
