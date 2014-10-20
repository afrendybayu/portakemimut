<?php

class Cause extends CI_Model {

	function get_cause()   {
		
		$this->db->order_by('nama', 'asc');
		$sql = $this->db->get('cause');
		
		return $sql->result();
    }
	
}

/* End of file pm.php */
/* Location: ./application/models/pm.php */
