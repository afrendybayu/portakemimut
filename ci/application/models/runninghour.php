<?php

class Runninghour extends CI_Model {
	//function get_event($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
	function cek_tgl_rh_ada($eq, $tgl) {
		$this->db->select('id');
		$this->db->where('eq',$eq);
		$this->db->where('tgl',$tgl);
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
	
	function get_spAvReU($avre, $cat, $bln, $thn)	{
		$sql =	"select ROUND(ifnull((sum($avre)/count(id))*(100/24),0),2) as av from rh_201311 ".
				"where thn=$thn and bln = $bln and cat = $cat";
		
		$query = $this->db->query($sql);
		
		//echo "<br/>sql: $sql<br/>";
		//echo "hsl : "; print_r($query->result());
		return $query->result();
	}
	
	function get_avre_awaltahun($th)	{
		$sql =	"select cat, sum(rh_av) as av,sum(rh_re) as re,".
				"count(id) as jmleq from rh_201311 where thn=? group by cat";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql,$th);
		return $query->result();
	}
}

/* End of file option.php */
/* Location: ./application/models/option.php */
