<?php
class Hirarki extends CI_Model {
 
    function __construct()
    {
        parent::__construct();
		
    }

	function c_hirarki($lvl)
    {
		$this->db->select('id,flag');
		$this->db->where('level',$lvl);
		$query = $this->db->get('hirarki');
		return $query->result();
		
	}
	
}
?>