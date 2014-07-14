<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rEquip extends CI_Controller {
	
	public function index()	{
		
		try	{
			$id = $this->input->get('unit')?:'0';
			
			$s = "SELECT id AS idt,(SELECT CONCAT(kode,' ',tag)) AS nama,cat ".
				 "FROM equip WHERE unit_id=? ORDER BY nama ASC";
			
			$query = $this->db->query($s, $id);
			
			
			$isi = array();	//$jml=0;
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					//print_r($row); echo "<br/>";
					$isi[] = $row;
					//$isi[$jml]['nama'] = $row->kode." ".$row->tag;
					//$jml++;
				}
			}

			$jsonResult = array(
				'success' => true,
				'equip' => $isi
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
