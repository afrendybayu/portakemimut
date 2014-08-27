<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class cEvent extends CI_Controller {
	
	public function index()	{
		try	{
			$this->load->model('event');
			$params = json_decode(file_get_contents('php://input'));
	
			if (is_array($params))	{
				foreach ($params as $obj)	{
					$data = array(
						'down_id' => $obj->iddown,
						'eq'	=>	$obj->ideql,
						'opart'	=>	$obj->idopart,
						'fm'	=>	$obj->idmode,
						'cause'	=>	$obj->idcause,
						'aksi'	=>	$obj->idaksi
					);
					$this->event->insert_event($data);
				}
			}
			if (is_object($params))	{
				$data = array(
					'down_id' => $params->iddown,
					'eq'	=>	$params->ideql,
					'opart'	=>	$params->idopart,
					'fm'	=>	$params->idmode,
					'cause'	=>	$params->idcause,
					'aksi'	=>	$params->idaksi
				);
				$this->event->insert_event($data);
			}
		
			$id = $this->input->get('id')?:'0';
			
			
			$jsonResult = array(
				'success' => true,
				'event' => $this->event->get_listevent()
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
