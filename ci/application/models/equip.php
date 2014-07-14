<?php

class Equip extends CI_Model {
	
	function get_equip($id)	{
		$this->db->select('id,cat');
		$this->db->where('unit_id',$id);
		$this->db->get('equip');
	}
}

/* End of file option.php */
/* Location: ./application/models/option.php */
