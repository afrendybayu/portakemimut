<?php

class Runninghour extends CI_Model {
	//function get_event($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
	function cek_tgl_rh_ada($id, $tgl) {
		$query = $this->db->select('id');
		$query = $this->db->where('eq',$id);
		$query = $this->db->where('tgl',$tgl);
		$query = $this->db->get('rh_201311');
		
		//$hsl = $query->result();
		$adaTgl = new stdClass();
		$adaTgl->id = $query->result();
		$adaTgl->jml = count($query->result());
		//echo "<br/>adaTgl: ";	print_r($adaTgl); 
		return $adaTgl;
	}
	
	function insert_rh($data)	{
		$this->db->set($data);
		$this->db->insert('rh_201311');
	}
	
	function update_rh($data,$id)	{
		$this->db->where('id',$id);
		$this->db->update('rh_201311',$data);
	}
}

/* End of file option.php */
/* Location: ./application/models/option.php */
