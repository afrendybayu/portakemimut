<?php

class CMon extends CI_Model {
	
	function get_conmon()    {
        $sql = "select c.id,c.tgl,h3.nama as lokasi, h3.id as id_lokasi, h1.nama as unit,h1.id as id_unit , c.wo, c.sap, c.url, c.pic, c.ket, year(c.tgl) as thn
				from conmon c
					inner join hirarki h1 on h1.id = c.unit
					inner join hirarki h2 on h2.id = h1.parent
					inner join hirarki h3 on h3.id = h2.parent
				order by c.tgl desc";
		
		
		$query = $this->db->query($sql);
		return $query->result();
    }
	
	function get_conmon_byid($id)    {
        $sql = "select c.id,c.tgl,h3.nama as lokasi, h1.nama as unit, c.wo, c.sap, c.url, c.pic, c.ket
				from conmon c
					inner join hirarki h1 on h1.id = c.unit
					inner join hirarki h2 on h2.id = h1.parent
					inner join hirarki h3 on h3.id = h2.parent
				where c.id = ?
				order by c.tgl desc";
		
		
		$query = $this->db->query($sql,$id);
		return $query->result();
    }
	
	
	function count_conmon(){
		$sql = "select distinct(year(tgl)) as tahun, count(unit) as jml from conmon group by year(tgl) order by year(tgl) desc limit 3";
		$query = $this->db->query($sql);
		
		return $query->result();
	
	}

	function gascomp_conmon($cat){
		$sql = "select distinct(year(tgl)) as tahun, count(unit) as jml from conmon where type = ? group by year(tgl) order by year(tgl) desc limit 3";
		$query = $this->db->query($sql,array($cat));
		
		return $query->result();
	
	
	}
	
	function graf_conmon(){
		$sql = "select  year(c.tgl) as thn, 
					(select count(c2.unit) from conmon c2 where year(c2.tgl) = thn and c2.`type` =5 ) as gc,
					(select count(c3.unit) from conmon c3 where year(c3.tgl) = thn and c3.`type` =7 ) as gs,
					(select count(c4.unit) from conmon c4 where year(c4.tgl) = thn and c4.`type` =6 ) as pmp  
				from conmon c where year(c.tgl) >= (year(now())-3) group by thn order by thn asc";
		$query = $this->db->query($sql);
		return $query->result();
	}
    
	function gunit_conmon($tipe){
		/*
		$sql = "select year(c.tgl) as thn, month(c.tgl) as m, count(c.unit) as unit 
				from conmon c where year(c.tgl) = ? and c.`type`= ? group by m";
		$query = $this->db->query($sql, array($tahun, $tipe));
		*/
		$sql ="select month(c.tgl) as bln,
					if(year(c.tgl)=year(now())-2,count(c.unit),0) as skr2,
					if(year(c.tgl)=year(now())-1,count(c.unit),0) as skr1,
					if(year(c.tgl)=year(now()),count(c.unit),0) as skr
				from conmon c where c.`type`= ? group by bln";
		$query = $this->db->query($sql, $tipe);
		
		return $query->result();
		
	}
}

/* End of file conmon.php */
/* Location: ./application/models/conmon.php */
