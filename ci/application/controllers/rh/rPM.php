<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rPM extends CI_Controller {
	
	public function index()	{
		
		try	{
			$id = $this->input->get('unit')?:'0';
			
			/*
			$s = "SELECT id,kode,cat FROM equip WHERE unit_id=?";
			
			$query = $this->db->query($s, $id);
			
			$arreq = array();	$arid=array();
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$arreq[] = $row;
					$arid[] = $row->cat;		
				}
			}
			
			if (count($arreq)==0) {
				throw new Exception("Pemetaan Equipment dalam Unit ini tidak ada.");
			}
			
			$sqlcat = implode("' or eqcat='",$arid);
			$sql =	"select pmdef.id,eqcat,cat_equip.nama as cat, kode, durasi,pmdef.nama from pmlist ".
					"left join pmdef on pmdef.id = pmlist.pm ".
					"left join cat_equip on cat_equip.id = pmlist.eqcat ".
					"where eqcat='$sqlcat' ".
					"order by kode asc, durasi asc";

			$arr = array(); $k=0;
			$query = $this->db->query($sql);
			//*/
			
			$this->load->model('pm');
			$query = $this->pm->get_pm($id);
			

			$jsonResult = array(
				'success' => true,
				'pm' => $query
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
