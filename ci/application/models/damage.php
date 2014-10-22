<?php

class Damage extends CI_Model {

	function get_damage()   {
		
		$this->db->order_by('nama', 'asc');
		$sql = $this->db->get('damage');
		
		return $sql->result();
    }
	
}

/* End of file pm.php */
/* Location: ./application/models/pm.php */
