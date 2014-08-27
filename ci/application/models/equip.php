<?php

class Equip extends CI_Model {
	
	function get_equip($id)	{
		$this->db->select('id,cat');
		$this->db->where('unit_id',$id);
		$this->db->get('equip');
	}
	
	function get_equip_concat($unit)	{
		$sql =	"SELECT group_concat(cat) as cat, group_concat(id separator 'e') as eqeq ".
				"from equip where unit_id = $unit";
		$query = $this->db->query($sql);
		return $query->result();
	}
}

/* End of file option.php */
/* Location: ./application/models/option.php */
