<?php

class Option extends CI_Model {
	//function get_event($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
	function cek_tole_hari()	{
		$this->db->select('nilai');
		$this->db->where('nama','tole_hari');
		$query = $this->db->get('options');
		
		$hsl = $query->result();
		return $hsl[0]->nilai;
	}
	
	function cek_bulan_gagal()	{
		$this->db->select('nilai');
		$this->db->where('nama','list_bulan_gagal');
		$query = $this->db->get('options');
		
		$hsl = new stdClass();
		$hsl = $query->result();
		return $hsl[0]->nilai;
	}
	
	function get_oh_report()	{
		//$sql = "SELECT * FROM options WHERE nama LIKE '%_oh_%'";
		$this->db->select('nama,nilai');
		$this->db->like('nama', '_oh_'); 
		$query = $this->db->get('options');
		
		//print_r($query->result());
		$hsl = new stdClass();
		foreach ($query->result() as $r)	{
			if ($r->nama==="jabatan_oh_prepare")	{
				$hsl->jPre = $r->nilai;
			}
			if ($r->nama==="jabatan_oh_review")	{
				$hsl->jRev = $r->nilai;
			}
			if ($r->nama==="jabatan_oh_approve")	{
				$hsl->jApr = $r->nilai;
			}
			if ($r->nama==="nama_oh_prepare")	{
				$hsl->nPre = $r->nilai;
			}
			if ($r->nama==="nama_oh_review")	{
				$hsl->nRev = $r->nilai;
			}
			if ($r->nama==="nama_oh_approve")	{
				$hsl->nApr = $r->nilai;
			}
		}
		//print_r($hsl);
		return $hsl;
	}
}

/* End of file option.php */
/* Location: ./application/models/option.php */
