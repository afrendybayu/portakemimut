<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rAksi extends CI_Controller {
	
	public function index()	{
		
		try	{
			//$id = $this->input->get('id')?:'0';
			
			$s = "SELECT id,nama FROM aksi order by nama asc";
			$query = $this->db->query($s);
			
			$aksi = array();
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$aksi[] = $row;
				}
			}
			
			$jsonResult = array(
				'success' => true,
				'aksi' => $aksi
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		//$this->load->view('welcome_message');
		echo json_encode($jsonResult);
	}
}
