<?php

class CMon extends CI_Model {
	
	function get_conmon()    {
        $query = $this->db->get('conmon');
		return $query->result();
    }
	
	function count_conmon(){
		$sql = "select distinct(year(tgl)) as tahun, count(unit) as jml from conmon group by year(tgl) order by year(tgl) desc limit 3";
		$query = $this->db->query($sql);
		
		return $query->result();
	
	}
	
    
    
}

/* End of file conmon.php */
/* Location: ./application/models/conmon.php */
