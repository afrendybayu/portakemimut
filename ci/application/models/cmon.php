<?php

class CMon extends CI_Model {
	
	function get_conmon()    {
        $sql = "select c.tgl,h3.nama as lokasi, h1.nama as unit, c.wo, c.sap, c.url, c.pic, c.ket
				from conmon c
					inner join hirarki h1 on h1.id = c.unit
					inner join hirarki h2 on h2.id = h1.parent
					inner join hirarki h3 on h3.id = h2.parent
				order by c.tgl desc";
		
		
		$query = $this->db->query($sql);
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
