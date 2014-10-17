<?php

class Equip extends CI_Model {
	
	/*
	function get_equip_gconcat($id){
		// $sql = "SELECT group_concat('e',id separator'') as eq,unit_id FROM equip where unit_id = ? GROUP BY unit_id";
		$sql = "SELECT group_concat('e',e.id separator'') as eq,e.unit_id, h.flag 
				FROM equip e inner join hirarki h on e.unit_id = h.id
				where unit_id = ? GROUP BY unit_id;";
		
		$query = $this->db->query($sql,array($id));
		return $query->result();
	}
	//*/
	function get_equip_cat($cat){

		$sql = "SELECT SUBSTRING_INDEX(hhh.nama,' ',-1) AS ket,CONCAT(eq.nama,' @',h.nama) AS nama
				,eq.tag AS kode,eq.cat AS durasi
				FROM equip eq
				INNER JOIN hirarki h ON eq.unit_id = h.id
				INNER JOIN hirarki hh ON hh.id = h.parent
				INNER JOIN hirarki hhh ON hhh.id = hh.parent
				ORDER BY hhh.nama ASC, h.nama ASC";
		
		$query = $this->db->query($sql);
		return $query->result();
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
}

/* End of file option.php */
/* Location: ./application/models/option.php */
