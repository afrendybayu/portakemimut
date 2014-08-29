<?php

class Catequip extends CI_Model {

	function get_tipe()	{
		$this->db->select('id,nama');
		$this->db->where('parent',0);
		$this->db->order_by('urut');
		$query = $this->db->get('cat_equip');
		
		return $query->result();
	}

}

/* End of file catequip.php */
/* Location: ./application/models/catequip.php */
