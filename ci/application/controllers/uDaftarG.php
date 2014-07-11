<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class uDaftarG extends CI_Controller {
	
	
	public function index()	{
		
		try	{
			$params = json_decode(file_get_contents('php://input'));
			
			$edit = isset($params->edit)?$params->edit:0;
			//echo "edit: $edit-----<br/>";
			$aw = bwaktu($params->downt, $params->downj);
			$ak = bwaktu($params->upt, $params->upj);
			$sw = bwaktu($params->startt, $params->startj);
			$sk = bwaktu($params->endt, $params->endj);
			//echo "aw: {$aw->t}, ak: {$ak->t}<br/>";

			if ($aw->t > $ak->t)	{
				throw new Exception("Waktu tidak sesuai !!<br/>Input Data Tidak disimpan");
				//exit;
			}
			
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

