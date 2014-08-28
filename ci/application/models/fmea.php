<?php

class fmea extends CI_Model {
	function get_aksi()    {
        $this->db->select('id,nama');
        //$query = $this->db->select('id');
        //$query = $this->db->select('nama');
        $query = $this->db->get('aksi');
        return $query->result();
    }
    
    function cause()	{
		$this->db->select('id,nama');
        $query = $this->db->get('cause');
        return $query->result();
	}
}

/* End of file fmea.php */
/* Location: ./application/models/fmea.php */
