<?php

class Option extends CI_Model {
	//function get_event($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
	function cek_tole_hari()	{
		$query = $this->db->select('nilai');
		$query = $this->db->where('nama','tole_hari');
		$query = $this->db->get('options');
		
		$hsl = $query->result();
		return $hsl[0]->nilai;
	}
	
	function cek_bulan_gagal()	{
		$query = $this->db->select('nilai');
		$query = $this->db->where('nama','list_bulan_gagal');
		$query = $this->db->get('options');
		
		$hsl = new stdClass();
		$hsl = $query->result();
		return $hsl[0]->nilai;
	}
}

/* End of file option.php */
/* Location: ./application/models/option.php */
