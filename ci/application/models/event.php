<?php

class Event extends CI_Model {

	function get_listevent()	{
		$this->db->select('id,nama');
		$query = $this->db->get('listEvent');
		
		return $query->result();
	}	
}

/* End of file option.php */
/* Location: ./application/models/option.php */
