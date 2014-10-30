<?php

class Opart extends CI_Model {
	
	function get_equip_rh($unit)	{
		/*
		$sql = "SELECT ol.id, ol.eqcat, ol.opart, od.kode, od.nama
				FROM opartlist ol
				INNER JOIN opartdef od ON od.id = ol.opart
				INNER JOIN equip eq ON eq.unit_id = $unit
				WHERE eq.cat = ol.eqcat";
		//*/
		$sql =	"SELECT ol.opart AS id,ol.eqcat AS cat,od.nama
				FROM opartlist ol
				INNER JOIN opartdef od ON od.id = ol.opart
				INNER JOIN equip eq ON eq.unit_id = $unit
				WHERE eq.cat = ol.eqcat";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_opartdefnotin($cat){
		
		$sql = "SELECT id,nama AS nama,kode
				FROM opartdef
				WHERE kode NOT IN (
					SELECT od.kode
					FROM opartlist ol
					LEFT JOIN opartdef od ON ol.opart = od.id
					WHERE ol.eqcat = $cat
				) ORDER BY nama ASC";
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_opartlistcat($cat)    {

		$sql =	"SELECT ol.id,ol.opart,od.kode,od.nama
				FROM opartlist ol
				INNER JOIN opartdef od ON od.id = ol.opart
				WHERE ol.eqcat=$cat
				ORDER BY od.nama ASC";
		//echo "sql: $sql";
				
		$query = $this->db->query($sql);
		return $query->result();
    }
	
	function set_oplist($data)	{
		$this->db->trans_start();
		$this->db->insert('opartlist', $data); 
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return  $insert_id;
	}
	
	function get_equip_gconcat(){
		// $sql = "SELECT group_concat('e',id separator'') as eq,unit_id FROM equip where unit_id = ? GROUP BY unit_id";
		$sql = "SELECT group_concat('e',e.id separator'') as eq,e.unit_id, h.flag 
				FROM equip e inner join hirarki h on e.unit_id = h.id
				GROUP BY unit_id;";
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_equip($id)	{
		$this->db->select('id,cat,kode');
		$this->db->where('unit_id',$id);
		$query = $this->db->get('equip');
		
		return $query->result();
	}
	
	function get_tipe()	{
		$this->db->select('id,nama');
		$this->db->where('parent',0);
		$this->db->get('cat_equip');
		
		$query = $this->db->get('equip');
		

		return $query->result();
	}
	
	function get_equip_concat($unit)	{
		$sql =	"SELECT GROUP_CONCAT(cat SEPARATOR 'e') AS cat, GROUP_CONCAT(id SEPARATOR 'e') AS eqeq, ".
				"GROUP_CONCAT(kode) AS kode ".
				"FROM equip WHERE unit_id = $unit";
		$query = $this->db->query($sql);
		return $query->result();
	}
	function get_opart(){
		$this->db->order_by('kode','asc');
		$query = $this->db->get('opartdef');
		
		return $query->result();
	
	}
}

/* End of file opart.php */
/* Location: ./application/models/opart.php */
