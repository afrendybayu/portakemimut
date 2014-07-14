<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rFMode extends CI_Controller {
	
	public function index()	{
		
		try	{
			$id = $this->input->get('unit')?:'0';
			$s = "SELECT cat FROM equip where unit_id=? order by nama asc";
			
			$query = $this->db->query($s, $id);
			
			$cat = array();	//$jml=0;
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$cat[] = "cat = '{$row->cat}'";
				}
			}
			$strcat = join(" or ", $cat);
			//print_r($cat); echo "<br/><br/>strcat: $strcat<br/><br/>";
	
			//$s = "SELECT id, cat,(SELECT CONCAT(kode,' - ',nama)) AS nama FROM failuremode ".
			$s = "SELECT id, cat,nama FROM failuremode ".
				 "WHERE $strcat ORDER BY nama ASC";		// , cat ASC
			$query = $this->db->query($s);
			
			$mode = array();	//$jml=0;
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$mode[] = $row;
				}
			}

			$jsonResult = array(
				'success' => true,
				'mode' => $mode
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
