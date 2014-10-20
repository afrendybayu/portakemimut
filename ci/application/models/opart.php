<?php

class Opart extends CI_Model {

	function get_opartdefnotin($cat){

		$sql = "SELECT id,nama,kode
				FROM opartdef
				WHERE kode NOT IN (
					SELECT od.kode
					FROM opartlist ol
					LEFT JOIN opartdef od ON ol.opart = od.id
					WHERE ol.eqcat = $cat
				) ORDER BY kode ASC";
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function ins_oplist()	{
		
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

/* End of file opart.php */
/* Location: ./application/models/opart.php */
