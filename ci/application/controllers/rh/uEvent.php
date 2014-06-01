<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class uEvent extends CI_Controller {
	
	public function index()	{
		try	{
			$params = json_decode(file_get_contents('php://input'));
			
			if (!isset($params))	{
				throw new Exception("Input Data Tidak Ada");
			}
			//print_r ($params);
			$this->load->model('event');
			
			$ret = array();
			if (is_array($params))	{
				foreach ($params as $obj)	{
					$data = array(
						'down_id'	=> $obj->iddown,
						'eq'		=> $obj->ideql,						
						'aksi'		=> $obj->idaksi,
						'cause'		=> $obj->idcause,
						'opart'		=> $obj->idopart,
						'fm'		=> $obj->idmode
					);
					$hasil = $this->event->update_event($data, $obj->id);
					if ($hasil)	{
						array_push($ret, array('id' => $obj->id));
					}
				}
			}
			if (is_object($params))	{
				$data = array(
					'down_id'	=> $params->iddown,
					'eq'		=> $params->ideql,
					'aksi'		=> $params->idaksi,
					'cause'		=> $params->idcause,
					'opart'		=> $params->idopart,
					'fm'		=> $params->idmode
				);
				$hasil = $this->event->update_event($data, $params->id);
				array_push($ret, array('id' => $params->id));
			}

			$jsonResult = array(
				'success' => true,
				'event' => $ret
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

		//$this->load->view('json',$hasil);
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//$this->output->enable_profiler(TRUE);
	}
}
