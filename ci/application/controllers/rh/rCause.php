<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rCause extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('cause');
	}
	// public function index()	{
		
	// 	try	{
	// 		//$id = $this->input->get('id')?:'0';
			
	// 		$s = "SELECT id,nama,kode FROM cause ORDER BY nama ASC";
	// 		$query = $this->db->query($s);
			
	// 		$aksi = array();
	// 		if ($query->num_rows() > 0)	{
	// 			foreach ($query->result() as $row)	{
	// 				$aksi[] = $row;
	// 			}
	// 		}
			
	// 		$jsonResult = array(
	// 			'success' => true,
	// 			'cause' => $aksi
	// 		);
	// 	}
	// 	catch (Exception $e)	{
	// 		 $jsonResult = array(
	// 			'success' => false,
	// 			'message' => $e->getMessage()
	// 		);
	// 	}
	// 	//$this->load->view('welcome_message');
	// 	echo json_encode($jsonResult);
	// }
	public function index(){
		try	{
			
			$hsl = $this->cause->get_cause();
			
			$jsonResult = array(
				'success' => true,
				'cause' => $hsl
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
