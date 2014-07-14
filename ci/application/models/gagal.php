<?php

class gagal extends CI_Model {
	function insert_rh($data)    {
        //$query = $this->db->select('id,nama');
		//$query = $this->db->get('aksi');
		$this->db->insert('rh_201311', $data); 
        return $query->result();
    }
    
    
}

/* End of file aksi_model.php */
/* Location: ./application/models/gagal.php */
