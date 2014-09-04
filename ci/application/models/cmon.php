<?php

class CMon extends CI_Model {
	
	function get_conmon()    {
        $sql = "select c.tgl, h.nama as lokasi, hh.nama as unit, c.wo, c.sap, c.url, c.pic, c.ket
				from conmon c
				inner join hirarki h on c.lokasi = h.id
				inner join hirarki hh on c.unit = hh.id 
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
