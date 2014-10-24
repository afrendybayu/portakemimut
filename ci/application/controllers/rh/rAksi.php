<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rAksi extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('fmea');
		// $this->load->model('hirarki');
	}
	public function index()	{
		try	{
			//$id = $this->input->get('id')?:'0';
			// $this->load->model('fmea');
			$hsl = $this->fmea->get_aksi();
			
			$jsonResult = array(
				'success' => true,
				'aksi' => $hsl
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		// $hasil['json'] = $jsonResult;

		// $this->load->view('json',$hasil);
		//$this->output->set_content_type('application/json');
		//$this->output->set_output(json_encode($jsonResult));
		//$this->output->enable_profiler(TRUE);
		echo json_encode($jsonResult);
	}
	
	public function gAksi(){
		try	{
			$hsl = $this->fmea->get_aksi_grid();
			$jsonResult = array(
				'success' => true,
				'gaksi' => $hsl
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	
	}
}
